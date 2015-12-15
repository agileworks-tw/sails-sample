module.exports = {
  findAll: async () => {
    try {
      return await Item.findAll();
    } catch (e) {
      throw e;
    }
  },


  create: async({LikeId,itemname}) => {
    try{
      let createItem = await Item.create({
        itemname: itemname,
        LikeId: LikeId
      });
      return createItem;
    } catch (e) {
      throw e;
    }
  }


}
