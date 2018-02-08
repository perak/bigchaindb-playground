import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils.js";


export class Layout extends Component {
	constructor () {
		super();
	}

	componentDidMount() {
		$(document).on("click", function (e) {
			var clickover = $(e.target).closest(".dropdown-toggle").length;
			var opened = $(".navbar-collapse").hasClass("in");
			if (opened === true && !clickover) {
				$(".navbar-collapse").collapse("hide");
			}
		});

		$(document).on("keydown", function (e) {
			var opened = $(".navbar-collapse").hasClass("in");
			if (opened === true) {
				$(".navbar-collapse").collapse("hide");
			}
		});
	}

	render() {
		return (
	<FreeLayoutContainer content={this.props.content} />
);
	}
}

export const LayoutContainer = withTracker(function(props) {
	var data = {};

	return { data: data };
})(Layout);
export class FreeLayout extends Component {
	constructor () {
		super();
	}

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="layout-root">
		<div id="content" className="sticky-wrapper">
			<div id="navbar" className="navbar navbar-fixed-top navbar-default" role="navigation">
				<div className="navbar-container container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="sr-only">
								Toggle navigation
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
							<span className="icon-bar">
							</span>
						</button>
						<a className="navbar-brand" href="/">
							BDB Playground
						</a>
					</div>
					<div id="menu" className="collapse navbar-collapse">
						<FreeLayoutMenu data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			</div>
			<div className="navbar-spacer">
			</div>
			{this.props.content}
		</div>
		<div id="footer" className="sticky-footer">
			<div className="footer-container container">
				<p className="text-muted">
				</p>
			</div>
		</div>
	</div>
);
		}
	}
}

export const FreeLayoutContainer = withTracker(function(props) {
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

})(FreeLayout);
export class FreeLayoutMenu extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/
	}

	

	render() {
		return (
	<ul id="menu-items" className="nav navbar-nav">
		<li id="menu-item-simple" className={menuItemClass('home')}>
			<a href={pathFor('home', {})}>
				<span className="item-title">
					Home
				</span>
			</a>
		</li>
		<li id="menu-item-simple" className={menuItemClass('about')}>
			<a href={pathFor('about', {})}>
				<span className="item-title">
					About
				</span>
			</a>
		</li>
	</ul>
);
	}
}
