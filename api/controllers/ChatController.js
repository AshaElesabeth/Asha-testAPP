/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// to record the HI's from User
	enterHI: function(req,res) {

		if(req.session.userId == null)
			res.badRequest('Need to login first!');
		else {

			User.findOne({id: req.session.userId}).exec(function(err, foundUser){
			if(err)
				return res.negotiate(err);
			if(!foundUser)
				return res.badRequest('User does not exist! Please register!');

			Chat.create({username: foundUser.username}).exec(function(err, createdChat){
				if(err)
				return res.negotiate(err);

				return res.redirect('/');
			

			});

		});

	}

	},
	
};

