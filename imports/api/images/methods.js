// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ImagesFiles, Products } from '../cols.js';

Meteor.methods({
  'images.remove'(id) {
    const productId = ImagesFiles.findOne(id).meta.productId
    Products.update(productId, { $pull: { imageIds: id } })
    return ImagesFiles.remove(id);
  },
});
