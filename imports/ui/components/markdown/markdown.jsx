import React, { Component } from "react";
import marked from "marked";

export class Markdown extends Component {
	constructor () {
		super();
		this.rawMarkup = this.rawMarkup.bind(this);
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	rawMarkup() {
		var markdownText = "";
		markdownText += this.props.text ? this.props.text + "" : "";
		markdownText += this.props.children ? this.props.children + "" : "";
		var rawMarkup = marked(markdownText, { sanitize: !!this.props.sanitize });
		return { __html: rawMarkup };
	}

	render() {
		return (<div dangerouslySetInnerHTML={this.rawMarkup()} />);
	}
}
