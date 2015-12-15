module.exports = {

  create: async(data) => {
    try {
      sails.log.info(data);
      let user = await User.findById(userId);
      user.email = userMail;
      user = await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  }

}
