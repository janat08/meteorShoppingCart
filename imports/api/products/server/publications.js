// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Products } from '../products.js';

const MAX_PRODUCTS = 1000

Meteor.publish('products.all', function (limit, sort = {createdAt: -1}) {
  return Products.find({}, {sort: sort, limit: Math.min(MAX_PRODUCTS, limit)});
});

Meteor.publish('products.one', function (_id) {
  return Products.find({
      _id: {$eq: _id}
  }, {limit: 1});
});
