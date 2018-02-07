import ReactDOM from "react-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";

/*
	InputDialog(options);

	Function renders modal confirmation dialog. Dialog is inserted into DOM and removed on close.

	"options" object example:

		{
			message: "Please enter your name",
			title: "Your name",
			onSubmit: function(text, id) {
				alert("Submit: " + text);
			},
			onCancel: function(id) {
				alert("cancel: " + id);
			},
			buttonSubmitTitle: "OK",
			buttonCancelTitle: "Cancel",
			multiline: true,
			text: "Just me",
			required: true,
			payload: itemId
		}

	Properties:
		message: message shown in the box (no default)
		title: modal box title (no default)
		onSubmit: function to execute if user click "OK" button (if not provided, box will simply close)
		onCancel: function to execute if user click "Cancel" button (if not provided box will simply close)
		buttonSubmitTitle: text to show on "OK" button (default: "OK")
		buttonCancelTitle: text to show on "Cancel" button (default: "Cancel")
		multiline: if set to true then multi-line textarea will be rendered, otherwise single-line input is shown (default: false)
		text: initial text to show in dialog 
		payload: onSubmit and onCancel handler will be called with this argument. For example it can be some _id useful in your program (or whatever)
*/

export const InputDialog = function(options = {}) {
	let wrapper = document.body.appendChild(document.createElement("div"));
	let props = options || {};
	props.wrapper = wrapper;
	let component = ReactDOM.render(React.createElement(InputBox, props), wrapper);
};

export class InputBox extends Component {
	constructor () {
		super();
		this.state = {
		};

		this.onClickSubmitButton = this.onClickSubmitButton.bind(this);
		this.onClickCloseButton = this.onClickCloseButton.bind(this);
		this.onClickCancelButton = this.onClickCancelButton.bind(this);
	}

	componentDidMount() {
		var self = this;
		$(".modal").modal();
		$(".modal").on("hidden.bs.modal", function (e) {
			self.props.wrapper.remove();
		});
	}

	componentWillUnmount() {

	}

	onClickCloseButton(e) {
		if(this.props.onCancel) {
			this.props.onCancel(this.props.payload);
		}
	}

	onClickCancelButton(e) {
		if(this.props.onCancel) {
			this.props.onCancel(this.props.payload);
		}
	}

	onClickSubmitButton(e) {
		var text = $(".modal").find(".input-control").val();
		if(this.props.onSubmit) {
			this.props.onSubmit(text, this.props.payload);
		}
		$(".modal").modal("hide");
	}

	render() {
		return (
			<div className="modal" tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close close-button" data-dismiss="modal" onClick={this.onClickCloseButton}>
								<span aria-hidden="true">
									&times;
								</span>
							</button>
							<h4 className="modal-title">
								{this.props.title}
							</h4>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label>
										{this.props.message}
									</label>
									{this.props.multiline ? (
										<textarea className="form-control input-control" rows="8" autoFocus="autofocus" defaultValue={this.props.text}></textarea>
									) : (
										<input type="text" name="input-box" defaultValue={this.props.text} className="form-control input-control" autoFocus="autofocus" />
									)}
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default cancel-button" data-dismiss="modal" onClick={this.onClickCancelButton}>
								{this.props.buttonCancelTitle}
							</button>
							<button type="button" className="btn btn-primary submit-button" onClick={this.onClickSubmitButton}>
								{this.props.buttonSubmitTitle}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
