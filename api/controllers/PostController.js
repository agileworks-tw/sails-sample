module.exports = {

  postStory: async (req, res) => {
    try {
      console.log("==== postStory ===",req.body);
      let data = req.body;
      await PostService.create(data);
      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }


}
