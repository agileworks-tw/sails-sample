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

    let likeFashion = await Like.create(like[0]);
    let itemlistFashion = [
      '衣服',
      '褲子',
      '帽子',
      '鞋子',
      '包包',
      '皮夾'
    ];
    await* itemlistFashion.map((fashion) => {
      Item.create({
        itemname: fashion,
        LikeId: likeFashion.id
      })
    });

    let likeFashion2 = await Like.create(like[1]);
    let itemlistFashion2 = [
      "化妝品",
      '化妝包',
      '口紅',
      '保養品',
      '護唇膏'
    ];
    await* itemlistFashion2.map((fashion) => {
      Item.create({
        itemname: fashion,
        LikeId: likeFashion2.id
      })
    });

    let likeDesign = await Like.create(like[2]);
    let itemlistDesign = [
      '桌子',
      '畫',
      '椅子'
    ];
    await* itemlistDesign.map((design) => {
      Item.create({
        itemname: design,
        LikeId: likeDesign.id
      })
    });

    let likeIC = await Like.create(like[3]);
    let itemlistIC = [
      '手機',
      '平板',
      '電腦',
      '筆電',
      'iphone'
    ];
    await* itemlistIC.map( async (ic) => {
      await Item.create({
        itemname: ic,
        LikeId: likeIC.id
      })
    });

    await Like.bulkCreate(like);



    let post = {
      title: "testTitle",
      content: 'content',
      mode: "give",
      createdAt: "2015-12-15 10:09:07",
      updatedAt: "2015-12-15 10:09:07",
      ItemId: 17,
      UserId: 1,
      geometry: {
        type: 'Point',
        coordinates: [39.807222,-76.984722]
      }
    }

    let createPost = await Post.create(post);
  }
}
