import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Markdown} from "/imports/ui/components/markdown/markdown.jsx";


export class AboutPage extends Component {
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
					<h2 id="page_title" className="pull-left">
						About
					</h2>
				</div>
			</div>
			<Markdown text={"This application is automatically generated with https:\/\/www.meteorkitchen.com - source code generator for http:\/\/www.meteor.com without manual coding.\n\nWe are working hard to allow \"Meteor Kitchen\" to generate distributed applications. We are adding support for BigchainDB and Ethereum smart contracts. This app is first of the kind (built with latest, nightly build version of Meteor Kitchen which is not available to public yet).\n\nPlease register at http:\/\/www.meteorkitchen.com and stay tuned!\n\nCheers!\n"} sanitize={false} />
		</div>
	</div>
);
		}
	}
}

export const AboutPageContainer = withTracker(function(props) {
		var isReady = function() {
		

		var subs = [
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

			};
		

		
	}
	return { data: data };

})(AboutPage);
