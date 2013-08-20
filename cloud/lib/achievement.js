console.log("achivement.js");
var FB = require('cloud/facebook/fb');
var fbConfig = require('cloud/config/facebook');
var _ = require('underscore');
var OgObject = require('cloud/lib/ogobject');
var appConfig = require('cloud/config/app');

var Achievement = Parse.Object.extend('Achievement', _.extend({  
  ////////////////////// Instance Methods ///////////////
  ensureOgRegistered: function() {
    console.log("ensureOgRegistered");
    if (this.get('registered')) {
      return new Parse.Promise().resolve(this);
    }
    console.log('this=' + JSON.stringify(this));
    console.log('regisreteed=' + this.get('registered'));
    var self = this;
    var fb = new FB.Facebook(fbConfig.appAccessToken);
    return fb.graph('/' + fbConfig.options.appId + '/achievements',
                    {
                      achievement: this.getOgUrl()
                    },
                    'POST').then(
      function(result) {
        console.log("graph back");
        return self.save({
          registered: true
        });
      });
  },
  ////////////////////// Mixin OgObject ////////////////
}, OgObject), {
  ////////////////////// Static Methods ////////////////////
  OG: {
    type: 'game.achievement',
    urlTemplate: 'http://' + appConfig.appDomain + '/achievement/',
    propMap: {
      'og:title': 'title',
      "og:description": 'desp',
      "og:image": 'image',
      "game:points": 'points',
    }
  },
});

module.exports = Achievement;
