/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	// this model will store all the user's chat history

	connection: 'myPostgresqlServer',

  attributes: {

  	username: {
  		type: 'string',
  	},

  }
};

