import './productForm.html';
import { Products, Product, ImagesFiles } from '/imports/api/cols.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

function pushTemp (template, key){
    const st = template[key]
    
    return (val)=>{
        const res = st.get()
        res.push(val)
        st.set(res)
    }
}

function modifyTemp(template, key, type){
        const st = template[key]
    
    return (val)=>{
        const res = st.get()
        res[type](val)
        st.set(res)
    }
}


Template.productForm.onCreated(function() {
    this.currentUpload = new ReactiveVar([]);
    this.autorun(() => {
        const id = FlowRouter.getParam("productId")
        SubsCache.subscribe('images.all', id)
        if (id) {
            SubsCache.subscribe('products.one', id)
        }
    });
});

Template.productForm.helpers({
    currentUpload() {
        const curUpload = Template.instance().currentUpload.get()
        const ids = curUpload.filter(x=>x.doc).map(x=>x.doc._id)
        return ImagesFiles.find({$or: [{_id: {$in: ids}},{"meta.productId": FlowRouter.getParam("productId")}]});
    },
    product() {
        const res = Products.findOne(FlowRouter.getParam("productId"))
        return res
    }
});

Template.productForm.events({
    'click .jsRemovePic' (e, templ){
        console.log(this)
        Meteor.call('images.remove', this._id)
    },
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
                    uploadPush({upload: this})
                });

                upload.on('end', function(error, fileObj) {
                    if (error) {
                        alert('Error during upload: ' + error);
                    }
                    else {
                        // alert('File "' + fileObj.name + '" successfully uploaded');
                    }
                    const inter = st.get()
                    inter[i-1].doc = fileObj
                    st.set(inter)
                });

                upload.start();
            }
        }
    },
    'submit' (event, template) {
        event.preventDefault();
        const images = template.currentUpload.get()
        console.log(images)
        const { title: { value: tV }, description: { value: dV }, price: { value: pV } } = event.target;
        Product.productUpsert({imageIds: images.map(x=>x.doc._id), _id: FlowRouter.getParam("productId"), title: tV, description: dV, price: pV }, (error, res) => {
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
        })
        // Meteor.call('products.upsert', {imageIds: images.map(x=>x.doc._id), _id: FlowRouter.getParam("productId"), title: tV, description: dV, price: pV }, (error, res) => {
        //     if (error) {
        //         console.log(error)
        //         alert(error.error);
        //     }
        //     else {
        //         // const { title, description, price } = event.target;
        //         // title.value = '';
        //         // description.value = '';
        //         // price.value = ''
        //         console.log(res)
        //         FlowRouter.go('App.product', {productId: res})

        //     }
        // });
    },
});
