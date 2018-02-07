import {BDBConnection} from "meteor-bigchaindb-collection";
import {Data} from "/imports/api/collections/both/data.js";

global.BDBC = new BDBConnection();

Meteor.startup(function() {
	
	if(Meteor.settings.bigchaindb) {
		BDBC.connect({
			url: Meteor.settings.bigchaindb.url,
			eventsUrl: Meteor.settings.bigchaindb.eventsUrl,
			namespace: Meteor.settings.bigchaindb.namespace,
			appId: Meteor.settings.bigchaindb.appId,
			appKey: Meteor.settings.bigchaindb.appKey
		});
	}

	BDBC.registerCollection(Data);
	
});
