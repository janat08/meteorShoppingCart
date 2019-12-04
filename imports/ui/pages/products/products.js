import './products.html';
import { Products, ImagesFiles } from '/imports/api/cols.js';
import { ReactiveDict } from 'meteor/reactive-dict';
Template.products.onCreated(function productsOnCreated() {
     this.state = new ReactiveDict({limit: 20})
     this.autorun(() => {
        SubsCache.subscribe('products.all', this.state.get('limit'))
        SubsCache.subscribe('images.all')
     });
});

Template.products.helpers({
  products(){
    const state = Template.instance().state
    //next page preloaded
    var res = Products.find({}, {limit: state.get('limit')-10})
    res = res.map(x=>{
      x.imageIds = x.imageIds.length && ImagesFiles.findOne(x.imageIds[0])
      console.log()
      return x
    })
    console.log(res)
    return res
  },
  allLoaded(){
    const state = Template.instance().state
    const count = state.get('limit')-10
    //add 10 so that we let use load the last 10 items
    return Products.find({}, {limit: count+10}).count() < count
  },
});

Template.products.events({
  'click .jsLoadmore'(event, instance) {
    // increment the counter when button is clicked
    const st = instance.state
    st.set('limit', st.get('limit')+10);
  },
});
