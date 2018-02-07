import {BDBCollection} from "meteor-bigchaindb-collection";

export const Data = new BDBCollection("data");

Data.userCanInsert = function(userId, doc) {
	return true;
};

Data.userCanUpdate = function(userId, doc) {
	return true;
};

Data.userCanRemove = function(userId, doc) {
	return true;
};

