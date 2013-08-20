// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();
var Achievement = require('cloud/lib/achievement');
var testCreate = require('cloud/testCreate');
var OgRender = require('cloud/lib/renderOgObject');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body



// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/achievement/:id', function(req, res) {
  var id = req.params.id;
  console.log('achievement:' + id);
  OgRender.render(Achievement, id, res);
});

app.get('/create', testCreate);

app.get('/test', function(req, res) {
  console.log('test');
  var query = new Parse.Query('Achievement');
  query.get('A0QUdTZ6Sv').then(function(obj) {
    console.log('oooooo');
    console.log('obj=' + JSON.stringify(obj));
    var ogProps = obj.getOgProperties();
    obj.ensureOgRegistered().then(function(result) {
      console.log("done" + JSON.stringify(result));
      res.json('hello');
    });
  });
});

console.log('start');
app.listen();
