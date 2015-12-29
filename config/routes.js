 /**
  * Route Mappings
  * (sails.config.routes)
  *
  * Your routes map URLs to views and controllers.
  *
  * If Sails receives a URL that doesn't match any of the routes below,
  * it will check for matching files (images, scripts, stylesheets, etc.)
  * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
  * might match an image file: `/assets/images/foo.jpg`
  *
  * Finally, if those don't match either, the default 404 handler is triggered.
  * See `api/responses/notFound.js` to adjust your app's 404 logic.
  *
  * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
  * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
  * CoffeeScript for the front-end.
  *
  * For more information on configuring custom routes, check out:
  * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
  */

 module.exports.routes = {

   /***************************************************************************
    *                                                                          *
    * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
    * etc. depending on your default view engine) your home page.              *
    *                                                                          *
    * (Alternatively, remove this and add an `index.html` file in your         *
    * `assets` directory)                                                      *
    *                                                                          *
    ***************************************************************************/

   '/2': {
     view: 'index2'
   },

   '/main': {
     view: 'main'
   },

   '/map': {
     view: 'map'
   },

   '/': {
     view: 'index'
   },

   '/storyDetail': {
     view: 'storyDetail'
   },

   'get /login': 'AuthController.login',
   'get /logout': 'AuthController.logout',
   'get /register': 'AuthController.register',

   'get /auth/status': 'AuthController.status',

   'post /auth/local': 'AuthController.callback',
   'post /auth/local/:action': 'AuthController.callback',

   'get /auth/:provider': 'AuthController.provider',
   'get /auth/:provider/callback': 'AuthController.callback',
   'get /auth/:provider/:action': 'AuthController.callback',

   'post /updateHobbyAndMail': 'UserController.updateHobbyAndMail',
   'get /hobby': 'UserController.hobbyView',

   'get /main': 'UserController.index',
   'get /story': 'PostController.story',
   'get /storyCategory': 'PostController.storyCategory',
   'get /storyDetail/:id': 'PostController.getStoryCategoryItemById',
   'post /getAllPost': 'PostController.getAllPost',
   'post /postStory': 'PostController.postStory',
   'get /postDetail/:id': 'PostController.getPostById',

   'post /addUserFavorite/:id': 'UserController.addUserFavorite',

   // image
   'get /testUpload': 'ImageController.index',
   'post /api/uploadImage': 'ImageController.upload',

   // search
   'get /search': {
     view: 'search'
   },
   'get /search/:keyword': 'PostController.getPostByKeyword'

   /***************************************************************************
    *                                                                          *
    * Custom routes here...                                                    *
    *                                                                          *
    * If a request to a URL doesn't match any of the custom routes above, it   *
    * is matched against Sails route blueprints. See `config/blueprints.js`    *
    * for configuration options and examples.                                  *
    *                                                                          *
    ***************************************************************************/

 };
