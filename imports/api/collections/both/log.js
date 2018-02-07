import {Mongo} from "meteor/mongo";

export const Log = new Mongo.Collection("log");

Log.userCanInsert = function(userId, doc) {
	return true;
};

Log.userCanUpdate = function(userId, doc) {
	return true;
};

Log.userCanRemove = function(userId, doc) {
	return true;
};
