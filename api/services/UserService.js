module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },
  checkUser: async ({user}) => {
    try {
      let where = {
        email: user.email,
        password: user.password
      }
      let userExist = await User.findOne({where});
      return userExist;

    } catch (e) {
      throw e;
    }
  },
}
