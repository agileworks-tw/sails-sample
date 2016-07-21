module.exports = {
  get_callback: function( title, callback ) {
    Post.findOne({
      where: {
        title: title
      }
    }).then(function( value ) {
      callback( value );
      return value;
    }).catch(function( error ) {
      return error;
    });
  },
  get_promise: function( title ) {
    return new Promise(function( resolve, reject ) {
      Post.findOne({
        where: {
          title: title
        }
      }).then(function( value ) {
        return resolve( value );
      }).catch(function( error ) {
        return reject( error );
      });
    });
  }
}
