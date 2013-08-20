
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body


var Achievement = Parse.Object.extend('Achievement', {  
  getOgProperties: function() {
    var OG = Achievement.OG;
    var og={
      'og:type': OG.type,
      'og:url': OG.urlTemplate + this.id,
    };

    for (var k in OG.propMap) {
      og[k] = this.get(OG.propMap[k]);
    }

    return og;
  }
}, {
  OG: {
    type: 'game.achievement',
    urlTemplate: 'http://friendsmash.parseapp.com/achievement/',
    propMap: {
      'og:title': 'title',
      "og:description": 'description',
      "og:image": 'image',
      "game:points": 'points',
    }
  }
});

