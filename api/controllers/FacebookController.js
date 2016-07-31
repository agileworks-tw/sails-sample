/**
 * FacebookController
 *
 * @description :: Server-side logic for managing facebooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var FB = require('fb');
var fb = new FB.Facebook();

module.exports = {
  getFriends: async function(token, userId){
    try{
      fb.setAccessToken(token);
      let result = await new Promise( function(resolve, reject){
        fb.api(`${userId}/friends`, function(res , err){
          if(err){
            reject(err);
          }else{
            resolve(res.data);
          }
        });
      });

      return result;
    }
    catch(e){
      throw e;
    }

    // fb.api('4',{fields: [friends]}, function(res){
    //
    //   if(!res || res.error){
    //     console.log(!res ? 'error occurred' : res.error);
    //     return;
    //   }
    //
    //   console.log(JSON.stringify(res.friends.data));
    //   return res.friends.data;
    //
    // });
  }
};
