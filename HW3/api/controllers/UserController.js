/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
                index: function (req,res){
                      res.view('userIndex');
                },

                list: function(req,res){
                    Friend.find()
                    .then(function(users){
                      res.view('userList',{
                              users: users
                      });
                  });
                },

                page: function(req,res){
                    res.view("userPage");
                },

                createnew:function(req,res){
                    var name = req.body.name;
                    var fbID = req.body.fbID;
                    var email = req.body.email;

                        Friend.create({
                                fbID: fbID,
                                name: name,
                                email: email
                        })
                        .then(function (user){
                                res.redirect("/list");
                        })
                },

                destroy: function (req,res){
                    var id = req.params['id'];
                    Friend.destroy({
                      id : id
                    })
                    .then(function(user){
                      res.redirect("/list");
                    });

                }
};
