// import fs from 'fs-extra';

module.exports = {

  basicData: async () => {
    let like = [
      {title: 'a'},
      {title: 'b'},
      {title: 'c'},
      {title: '12'},
      {title: '123'},
      {title: '1234'},
      {title: '12345'},
      {title: '123456'},
      {title: '1234567'},
      {title: '12345678'},
      {title: '123456789'},
      {title: '1234567890'},
    ];
    await Like.bulkCreate(like);
  }
}
