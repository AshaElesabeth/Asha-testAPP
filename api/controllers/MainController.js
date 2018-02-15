/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

	landingPage: function(req,res){	

	Chat.find().exec(function(err,foundChats){
		if(err) 
			return res.negotiate(err);

		// to show the user who is currently logged in 
		if(req.session.userId == null){
			 
			res.view('main_page', {
				title: 'Main page',
				me: null,
				chats: foundChats,
			});
    		
		}
		else {
			User.findOne({id: req.session.userId}).exec(function(err, foundUser){
				if (err)
					return res.negotiate(err);
				
				 
				res.view('main_page', {
					title: 'Main page',
					me: foundUser.email,
					chats: foundChats,
				});
    			
			});
		}

	});
	
	},
	// to load the register page
	loadRegisterPage: function(req,res){
		var locals= {
			title: 'Register page',
		};

		res.view('register_page', locals);
	},

	// to load the login page
	loadLoginPage: function(req,res){
		var locals= {
			title: 'Login page',
		};

		res.view('login_page', locals);
	},

	


	
};

