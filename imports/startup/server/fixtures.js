// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { ImagesFiles, Products } from '../../api/cols.js'

if (!Products.findOne({title: 'The abcd'})){
    console.log(Products.findOne({title: 'The abcd'}))
    ImagesFiles.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
        fileName: 'logo.png',
        meta: {
            productId: "abcd"
        }
    }, function(er, fileRef) {
        if (er){
            console.log(er, "cant load the mock product")
        }
            Products.insert({
                price: 23,
                title: 'The abcd', 
                description: 'mocked product',
                imageIds: [fileRef._id]
            })
    });
} 
     