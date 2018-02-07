import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Log} from "/imports/api/collections/both/log.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";
import {Data} from "/imports/api/collections/both/data.js";


export class HomePage extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div>
		<div className="page-container container" id="content">
			<div className="row" id="title_row">
				<div className="col-md-12">
				</div>
			</div>
			<div id="home-page-connect-row" className="row">
				<div id="home-page-connect-row-left-col" className="col-md-6">
					<HomePageConnectRowLeftColForm data={this.props.data} routeParams={this.props.routeParams} />
				</div>
				<div id="home-page-connect-row-right-col" className="col-md-6">
					<HomePageConnectRowRightColForm data={this.props.data} routeParams={this.props.routeParams} />
				</div>
			</div>
			<div id="home-page-row" className="row">
				<div id="home-page-row-log-col" className="col-md-12">
					<HomePageRowLogColLog data={this.props.data} routeParams={this.props.routeParams} />
				</div>
			</div>
		</div>
	</div>
);
		}
	}
}

export const HomePageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("log")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	var data = { dataLoading: true };

	if(isReady()) {
		

		data = {

				log: Log.find({}, {sort:{createdAt:-1},limit:20}).fetch()
			};
		

		
	}
	return { data: data };

})(HomePage);
export class HomePageConnectRowLeftColForm extends Component {
	constructor () {
		super();

		this.state = {
			homePageConnectRowLeftColFormErrorMessage: "",
			homePageConnectRowLeftColFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
		$("input[type='file']").fileinput();
	}

	renderErrorMessage() {
		return(
	<div className="alert alert-warning">
		{this.state.homePageConnectRowLeftColFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.homePageConnectRowLeftColFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ homePageConnectRowLeftColFormInfoMessage: "" });
		this.setState({ homePageConnectRowLeftColFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var homePageConnectRowLeftColFormMode = "insert";
			if(!$("#home-page-connect-row-left-col-form").find("#form-cancel-button").length) {
				switch(homePageConnectRowLeftColFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ homePageConnectRowLeftColFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ homePageConnectRowLeftColFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var options = {};

options.url = values.api_url;
options.eventsUrl = values.events_url;
options.appId = values.app_id;
options.appKey = values.app_key;
options.namespace = values.namespace;

Meteor.call("BDBConnect", options, function(e, r) {
	if(e) {
      errorAction(e);
    }
});

			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	

	render() {
		return (
	<div id="home-page-connect-row-left-col-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.homePageConnectRowLeftColFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.homePageConnectRowLeftColFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-api_url">
				<label htmlFor="api_url">
					BigchainDB API URL
				</label>
				<div className="input-div">
					<input type="text" name="api_url" defaultValue="https://test.bigchaindb.com/api/v1/" className="form-control " autoFocus="autoFocus" required="required" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-events_url">
				<label htmlFor="events_url">
					BDB event stream URL
				</label>
				<div className="input-div">
					<input type="text" name="events_url" defaultValue="wss://test.bigchaindb.com:443/api/v1/streams/valid_transactions" className="form-control " data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-app_id">
				<label htmlFor="app_id">
					App ID
				</label>
				<div className="input-div">
					<input type="text" name="app_id" defaultValue="" className="form-control " data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-app_key">
				<label htmlFor="app_key">
					App Key
				</label>
				<div className="input-div">
					<input type="text" name="app_key" defaultValue="" className="form-control " data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-namespace">
				<label htmlFor="namespace">
					Namespace
				</label>
				<div className="input-div">
					<input type="text" name="namespace" defaultValue="" className="form-control " data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div btn-toolbar">
					<button id="form-submit-button" className="btn btn-success" type="submit">
						Connect
					</button>
				</div>
			</div>
		</form>
	</div>
);
	}
}
export class HomePageConnectRowRightColForm extends Component {
	constructor () {
		super();

		this.state = {
			homePageConnectRowRightColFormErrorMessage: "",
			homePageConnectRowRightColFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
		$("input[type='file']").fileinput();
	}

	renderErrorMessage() {
		return(
	<div className="alert alert-warning">
		{this.state.homePageConnectRowRightColFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.homePageConnectRowRightColFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ homePageConnectRowRightColFormInfoMessage: "" });
		this.setState({ homePageConnectRowRightColFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var homePageConnectRowRightColFormMode = "insert";
			if(!$("#home-page-connect-row-right-col-form").find("#form-cancel-button").length) {
				switch(homePageConnectRowRightColFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ homePageConnectRowRightColFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ homePageConnectRowRightColFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				var data = {};
try {
  data = JSON.parse(values.data);
} catch(e) {
  errorAction(e);
  return;
}

Meteor.call("dataInsert", data, function(e, r) {
	if(e) {
      errorAction(e);
    }
});

			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	

	render() {
		return (
	<div id="home-page-connect-row-right-col-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.homePageConnectRowRightColFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.homePageConnectRowRightColFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-data">
				<label htmlFor="data">
					Transaction data (json)
				</label>
				<div className="input-div">
					<textarea className="form-control " name="data" defaultValue="" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div btn-toolbar">
					<button id="form-submit-button" className="btn btn-success" type="submit">
						Create transaction
					</button>
				</div>
			</div>
		</form>
	</div>
);
	}
}
export class HomePageRowLogColLog extends Component {

	constructor() {
		super();
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	render() {
		return (
	<div className="log">
		<h2>
		</h2>
		<label>
			Event stream
		</label>
		{
                  this.props.data.log.map(function(entry) {
                      var obj = {};
                      obj.event = entry.event;
                      obj.transaction = entry.transaction;
                      return (
		<div key={entry._id}>
			<label>
				{entry.createdAt + ""}
			</label>
			<pre>
				<code>

                        
                        { JSON.stringify(obj, null, "\t") + "\n\n" }
            
				</code>
			</pre>
		</div>
		)
                  })
              }
	</div>
);
	}
}
