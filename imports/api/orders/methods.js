// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Orders, Carts, Products } from '../cols.js';

Meteor.methods({
  'orders.insert'() {
    // const orders = Carts.find({_id: {$in: carts.map(x=>x._id)}}, {_id: -1, createdAt: -1, updatedAt: -1}).fetch()
    const orders = Carts.find({open: true}, {open: 0, _id: 0}).fetch()
    Carts.remove({_id: {$in: orders.map(x=>x._id)}})
    const price = Meteor.call('orders.price', orders)
    Orders.insert({items: orders, paid: price})
  },
  'orders.price'(items){
    const price= items.map(x=>{
      return Object.assign(x, {product: Products.findOne(x.productId)})
    }).reduce((a, x)=>{
      a += x.count*x.product.price
      return a
    },0)
    return price
  }
});
