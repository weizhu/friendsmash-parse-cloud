var FB = require('cloud/facebook/fb');
var fbConfig = require('cloud/config/facebook');

var OgObject = {
  getOG: function() {
    // The derived class should have a static member called OG
    return this.constructor.OG;
  },

  getOgProperties: function() {
    var OG = this.getOG();
    var og={
      'og:type': OG.type,
      'og:url': this.getOgUrl()
    };

    for (var k in OG.propMap) {
      og[k] = this.get(OG.propMap[k]);
    }

    return og;
  },

  getOgUrl: function() {
    return this.getOG().urlTemplate + this.id;
  }
};


module.exports = OgObject;
