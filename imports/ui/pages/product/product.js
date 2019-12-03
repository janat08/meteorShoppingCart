import './product.html';
import { Products, ImagesFiles, Carts } from '/imports/api/cols.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.product.onCreated(function productsOnCreated() {
     this.autorun(() => {
        const id = FlowRouter.getParam("productId")
        SubsCache.subscribe('products.one', id)
        SubsCache.subscribe('images.all')
        SubsCache.subscribe('carts.all')
     });
       console.log(ImagesFiles.findOne("KRapXZ2mmWs44Stvq"))
});

Template.product.helpers({
  product(){
    var res = Products.findOne(FlowRouter.getParam("productId"))
    console.log(res)
    return res
  },
  total(){
    const id = FlowRouter.getParam("productId")
    const total = Products.findOne(id).price*Carts.findOne({open: true, productId: id}).count
    console.log(Carts.findOne({open: true, productId: id}))
    return isNaN(total)? "0" : total
  }
});

Template.product.events({
  'click .jsBuy'(event, instance) {
    Meteor.call('carts.upsert', FlowRouter.getParam("productId"))
  },
});

Template.imageShow.helpers({
  images(){
    return ImagesFiles.findOne(this+"")
  },

})
