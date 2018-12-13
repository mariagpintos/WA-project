const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** @constructor
* @augments TopicSchemaInstance
* @param {Object} definition
*/
const TopicSchema = new mongoose.Schema({
    //_id: {type: String},
    name: {type: String, required: true},
    //dataURL: {type: String, required: true, default: ""},
    //dataURL: {type: String,  default: ""},
    images: {type:String,required:false, default: {}},
    mostPopular: {type:String, required:false},

    links: {type:Object, default: {}}
  }
);

mongoose.model('Topics', TopicSchema);
