var _ = require('underscore');

var define = function(className, instanceMethods, classMethods) {
  var cls = function() {
  };


  _.extend(cls.prototype, Parse.Object.prototype);

  if (instanceMethods) {
    _.extend(cls.prototype, instanceMethods);
  }

  if (classMethods) {
    _.extend(cls, classMethods);
  }

  cls.cast = function(obj) {
    console.log('cast to ' + className);
    _.extend(obj, instanceMethods);
    return obj;
  }

  cls.PClass = Parse.Object.extend(className, instanceMethods, classMethods);
  return cls;
}

module.exports = define;
