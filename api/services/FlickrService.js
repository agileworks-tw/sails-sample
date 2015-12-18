var Flickr = require("node-flickr");
var keys = {"api_key": "c82bbfe5b720373012b6bcbae70fe0c6"}

module.exports = {

  search: async (tags) => {
    try {
      console.log('test');
      let flickr = new Flickr(keys);

      let result = await new Promise((done) => {
        flickr.get("photos.search", {"text": tags, "licenses": 9}, (err, result) => {
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
  }
}
