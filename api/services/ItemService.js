module.exports = {
  findAll: async () => {
    try {
      return await Item.findAll();
    } catch (e) {
      throw e;
    }
  },
  getaLoginState: function(req) {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },

  getLoginItem: function(req) {
    if (req.session.passport != undefined && req.session.passport.Item) {
      return req.session.passport.Item;
    } else {
      return null;
    }
  },

  updateItemSearch: async({ItemId,SearchArray}) => {
    try {
      let Item = await Item.findById(ItemId);
      let ItemSearch = await Item.setsearch(SearchArray);
      Item.isFirstLogin = false;
      await Item.save();
      return ItemSearch;
    } catch (e) {
      throw e;
    }
  },

  updateItemFind: async({ItemId,ItemFind}) => {
    try {
      sails.log.info(ItemId,ItemFind);
      let Item = await Item.findById(ItemId);
      Item.Find = ItemFind;
      Item = await Item.save();
      return Item;
    } catch (e) {
      throw e;
    }
  }
}
