// import fs from 'fs-extra';

module.exports = {

  basicData: async () => {
    let like = [
      {title: '時尚'},
      {title: '美妝保養'},
      {title: '設計工藝'},
      {title: '生活3C'},
      {title: '運動用品'},
      {title: '攝影拍照'},
      {title: '名牌精品'},
      {title: '復古風情'},
      {title: '遊戲玩物'},
      {title: '傢具傢居'},
      {title: '課本買賣'},
      {title: '書籍雜誌'},
      {title: '樂器樂譜'},
      {title: '廚房家電'},
      {title: '寶寶時尚'},
      {title: '寵物用品'},
      {title: '票卷交換'},
      {title: '哩哩扣扣'},
      {title: '預售代購'}
    ];
    await Like.bulkCreate(like);
  }
}
