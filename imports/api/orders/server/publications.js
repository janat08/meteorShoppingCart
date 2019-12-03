// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Orders } from '../orders.js';

Meteor.publish('orders.all', function (open= true) {
  return Orders.find();
});
