//var Achievement = require('cloud/lib/achievement');
var Achieve= require('cloud/lib/achieve');
   
console.log("hooffk ");

Parse.Cloud.beforeSave('Achieve', function(request, response) {
  request.object.onBeforeSave(request, response);
});
