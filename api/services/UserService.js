module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },







  // Demo for callback
  get_callback: function( authId, callback ) {
    User.findOne({
      where: {
        id: authId
      }
    }).then(function( value ) {
      callback( value );
      return value;
    }).catch(function( error ) {
      return error;
    });
  },
  get_promise: function( authId, callback ) {
    return new Promise(function( resolve, reject ) {
      User.findOne({
        where: {
          id: authId
        }
      }).then(function( value ) {
        return resolve( value );
      }).catch(function( error ) {
        return reject( error );
      });
    });
  }
}
