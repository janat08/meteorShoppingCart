// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Carts } from './carts.js';

Meteor.methods({
  'carts.insert'(products) {
    return Carts.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
});
