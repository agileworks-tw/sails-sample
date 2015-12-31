var Flickr = require("node-flickr");
var ConnectSdk = require("connectsdk");
var keys = {"api_key": "c82bbfe5b720373012b6bcbae70fe0c6"}

module.exports = {

  search: async (tags) => {
    try {
      console.log('test');
      let flickr = new Flickr(keys);

      let result = await new Promise((done) => {
        flickr.get("photos.search", {"text": tags, "licenses": 7}, (err, result) => {
            let img = result.photos.photo[0];
            let url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;
            console.log(url);
            done(url);
        });
      });
      return result;

    } catch (e) {
      throw e;
    }
  },

  searchGetty: async (tags) => {
    try{

      var connectSdk = new ConnectSdk (
          sails.config.getty.ConnectSDK_ApiKey,
          sails.config.getty.ConnectSDK_ApiSecret)
          // sails.config.getty.ConnectSDK_UserName,
          // sails.config.getty.ConnectSDK_UserPassword)

      var search = connectSdk
          .search()
          .images()
          .withPage(1)
          .withPageSize(1)
          .withPhrase(tags)

      let result = await new Promise((done) => {
        search.execute(function(err, response) {
            if (err) throw err
            var pic = response.images[0].display_sizes[0].uri || ' '
            console.log(pic);
            done(pic);
        })
      });
      return result;
    }catch (e) {
      throw e;
    }
  }
}
