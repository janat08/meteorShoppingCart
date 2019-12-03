// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Carts } from './carts.js';

Meteor.methods({
  'carts.insert'(products) {
    console.log(this.userId)
    Carts.upsert({open: {$eq: true}}, {products: products, open: true})
  },
  'carts.upsert'(id){
    Carts.upsert({open: {$eq: true}, productId: {$eq: id}}, {$set: {open: true, productId: id}, $inc: {count: 1}})
  },
  'carts.decrement'(id){
    Carts.update({open: {$eq: true}, productId: {$eq: id}, count: {$gt: 1}}, {$inc: {count: -1}})
  },
});
