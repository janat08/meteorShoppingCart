import './cart.html';
import { Carts, Products } from '/imports/api/cols.js';
import '../../components/cartProduct/cartProduct.js'
Template.cart.onCreated(function cartOnCreated() {
  // counter starts at 0
  this.autorun(()=>{
    SubsCache.subscribe('carts.all')
    SubsCache.subscribe('products.all')
  })
  // this.autorun(()=>{
  //     const local = LCarts.find().fetch()
  //     Meteor.call('carts.insert', local)
  //     //insert into carts, current cart with status open
      
  // })
});

Template.cart.helpers({
  products() {
    const res = Carts.find({open: true}).map(x=>{
      return Object.assign(x, {product: Products.findOne(x.productId)})
    })
    return res
  },
  //   products() {
  //   const res = Carts.findOne({open: true}).products.map(x=>{
  //     return Products.findOne(x.productId, {_id: -1, description: -1})
  //   })
  //   console.log(res)
  //   return res
  // },
});

Template.cart.events({
  'click .jsPay'(event, instance) {
    Meteor.call('orders.insert')
  },
});
