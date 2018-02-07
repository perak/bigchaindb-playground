import {Data} from "/imports/api/collections/both/data.js";

Meteor.methods({
	"dataInsert": function(data) {
		if(!Data.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		let options = {
			publicKey: "HyBFv87h28JuVE1vT3f1EWBadnza7gg2pG298LWnhy2P",
			privateKey: "6KWcJUaf3mAd3yEoxyAfECxeCKYrL4ZEq2e7GDEW4kEQ"
		};

		return Data.insert(data, null, options);
	},

	"dataUpdate": function(id, data) {
		var doc = Data.findOne({ _id: id });
		if(!Data.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Data.update({ _id: id }, { $set: data });
	},

	"dataRemove": function(id) {
		var doc = Data.findOne({ _id: id });
		if(!Data.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Data.remove({ _id: id });
	}
});
