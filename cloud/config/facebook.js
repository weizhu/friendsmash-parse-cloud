var root = '../';

var options = {
  appId: '167286716771766',
  appSecret: 'ffc3f4f6db901fae64847c67ecfbaea9',
  scope: 'email',
  appName: 'smashparse',
  redirect_uri: 'http://friendsmash.parseapp.com/fblogin/'
}


var appAccessToken = options.appId + '|' + options.appSecret;

module.exports = {
  options: options,
  appAccessToken: appAccessToken
}


