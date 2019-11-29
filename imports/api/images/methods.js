// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Images } from './images.js';

Meteor.methods({
  'images.insert'(title, url) {


    return Images.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
});
