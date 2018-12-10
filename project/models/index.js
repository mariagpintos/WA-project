/** @module models/index.js
* Loads all models
*/
'use strict';

const mongoose = require('mongoose');

require('./Favorites');

module.exports = {
  'Favorites' : mongoose.model('Favorites')
}

