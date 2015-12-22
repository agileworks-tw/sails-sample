// import should from 'should'
import supertest from 'supertest'
import sinon from 'sinon'
var request = supertest('http://localhost:1338');

describe('upload', function() {
  before(async (done) => {
    try {
      let user = await User.create({
        "username": "testPost",
  			"email": "testPost1@gmail.com",
  			"age": 18
      });

      sinon.stub(UserService, 'getLoginState', (req) => {
        return true;
      });

      sinon.stub(UserService, 'getLoginUser', (req) => {
        return user;
      });


      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });

  after(async (done) => {
    UserService.getLoginState.restore();
    UserService.getLoginUser.restore();
    done();
  });
  it('a file', function (done)  {
    try {
      request.post('/api/uploadImage')
       .attach('image', 'assets/img/logo.png')
       .end(function(err, res) {
           console.log(res.body[0]);
           res.body[0].should.have.any.keys('name','src');
           // res.should.have.status(200) // 'success' status
           done()
       });
    } catch (e) {
      sails.log.error(e);
      done(e);
    }

  });
});
