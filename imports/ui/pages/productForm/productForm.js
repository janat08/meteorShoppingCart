import './productForm.html';
import { Products, ImagesFiles } from '/imports/api/cols.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

function pushTemp (template, key){
    const st = template[key]
    
    return (val)=>{
        const res = st.get()
        res.push(val)
        st.set(res)
    }
}

    window.FR = FlowRouter

Template.productForm.onCreated(function() {
    this.currentUpload = new ReactiveVar([]);
    this.images = new ReactiveVar([])
    this.products = new ReactiveVar({})
    this.autorun(() => {
        const id = FlowRouter.getParam("productId")
        if (id) {
            SubsCache.subscribe('products.one', id)
            SubsCache.subscribe('images.all', id)
        }
    });
    this.autorun(x=>{
        var res = Products.findOne(FlowRouter.getParam("productId"))
        // res = Object.assign(res, {imageIds: res.imageIds.map(x=>{
        //     return ImagesFiles.findOne(x)
        // })})
    })

});

Template.productForm.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    },
    imageFiles() {
        const inserted = ImagesFiles.find({meta: {productId: {$eq: FlowRouter.getParam("productId")}}}).fetch();
        if (inserted.length()){
            return inserted
        }
        return Template.instance().images.get()
        
    },
    product() {
        const res = Products.findOne(FlowRouter.getParam("productId"))
        return res
    }
});

Template.productForm.events({
    'change #fileInput' (e, template) {
        console.log( e.currentTarget.files)
        const docPush = pushTemp(template, 'images')
        const uploadPush = pushTemp(template, 'currentUpload')
        const st = template.currentUpload
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            for (var i = 0; i < e.currentTarget.files.length; i++) {
                // We upload only one file, in case
                // multiple files were selected
                const upload = ImagesFiles.insert({
                    file: e.currentTarget.files[i],
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    meta: {
                        uploader: Meteor.userId(),
                        productId: FlowRouter.getParam("productId")
                    },
                }, false);

                upload.on('start', function() {
                    uploadPush({doc: {}, upload: this})
                    console.log(this)
                });

                upload.on('end', function(error, fileObj) {
                    if (error) {
                        alert('Error during upload: ' + error);
                    }
                    else {
                        // alert('File "' + fileObj.name + '" successfully uploaded');
                    }
                    const inter = st.get()
                    console.log("inter", i, inter)
                    inter[i-1].doc = ImagesFiles.findOne(fileObj._id).fetch()
                    st.set(inter)
                    // docPush(fileObj)
                    console.log(st.get(), fileObj, ImagesFiles.findOne(fileObj._id).fetch())
                });

                upload.start();
            }
        }
    },
    'submit .product-add' (event, template) {
        event.preventDefault();
        const images = template.images.get()
        const { title: { value: tV }, description: { value: dV }, price: { value: pV } } = event.target;
        Meteor.call('products.upsert', {imageIds: images.map(x=>x._id), _id: FlowRouter.getParam("productId"), title: tV, description: dV, price: pV }, (error, res) => {
            if (error) {
                console.log(error)
                alert(error.error);
            }
            else {
                // const { title, description, price } = event.target;
                // title.value = '';
                // description.value = '';
                // price.value = ''
                console.log(res)
                FlowRouter.go('App.product', {productId: res})

            }
        });
    },
});
