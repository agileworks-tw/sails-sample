module.exports = {

  create: async(data) => {
    try {
      sails.log.info(data);
      let post = await Post.create({

        itemname: itemname,
        LikeId: LikeId
      });
      return post;
    } catch (e) {
      throw e;
    }
  },


}
