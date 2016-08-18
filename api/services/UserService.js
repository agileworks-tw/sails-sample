module.exports = {

  checkUser: async ({user}) => {
    try {

      let userExist = {email: '', password: ''}

      let where = {
        email: user.email,
        password: user.password
      }
      
      // 根據 model 的 spec 完成下列實作
      // userExist = await User.findOne({where});

      return userExist;

    } catch (e) {
      throw e;
    }
  },
}
