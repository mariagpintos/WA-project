const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** @constructor
* @augments FavoriteSchemaInstance
* @param {Object} definition
*/
const FavoritesSchema = new mongoose.Schema({
    //_id: {type: String},
    name: {type: String, required: true},
    dataURL: {type: String, required: true, default: ""},
    //dataURL: {type: String,  default: ""},
    bookmarked: {type: Boolean, default: false},
    dateCreated: {type: Date, default:Date.now, required: true},
    popularity: {type:Number,default:0},

    links: {type:Object, default: {}}
  }
);

mongoose.model('Favorites', FavoritesSchema);
