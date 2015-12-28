var util = require('util');
var crypto = require('crypto');
var _ = require('lodash');

let key = sails.config.appn.key;
let secret = sails.config.appn.secret;

module.exports = {

  genCheckMacValue: (data) => {

    var keys = Object.keys(data);
    var sortedKeys = _.sortBy(keys, function(key) {
      return key;
    });
    var uri = _.map(sortedKeys, function(key) {
      return key + '=' + data[key];
    }).join('&');
    // uri = encodeURIComponent(uri);
    uri = util.format('API_Key=%s&%s&API_Secret=%s', key, uri, secret);
    uri = uri.toLowerCase();
    var checksum = crypto.createHash('md5').update(uri).digest('hex').toUpperCase();

    return checksum;
  },
}
