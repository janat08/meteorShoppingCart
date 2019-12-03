import './cart.html';
import { Carts, Products } from '/imports/api/cols.js';
import '../../components/cartProduct/cartProduct.js'
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.cart.onCreated(function cartOnCreated() {
  // counter starts at 0
  this.autorun(()=>{
    SubsCache.subscribe('carts.all')
    SubsCache.subscribe('products.all')
  })
  // this.autorun()
});

Template.cart.helpers({
  products() {
    const res = Carts.find({open: true}).map(x=>{
      const prod = Products.findOne(x.productId)
      return Object.assign(x, {product: prod, total: prod.price*x.count})
    })
    return res
  },
  total(){
    const res = Carts.find({open: true}).map(x=>{
      return Object.assign(x, {product: Products.findOne(x.productId)})
    }).reduce((a, x)=>{
      a += x.count*x.product.price
      return a
    },0)
    return res
  }
});

Template.cart.events({
  'click .jsPay'(event, instance) {
    Meteor.call('orders.insert')
    FlowRouter.go('App.orders',)
  },
});
