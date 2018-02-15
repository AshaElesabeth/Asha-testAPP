/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var Emailaddresses = require('machinepack-emailaddresses');

module.exports = {

	registerUser: function(req,res){
		
		// check if email id is entered
		if (_.isUndefined(req.param('email'))) {
      		return res.badRequest('An email address is required!');
    	}
    	// check id password is entered
    	if (_.isUndefined(req.param('password'))) {
      		return res.badRequest('A password is required!');
    	}
    	// check if confirm password is entered
    	if (_.isUndefined(req.param('confpassword'))) {
      		return res.badRequest('Password needs to be confirmed!');
    	}
    	// check if the entered password match 
    	if (req.param('password')!= req.param('confpassword')){
    		return res.badRequest('Passwords entered do not match!');
    	}
		
    	var details = {
    		username: req.param('username'),
    		email: req.param('email'),
    		password: req.param('password')
    	};

    	//add user to database
    	User.create(details).exec(function(err, createdUser){
    		if (err)
    			return res.negotiate(err);

    		req.session.userId = createdUser.id;

    		return res.redirect('/');
    	});
		
	},

	loginUser: function(req,res){

		User.findOne({email: req.param('email')}).exec(function(err, foundUser){
			if(err)
				return res.negotiate(err);
			if(!foundUser)
				return res.badRequest('User does not exist! Please register!');
			
			//check if the password enterd by user is correct
			if (foundUser.password != req.param('password'))
				return res.badRequest('Incorrect password');
			

			req.session.userId = foundUser.id;

			return res.redirect('/');
		});

	},

	logoutUser: function(req,res) {

		req.session.userId = null;

		res.redirect('/');
	},


	
};

