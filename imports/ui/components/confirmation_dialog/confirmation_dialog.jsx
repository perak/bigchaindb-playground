import ReactDOM from "react-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";

/*
	Function renders modal confirmation dialog. Dialog is inserted into DOM and removed on close.

	"options" object example:

		{
			message: "Are you sure you want to delete?",
			title: "Delete",
			onYes: function(id) {
				alert("yes: " + id);
			},
			onNo: function(id) {
				alert("no: " + id);
			},
			onCancel: function(id) {
				alert("cancel: " + id);
			},
			buttonYesTitle: "Yes",
			buttonNoTitle: "No",
			buttonCancelTitle: "Cancel",
			showCancelButton: true,
			payload: itemId
		}

	Properties:
		message: message shown in the box (no default)
		title: modal box title (no default)
		onYes: function to execute if user click "Yes" button (if not provided, box will simply close)
		onNo: function to execute if user click "No" button (if not provided, box will simply close)
		onCancel: function to execute if user click "Cancel" button (if not provided "onNo" handler will be called. If no handler provided box will simply close)
		buttonYesTitle: text to show on "Yes" button (default: "Yes")
		buttonNoTitle: text to show on "No" button (default: "No")
		buttonCancelTitle: text to show on "Cancel" button (default: "Cancel")
		showCancelButton: show cancel button? (default: false)
		payload: onYes, onNo and onCancel handler will be called with this argument. For example it can be _id of item to delete (or whatever)
*/

export const ConfirmationDialog = function(options = {}) {
	let wrapper = document.body.appendChild(document.createElement("div"));
	let props = options || {};
	props.wrapper = wrapper;
	let component = ReactDOM.render(React.createElement(ConfirmationBox, props), wrapper);
};

/*
	Confirmation box component implementation

	Usage:

		<ConfirmationBox
			message="Are you sure you want to delete this cool thing?"
			title="Delete something"
			onYes={this.onYesHandler}
			onNo={this.onNoHandler}
			onCancel={this.onCancelHandler}
			buttonYesTitle="Yes, of course!"
			buttonNoTitle="No, don't delete!"
			buttonCancelTitle="Cancel"
			showCancelButton=true
			payload={anything}
		/>

	Properties:
		message: message shown in the box (no default)
		title: modal box title (no default)
		onYes: function to execute if user click "Yes" button (if not provided, box will simply close)
		onNo: function to execute if user click "No" button (if not provided, box will simply close)
		onCancel: function to execute if user click "Cancel" button (if not provided "onNo" handler will be called. If no handler provided box will simply close)
		buttonYesTitle: text to show on "Yes" button (default: "Yes")
		buttonNoTitle: text to show on "No" button (default: "No")
		buttonCancelTitle: text to show on "Cancel" button (default: "Cancel")
		showCancelButton: show cancel button? (default: false)
		payload: onYes, onNo and onCancel handler will be called with this argument. For example it can be _id of item to delete (or whatever)
*/

export class ConfirmationBox extends Component {
	constructor () {
		super();
		this.state = {
		};

		this.onYes = this.onYes.bind(this);
		this.onNo = this.onNo.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	componentDidMount() {
		var self = this;
		$(".modal").modal();
		$(".modal").on("hidden.bs.modal", function (e) {
			self.props.wrapper.remove();
		});
	}

	onYes(e) {
		if(this.props.onYes) {
			this.props.onYes(this.props.payload);
		}
	}

	onNo(e) {
		if(this.props.onNo) {
			this.props.onNo(this.props.payload);
		}
	}

	onCancel(e) {
		if(this.props.onCancel) {
			this.props.onCancel(this.props.payload);
		} else {
			if(this.props.onNo) {
				this.props.onNo(this.props.payload);
			}
		}
	}

	render() {
		return (
			<div className="modal" tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">{this.props.title}</h4>
						</div>
						<div className="modal-body">
							<p>{this.props.message}</p>
						</div>
						<div className="modal-footer">
							{this.props.showCancelButton ? <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onCancel}>{this.props.buttonCancelTitle || "Cancel"}</button> : null}
							<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onNo}>{this.props.buttonNoTitle || "No"}</button>
							<button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.onYes}>{this.props.buttonYesTitle || "Yes"}</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
