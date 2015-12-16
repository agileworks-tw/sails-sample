module.exports = {

  create: async(data) => {
    try {

      let user = UserService.getLoginUser();

      let itme;
      if( !data.detail.radioItem ){
        itme = await ItemService.create({
          LikeId: data.hobby,
          itemname: data.detail.item
        });

      }

      

      let post = await Post.create({
        title: data.detail.title,
        content: '',
        mode: data.mode,
        ItemId: data.detail.radioItem || itme.itemname,
        UserId: user.id,
        geometry: {
          type: 'Point',
          coordinates: [data.location.latitude,data.location.longitude]
        }
      });
      return post;
    } catch (e) {
      throw e;
    }
  },


  getNearbyPost: async({latitude, longitude}) => {
    try {
      sails.log.info({latitude, longitude});
      let post;
      return post;
    } catch (e) {
      throw e;
    }
  }

}
