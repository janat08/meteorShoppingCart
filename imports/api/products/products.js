// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Images } from '../cols.js'

SimpleSchema.extendOptions(['autoform']);

const Products = new Mongo.Collection('products');

const pSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 100
    },
    description: {
        type: String,
        label: "Description",
        max: 500,
    },
    price: {
        type: Number,
        label: "Price",
        min: 0
    },
    Images: {
        type: Date,
        label: "Last date this book was checked out",
        optional: true
    },
}, { tracker: Tracker })

// Products.attachSchema(pSchema)


Products.addLinks({
    'images': {
        type: 'many',
        collection: Images.collection,
        field: 'imageIds',
    }
})

console.log(typeof Products, 321)


export default Products