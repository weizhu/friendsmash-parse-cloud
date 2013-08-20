console.log('cast.js');
module.exports = function(subclass, obj) {
  console.log('cast id=' + obj.id);
  var query = new Parse.Query(subclass);
  
  return query.get(obj.id);
}
