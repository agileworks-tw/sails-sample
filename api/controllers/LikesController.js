module.exports = {
  index: async (req, res) => {
    try {
      let lisks = await Likes.findAll();
      res.ok({lisks});
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async (req, res) => {
    try {
      let users = await Likes.findAll();
      res.ok({users});
    } catch (e) {
      res.serverError(e);
    }
  },

	create: async (req, res) => {
		try {
			const lisks = await Likes.create(req.body);
			res.ok(lisks);
		} catch (e){
			res.serverError(e);
		}
	},

	update: async (req, res) => {
    try {
      const result = await Likes.update(req.body.{
        whire:{
          id: req.params.id
        }
      });
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    },

    destory: async (req, res) => {
      try {
        const result = await Likes.destory({
          where:{
            id: req.params.id
          }
        });
        res.ok(result);
      } catch (d) {
        res.serverError(e);
      }
    }
	}
}
