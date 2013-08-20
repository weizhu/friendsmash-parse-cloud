/**
* A lightweight Facebook API library
*
*/

var url = require('url');
var crypto = require('crypto');
var querystring = require('querystring');
var _ = require('underscore');

var facebook_address = 'https://www.facebook.com';
var auth_dialog_path = '/dialog/oauth';
var graph_host = 'graph.facebook.com';
var graph_access_token_path = '/oauth/access_token';
var fql_query_host = 'api.facebook.com';
var fql_query_path = '/method/fql.query';

var options;


/**
* Interact with the Facebook API.
*
* @param access_token The authenticating access token
*/
function Facebook(access_token) {
  
	/**
	* Send the https GET request 	*
	* @param opts Options for the https.get function
	*/
	function request(opts) {
    return Parse.Cloud.httpRequest(opts).then
    (function(response) {
      console.log('response =' + response.text);
      var data = JSON.parse(response.text);
      return data;
    },
     function(error) {
       console.log('request failed=' + error.toString());
     }
    );
  }

  /**
     * Make a Graph API call.
     *
     * @param target Path to the resource
     * @param params parameter to be encoded as query strings
     * @param httpMethod Optional HTTP Method. Default is 'get'
     */
  this.graph = function (target, params, httpMethod) {
    params = params ? params :  {};
    params.access_token = access_token;
    httpMethod = httpMethod ? httpMethod : 'get';
    var parsed = url.parse(target);
    params = _.extend(querystring.parse(parsed.query), params);
    console.log("graph");
    var opts = {
      url: 'https://' + graph_host +  ('/' + parsed.pathname + '?' + querystring.stringify(params)),
    };
    if (httpMethod != 'get') {
      opts = {
        url : 'https://' + graph_host + '/' + parsed.pathname + '?' + querystring.stringify(params),
        followRedirect: false,
        body: '',
        encoding: 'utf-8',
        method: 'POST',
      };
    }
    return request(opts);
  }
}

exports.Facebook = Facebook;
exports.getAppGraph = function() {
  return new Facebook(options.appAccessToken);
}
