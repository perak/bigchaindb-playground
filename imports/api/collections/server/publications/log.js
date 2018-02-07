import {Meteor} from "meteor/meteor";
import {Log} from "/imports/api/collections/both/log.js";

Meteor.publish("log", function() {
	return Log.find({}, {sort:{createdAt:-1},limit:20});
});

