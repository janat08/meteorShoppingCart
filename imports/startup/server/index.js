// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';
import {Images} from '../../api/images/images.js'

    Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
      fileName: 'logo.png'
    });