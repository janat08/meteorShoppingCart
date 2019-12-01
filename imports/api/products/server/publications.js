// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Products } from '../products.js';

Meteor.publish('products.all', function () {
  return Products.find();
});

Meteor.publish('products.one', function (name) {
  return Products.find({
      name: {$eq: name}
  });
});
