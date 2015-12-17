var Flickr = require("node-flickr");
var keys = {"api_key": "c82bbfe5b720373012b6bcbae70fe0c6"}

module.exports = {

  search: async () => {
    try {
      console.log('test');
      let flickr = new Flickr(keys);

      let result = await new Promise((done) => {
        flickr.get("photos.search", {"tags":"狗"}, (err, result) => {
            // if (err) return console.error(err);
            // console.log(result.photos);
            // console.log();
            let img = result.photos[0];
            let url = `https://farm${img.farm}staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;
            console.log('url', url);
            done(url);
        });

      });
      console.log(result);
      // return result;
      console.log('result',result);

    } catch (e) {
      throw e;
    }
  }
}
