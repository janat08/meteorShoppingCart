// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.

import { Mongo } from 'meteor/mongo'

const Images = new Mongo.Collection('images');
const Products = new Mongo.Collection('products');
const Cart = new Mongo.Collection('cart');

export {Images, Products, Cart}