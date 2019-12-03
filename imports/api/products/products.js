// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Class } from 'meteor/jagi:astronomy';
SimpleSchema.extendOptions(['autoform']);

export const Products = new Mongo.Collection('products');
export const Product = Class.create({
  name: 'Product',
collection: Products,
fields: {
    title: {
        type: String,
        validators: [{
            type: 'maxLength',
            param: 100
        }]
    },
    description: {
        type: String,
        validators: [{
            type: 'maxLength',
            param: 500
        }]
    },
    price: {
        type: Number,
        validators: [{
            type: 'gte',
            param: 0
        }]
    },
    imageIds: {
        type: [String],
        // nested: String
    },
  },
  behaviors: {
  slug: {
    // The field name from which a slug will be created.
    fieldName: "title",
    // The field name where a slug will be stored.
    slugFieldName: 'slug',
    // A flag indicating if we can update a slug.
    canUpdate: true,
    // A flag indicating if a slug is unique.
    unique: true,
    // A separator used for generating a slug.
    separator: '-'
  }
}

});

// Products.attachSchema(pSchema)

