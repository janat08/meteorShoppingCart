// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Carts } from '../carts.js';

Meteor.publish('carts.all', function (open= true) {
  return Carts.find({userId: this.userId, open: open});
});
