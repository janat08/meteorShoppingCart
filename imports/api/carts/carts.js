// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Carts = new Mongo.Collection('carts');

export const Cart = Class.create({
    name: 'Cart',
    collection: Carts,
    fields: {
        open: {
            type: Boolean,
            default: true,
        },
        count: {
            type: Number,
            validators: [{
                type: 'minLength',
                param: 0
            }]
        },
        productId: {
            type: String,
        },
    },
});
