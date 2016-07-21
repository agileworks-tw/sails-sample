module.exports = {
  // Demo for callback
  get_dashboard_callback: function( req, res ) {
    DashboardService.get_callback(function( postList ) {
      res.json( postList );
    });
  },
  get_first_post_callback: function( req, res ) {
    DashboardService.get_callback(function( postList ) {
      PostService.get_callback(postList[0].title, function( post ) {
        res.json( post );
      });
    });
  },
  get_auth_of_first_post_callback: function( req, res ) {
    DashboardService.get_callback(function( postList ) {
      PostService.get_callback(postList[0].title, function( post ) {
        UserService.get_callback(post.auth, function( author ) {
          res.json( author );
        });
      });
    });
  },

  // Demo for promise ES6
  get_promise: function( req, res ) {
    DashboardService.get_promise().then(function( postList ) {
      return PostService.get_promise( postList[0].title );
    }).then(function( post ) {
      return UserService.get_promise( post.auth );
    }).then(function( author ) {
      res.json( author );
    });
  },

  // arrow function ES6
  get_arrow: ( req, res ) => {
    DashboardService.get_promise()
    .then( postList => PostService.get_promise( postList[0].title ) )
    .then( post => UserService.get_promise( post.auth ) )
    .then( author => res.json( author ) );
  },

  // async and await ES7
  get_async: async ( req, res ) => {
    let postList = await DashboardService.get_promise();
    let post = await PostService.get_promise( postList[0].title );
    let author = await UserService.get_promise( post.auth );
    res.json( author );
  },
}
