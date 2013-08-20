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

module.exports = Achievement;
