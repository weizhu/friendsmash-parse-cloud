console.log('debug.js');
exports.inspect = function(obj) {
  console.log('inspect obj: type=' + typeof(obj));
  console.log('keys: ');
  for(var k in obj) {
    console.log('  ' + k);
  }
};
