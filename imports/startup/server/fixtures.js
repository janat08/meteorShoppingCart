// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import {ImagesFiles} from '../../api/images/images.js'

if (ImagesFiles.find().count() == 0){
     ImagesFiles.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
      fileName: 'logo.png'
    }); 
}