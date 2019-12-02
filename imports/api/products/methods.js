// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Products, ImagesFiles } from '../cols.js';

Meteor.methods({
  'products.upsert' ({ _id, title, description, price, imageIds }) {
    // check(description, String);
    // check(title, String);
    // check(price, Number);
    var productId = _id
    const update = {
      title,
      description,
      price,
      updatedAt: new Date(),
    }
    console.log(imageIds)
    if (!productId) {
      productId = Products.insert({ ...update, createdAt: new Date(), imageIds: imageIds })
    } else {
      Products.update(productId, { $set: {...update}, $addToSet: {imageIds: {$each: imageIds}}})
    }

    const updatedI = ImagesFiles.update({ _id: { $in: imageIds } }, {$set:{ meta: { productId: productId }} })
    return productId

  },
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
