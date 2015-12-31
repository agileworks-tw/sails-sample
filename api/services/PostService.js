module.exports = {

  create: async(data, req) => {
    try {

      let user = UserService.getLoginUser(req);

      let item;
      if (!data.detail.radioItem) {
        var itemData = {
          LikeId: data.hobby,
          itemname: data.detail.item
        }
        if (data.detail.images != undefined || data.detail.images != null) {
          itemData.pic = data.detail.images;
        }
        item = await ItemService.create(itemData);
      } else {
        item = await Item.findById(data.detail.radioItem);
        item.quantity++;
        await item.save();
      }

      let post = await Post.create({
        title: data.detail.title,
        startDate: data.detail.startDate,
        endDate: data.detail.endDate,
        price: data.detail.price,
        content: data.detail.content,
        mode: data.mode,
        ItemId: data.detail.radioItem || item.id,
        UserId: user.id,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        geometry: {
          type: 'Point',
          coordinates: [data.location.latitude, data.location.longitude]
        },
        images: data.images
      });
      return post;
    } catch (e) {
      throw e;
    }
  },

  getAllPost: async() => {
    try {
      let getPost = await Post.findAll({
        include: [{
          model: Item,
          include: Like
        }, {
          model: User
        }],
        order: 'createdAt DESC'
      });
      sails.log.info("getPost[0]=>", getPost[0]);


      let postArray = getPost.map((post) => {
        let pic = post.images || post.Item.pic || '/img/items/1.jpg'
        let data = {
          id: post.id,
          title: post.title,
          mode: post.mode,
          price: post.price,
          location: post.Item.itemname,
          latitude: post.latitude,
          longitude: post.longitude,
          url: `/postDetail/${post.id}`,
          type: post.Item.Like.title,
          // type_icon: post.Item.Like.icon,
          type_icon: "../icons/store/apparel/bags.png",
          gallery: [pic],
          content: post.content
        };
        return data;
      });

      postArray = {
        data: postArray
      }
      return postArray;
    } catch (e) {
      throw e;
    }
  },

  getPostById: async(id) => {
    try {
      let getPost = await await Post.findOne({
        where: {
          id: id
        },
        include: [{
          model: Item,
          include: Like
        }, {
          model: User
        }]
      });
      sails.log.info(getPost);

      let pic = getPost.images || getPost.Item.pic || '/img/items/1.jpg';
      let data = {
        id: getPost.id,
        price: getPost.price,
        title: getPost.title,
        mode: getPost.mode,
        location: getPost.Item.itemname,
        latitude: getPost.latitude,
        longitude: getPost.longitude,
        url: `/getPostDetail/${getPost.id}`,
        type: getPost.Item.Like.title,
        // type_icon: getPost.Item.Like.icon,
        type_icon: "../icons/store/apparel/bags.png",
        gallery: [pic],
        username: getPost.User.username,
        email: getPost.User.email,
        itemname: getPost.Item.itemname,
      };

      return data;
    } catch (e) {
      throw e;
    }
  },

  getAllCategory: async() => {
    try {
      let like = await Like.findAll();
      sails.log.info(like);
      return like;
    } catch (e) {
      throw e;
    }
  },

  // search
  getPostByKeyword: async(keyword) => {
      try {
        let getPosts = await await Post.findAll({
          where: {
            $or: [{
              'title': {
                $like: '%'+keyword+'%'
              }
            }, {
              'content': {
                $like: '%'+keyword+'%'
              }
            }]
          },
          include: [{
            model: Item,
            include: Like
          }, {
            model: User
          }]
        });
        // // sails.log.info(getPost);
        var data = [];
        getPosts.forEach(function(post) {
          let pic = post.images || post.Item.pic;
          if(!pic) pic = '/img/items/1.jpg';
          data.push({
            id: post.id,
            price: post.price,
            title: post.title,
            mode: post.mode,
            location: post.Item.itemname,
            latitude: post.latitude,
            longitude: post.longitude,
            url: `/getPostDetail/${post.id}`,
            type: post.Item.Like.title,
            // type_icon: getPost.Item.Like.icon,
            type_icon: "../icons/store/apparel/bags.png",
            gallery: [pic],
            username: post.User.username,
            email: post.User.email,
            itemname: post.Item.itemname,
          });
        }); // end forEach
        console.log("data length=>", data.length);
        return data;
      } catch (e) {
        throw e;
      }
    } // end search

}
