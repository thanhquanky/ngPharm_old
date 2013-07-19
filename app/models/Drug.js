var mongoose = require('mongoose');

module.exports = function (app) {
	var DrugSchema = new mongoose.Schema({
	    name: {type: String},                            //text of the todo
	    registrationNumber: {type: String},             //whether the todo is complete or not
	    manufacturer: {type: String}
	});
	return mongoose.model('Drug', DrugSchema);
};


