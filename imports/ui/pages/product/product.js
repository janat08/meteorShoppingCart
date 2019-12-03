import './product.html';
import { Products, ImagesFiles } from '/imports/api/cols.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.product.onCreated(function productsOnCreated() {
     this.autorun(() => {
        const id = FlowRouter.getParam("productId")
        SubsCache.subscribe('products.one', id)
        SubsCache.subscribe('images.all')
     });
       console.log(ImagesFiles.findOne("KRapXZ2mmWs44Stvq"))
Meteor.call("sendSMS", (err, res)=>{
    console.log(err, res)
})
});

Template.product.helpers({
  product(){
    var res = Products.findOne(FlowRouter.getParam("productId"))
    // Object.assign(res, {imageIds: res.imageIds.map(x=>{
    //   return ImagesFiles.findOne(x)
    // })})
    // console.log(res)
    return res
  },
  image(id){
    console.log(123123, ImagesFiles.findOne(this) )
    return ImagesFiles.findOne(this)
  }
});

Template.product.events({
  'click .jsBuy'(event, instance) {
    Meteor.call('carts.upsert', FlowRouter.getParam("productId"))
  },
});

Template.imageShow.helpers({
  link(id){
    return ImagesFiles.findOne(this+"")
  },

})
