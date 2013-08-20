var Achievement = require('cloud/lib/achievement');

exports.create = function(req, res) {
  console.log('create');
  var items = [
    {
      image: 'http://friendsmash.parseapp.com/img/stone.png',
      name: 'stone',
      title: 'Stone',
      desp: 'Big rock',
      points: 10
    },
    {
      image: 'http://friendsmash.parseapp.com/img/wood.png',
      name: 'wood',
      title: 'Wood',
      desp: 'Wood to burn',
      points: 10
    },
    {
      image: 'http://friendsmash.parseapp.com/img/milk.png',
      name: 'milk',
      title: 'Milk',
      desp: 'Milk makes you grow',
      points: 20
    },
    {
      image: 'http://friendsmash.parseapp.com/img/water.png',
      name: 'water',
      title: 'Water',
      desp: 'Thirsty?',
      points: 30
    }
  ];

  var promises = [];
  for (var i=0; i < items.length; i++) {
    promises.push((new  Achievement(items[i])).save());
  }

  Parse.Promise.when(promises).then(function(result) {
    console.log('created all');
    res.json('done');
  }, function(err) {
    console.log('err=' + err.toString());
    res.json({'err': err.toString()});
  });
});
