import './product.html';
import { Products } from '/imports/api/products/products.js';
import { ReactiveDict } from 'meteor/reactive-dict';
Template.product.onCreated(function productsOnCreated() {
     this.autorun(() => {
        const id = FlowRouter.getParam("productId")
        SubsCache.subscribe('products.one', id)
     });
});

Template.product.helpers({
  product(){
    const state = Template.instance().state
    //next page preloaded
    return Products.findOne(FlowRouter.getParam("productId"))
  },
});

Template.product.events({
  'click .jsBuy'(event, instance) {
    // increment the counter when button is clicked
    console.log(instance)
    const id = FlowRouter.getParam("productId")
    const prev = LCarts.findOne(id)
    const obj = {_id: id, count: 1}
    if (prev && prev.count){
      obj.count = prev.count+1
    } 
    LCarts.update({_id: FlowRouter.getParam("productId")}, obj, {upsert: true})
  },
});
