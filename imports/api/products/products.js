// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Class } from 'meteor/jagi:astronomy';
import R from 'ramda'

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
            optional: true
        },
    },
    behaviors: {
        slug: {
            fieldName: "title",
            slugFieldName: 'slug',
            canUpdate: true,
            unique: true,
            separator: '-'
        }
    },
    meteorMethods: {
        "productUpsert"({ _id, title, description, price, imageIds }){
            if (_id){
                const val = Product.findOne(_id).set({title, description, price}, {
                    merge: true
                })
                val.set('imageIds', R.union(val.imageIds, imageIds))
                val.save()
            } else {
                new Product({title, description, price, imageIds})
            }
        }
    }

});

// Products.attachSchema(pSchema)
