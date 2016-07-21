module.exports = {
  // Demo for callback
  get_callback: function( callback ) {
    Dashboard.findAll().then(function( value ) {
      callback( value );
      return value;
    }).catch(function( error ) {
      return error;
    });
  },
  get_promise: function( callback ) {
    return new Promise(function( resolve, reject ) {
      Dashboard.findAll().then(function( value ) {
        return resolve( value );
      }).catch(function( error ) {
        return reject( error );
      });
    });
  }
}
