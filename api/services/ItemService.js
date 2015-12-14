module.exports = {
  findAll: async () => {
    try {
      return await Item.findAll();
    } catch (e) {
      throw e;
    }
  },
  getItemState: function(req) {
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
      let item = await Item.findById(ItemId);
      let ItemSearch = await Item.setsearch(SearchArray);
      item.isFirstLogin = false;
      await item.save();
      return ItemSearch;
    } catch (e) {
      throw e;
    }
  },

  updateItemFind: async({ItemId,ItemFind}) => {
    try {
      sails.log.info(ItemId,ItemFind);
      let item = await Item.findById(ItemId);
      item.Find = itemFind;
      item = await item.save();
      return item;
    } catch (e) {
      throw e;
    }
  }
}
