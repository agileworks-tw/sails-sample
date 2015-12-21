
import config from '../../config/local'

module.exports = {
  index: async (req,res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/api/uploadImage" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="image" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: async  (req, res) => {
    try {

      let promise = new Promise((resolve, reject) => {
        req.file('image').upload(config.uploadImage, async (err, files) => {
          resolve(files);
        });
      });

      let files = await promise.then();
      let uploadImages = [];
      for (let i in files) {
        if(files[i].type.split('/')[0] == 'image') {
          let name = files[i].filename;
          let path = files[i].fd.split('/assets')[1];
          uploadImages.push({
            name: name,
            src: path
          });
        }
      }
      return res.json(uploadImages);
    } catch (e) {
      res.serverError(e);
    }
  }
}
