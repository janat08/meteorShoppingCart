// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Products = new Mongo.Collection('products');
const schema = new SimpleSchema({
    title:{
        type: String,
        max: 100
    },
    description: {
        type: String,
        max: 500
    },
    price: {
        type: Number,
        max: 9999999999999,
        min: 0
    },
    imageIds: {
        type: Array
    },
    'imageIds.$': SimpleSchema.RegEx.Id
})

Products.attachSchema(schema)
