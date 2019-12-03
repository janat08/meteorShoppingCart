// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Carts = new Mongo.Collection('carts');
const schema = new SimpleSchema({
    open: {
        type: Boolean
    },
    count: {
        type: SimpleSchema.Integer,
        min: 0
    },
    productId: {
        type: SimpleSchema.RegEx.Id
    }
})

Carts.attachSchema(schema)