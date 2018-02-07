import {Log} from "/imports/api/collections/both/log.js";

Meteor.methods({
	"logInsert": function(data) {
		if(!Log.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Log.insert(data);
	},

	"logUpdate": function(id, data) {
		var doc = Log.findOne({ _id: id });
		if(!Log.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Log.update({ _id: id }, { $set: data });
	},

	"logRemove": function(id) {
		var doc = Log.findOne({ _id: id });
		if(!Log.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Log.remove({ _id: id });
	}
});
