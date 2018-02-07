import "/imports/api/collections/both/log.js";
import "/imports/api/collections/both/data.js";

import "/imports/api/collections/server/bigchaindb_connection.js";

import "/imports/api/collections/server/rules/log.js";
import "/imports/api/collections/server/rules/data.js";

import "/imports/api/collections/server/publications/log.js";
import "/imports/api/collections/server/publications/data.js";

import "/imports/api/methods/log.js";
import "/imports/api/methods/data.js";
import "/imports/api/methods/bdb_connect.js";

import "/imports/api/server_routes/router.js";

Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	
});
