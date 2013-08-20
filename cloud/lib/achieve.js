var Achievement = require('cloud/lib/achievement');
var FB = require('cloud/facebook/fb');

var Achieve = Parse.Object.extend('Achieve', {  
  onBeforeSave: function(request, response) {
    console.log('onAfterSave');

    // First check to make sure that the creator of the achieve
    // action is indeed the him/herself.
    var self = this;
    var acl = this.getACL();
    var creator = this.get('by');
    console.log('creator=' + JSON.stringify(creator));
    if (!(creator && acl && acl.getWriteAccess(creator))) {
      console.log('invalid acl');
      response.error();
    }

    var achievement;
    this.get('achievement').fetch().then(function(result) {
      achievement = result;
      return achievement.ensureOgRegistered();
    }).then(function() {
      // Now call Facebook API to add achievement
      console.log("now callfacebook API");
      var authData= Parse.User.current().get('authData');
      var fbAuth = authData.facebook;
      if (fbAuth && fbAuth.access_token) { 
        var fb = new FB.Facebook(fbAuth.access_token);
        return fb.graph(fbAuth.id + '/achievements', {
          achievement: achievement.getOgUrl(),
          // TODO: Facebook Achievement API appears to have a bug where it will
          // fail when message parameter is passed.
          // For now we have to skip sending message paramter.
          //
          //message: self.get('message')
        }, 'POST').then(function(result) {
          console.log('post achievement result =' + JSON.stringify(result));
        });
      }
      console.log('No Facebook auth');
    }).then(function() {
      console.log('onBeforeSave success');
      response.success();
    }, function(error) {
      console.log('onbefre save error' + error.toString());
      response.error();
    });
  }

}, {

});

module.exports = Achieve;
