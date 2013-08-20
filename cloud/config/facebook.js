var root = '../';

var options = {
  appId: <your faceboook app id>,
  appSecret: <your facebook app secret>,
  scope: 'email',
  appName: <your facebook app namespace>, // 'smashparse',
  redirect_uri: <your facebook app redirect url>, //'http://friendsmash.parseapp.com/fblogin/'
}


var appAccessToken = options.appId + '|' + options.appSecret;

module.exports = {
  options: options,
  appAccessToken: appAccessToken
}


