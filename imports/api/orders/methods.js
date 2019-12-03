// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Orders, Carts } from '../cols.js';

Meteor.methods({
  'orders.insert'() {
    // const orders = Carts.find({_id: {$in: carts.map(x=>x._id)}}, {_id: -1, createdAt: -1, updatedAt: -1}).fetch()
    const orders = Carts.find({open: true}).fetch()
    Carts.remove({_id: {$in: orders.map(x=>x._id)}})
    Orders.insert({items: orders})
  },
});
