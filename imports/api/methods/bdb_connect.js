import {Log} from "/imports/api/collections/both/log.js";

BDBC.onTransaction(function(event, transaction) {
	Log.insert({ event: event, transaction: transaction });
});

Meteor.methods({
	"BDBConnect": function(options) {
      BDBC.connect(options, function(e, r) {
			if(e) {
              throw e;
            }
        });
    }
});
