// import fs from 'fs-extra';

let like;

let self = module.exports = {

  basicData: async () => {
    like = [
      {title: '時尚', pic: '/img/hobby/fashation.png'},
      {title: '美妝保養', pic: '/img/hobby/lipstick.png'},
      {title: '設計工藝', pic: ''},
      {title: '生活3C', pic: ''},
      {title: '運動用品', pic: ''},
      {title: '攝影拍照', pic: ''},
      {title: '名牌精品', pic: ''},
      {title: '復古風情', pic: ''},
      {title: '遊戲玩物', pic: ''},
      {title: '傢具傢居', pic: ''},
      {title: '課本買賣', pic: ''},
      {title: '書籍雜誌', pic: ''},
      {title: '樂器樂譜', pic: ''},
      {title: '廚房家電', pic: ''},
      {title: '寶寶時尚', pic: ''},
      {title: '寵物用品', pic: ''},
      {title: '票卷交換', pic: ''},
      {title: '哩哩扣扣', pic: ''},
      {title: '預售代購', pic: ''}
    ];
    await Like.bulkCreate(like);
    await self.testData();
  },

  testData: async () => {
    let likeFashion = await Like.findOne({
      where:{
        title: like[0].title
      }
    });
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

    let likeFashion2 = await Like.findOne({
      where:{
        title: like[1].title
      }
    });
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

    let likeDesign = await Like.findOne({
      where:{
        title: like[2].title
      }
    });
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

    let likeIC = await Like.findOne({
      where:{
        title: like[3].title
      }
    });
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

    let post = {
      title: "testTitle",
      content: 'content',
      mode: "give",
      createdAt: "2015-12-15 10:09:07",
      updatedAt: "2015-12-15 10:09:07",
      ItemId: 17,
      UserId: 1,
      latitude: 39.807222,
      longitude: -76.984722,
      geometry: {
        type: 'Point',
        coordinates: [39.807222,-76.984722]
      }
    }
    let createPost = await Post.create(post);

    let itemPost = await Item.create({
      itemname: '鑽戒',
      LikeId: likeFashion.id
    });

    var randomInt = function (low, high) {
      return Math.floor(Math.random() * (high - low) + low);
    };

    for(let i =0 ;i < 50; i++){

      let latitude = 51.5377994 + Math.random()/20;
      let longitude = -0.1006775 + Math.random()/20;

      let item = [
        '手機',
        '平板',
        '電腦',
        '筆電',
        'iphone',
        '衣服',
        '褲子',
        '帽子',
        '鞋子',
        '包包',
        '皮夾'
      ];

      let itemPost = await Item.create({
        itemname: item[randomInt(0,item.length)],
        LikeId: likeFashion.id
      });


      let post = {
        title: "testTitle",
        content: 'content',
        mode: "give",
        createdAt: "2015-12-15 10:09:07",
        updatedAt: "2015-12-15 10:09:07",
        ItemId: itemPost.id,
        UserId: 1,
        latitude: latitude,
        longitude: longitude,
        geometry: {
          type: 'Point',
          coordinates: [latitude,longitude]
        }
      }
      let createPost = await Post.create(post);

    }
  }
}
