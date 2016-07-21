module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },







  // Demo for callback
  get_callback: function( name, callback ) {
    User.findOne({
      where: {
        username: name
      }
    }).then(function( value ) {
      callback( value );
      return value;
    }).catch(function( error ) {
      return error;
    });
  },
  get_promise: function( name, callback ) {
    return new Promise(function( resolve, reject ) {
      User.findOne({
        where: {
          username: name
        }
      }).then(function( value ) {
        return resolve( value );
      }).catch(function( error ) {
        return reject( error );
      });
    });
  }
}
