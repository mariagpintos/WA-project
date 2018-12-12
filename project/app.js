const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const dust = require('klei-dust');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


//configure app
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

//views
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.engine('dust', dust.dust);


// Initialize routers here
const routers = require('./routes/routers');
app.use('/', routers.root);
app.use('/favorites', routers.favorites);
app.use('topics', routers.topics);

// app.set('port', process.env.PORT || 3000);
//
// const server = app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + server.address().port);
// });

module.exports = app;
