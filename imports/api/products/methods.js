// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Products } from './products.js';

Meteor.methods({
  // 'products.insert'({title, description, price, images}) {
  //   check(description, String);
  //   check(title, String);
  //   check(price, Number);
  //   check(images, String);

  //   return Products.insert({
  //     title, description, price, images,
  //     createdAt: new Date(),
  //   });
  // },
});


// Products.createQuery({
//     $filter({filters, options, params}) {
//     // filters.isApproved = params.isApproved;
//     },
//     // $options: {sort: {createdAt: -1}},
//     images: 1,
//     description: 1,
//     title: 1,
//     price: 1
// });