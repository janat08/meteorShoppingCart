import './cart.html';
import { Carts, Products } from '/imports/api/cols.js';

Template.cart.onCreated(function cartOnCreated() {
  // counter starts at 0
  this.autorun(()=>{
    SubsCache.subscribe('carts.all')
    SubsCache.subscribe('products.all')
  })
  this.autorun(()=>{
      const local = LCarts.find().fetch()
      //insert into carts, current cart with status open
      
  })
});

Template.cart.helpers({
  products() {
    return Carts.find({userId: Meteor.userId, open: true}).forEach(x=>{
      Object.assign(x, Products.findOne(x.productId, {_id: -1, description: -1}))
    })
  },
});

Template.cart.events({
  'click .jsPay'(event, instance) {
    //navigate somewhere
  },
});
