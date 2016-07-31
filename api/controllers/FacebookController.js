/**
 * FacebookController
 *
 * @description :: Server-side logic for managing facebooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getFriends: async (req ,res) => {
    try{
      let friends = await Facebook.findAll();
      res.ok(friends);
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
    try{
      let friends = await Facebook.findAll();
      res.ok(friends);
      res.end();
    }
    catch(e){
      throw e;
    }

  },

  create: async(req , res) => {
    try{

    }
    catch(e){
      throw e;
    }
  },

  update: async(req , res) => {
    try{

    }
    catch(e){
      throw e;
    }
  },

  destroy: async(req , res) => {
    try{

    }
    catch(e){
      throw e;
    }
  }
};
