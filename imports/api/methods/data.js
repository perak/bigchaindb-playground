import {Data} from "/imports/api/collections/both/data.js";

Meteor.methods({
	"dataInsert": function(data) {
		if(!Data.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		var password = "";
		if(this.userId) {
			password = this.userId;
		} else {
			password = "meteor-kitchen";
		}

		var keypair = BDBC.keypairFromPassword(password);

		var options = {
			publicKey: keypair.publicKey,
			privateKey: keypair.privateKey
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
