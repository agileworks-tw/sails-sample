/**
 * FacebookController
 *
 * @description :: Server-side logic for managing facebooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var FB = require('fb');
var fb = new FB.Facebook();

module.exports = {
  getFriends: async (req ,res) => {
    try{
      let token  = "EAACEdEose0cBAFK3ooNdcpDsSL7WqvDrTfGXgox2X15HsHfPKXbZA4MWL2xDTkFWjqJKowK0umNmxxrApjN9P6bVMkdgJOTikPK1ZBiCUWpY55tOZBtrvNqh9lV42NTH4e6aNaqQC8LzoAiHyJdHqZA74szHg2VoedB3Lqg2oAZDZD",
          userId = "790001111011196"

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

      res.ok({result});
      res.end();
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
  },

  index: async(req , res) => {
    res.ok('Hello index');
    res.end();
  },

  create: async(req , res) => {
    res.ok('Hello create');
    res.end();
  },

  update: async(req , res) => {
    res.ok('Hello update');
    res.end();
  },

  destroy: async(req , res) => {
    res.ok('Hello destroy');
    res.end();
  }
};
