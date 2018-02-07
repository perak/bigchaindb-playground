import ReactDOM from "react-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";

/*
	ChoiceDialog(options);

	Function renders modal choice dialog. Dialog is inserted into DOM and removed on close.

	"options" object example:

		{
			title: "Fruits",
			message: "Choose your favorite fruit",
			items: [
				{ _id: "apple", title: "Apple" },
				{ _id: "orange", title: "Orange" },
				{ _id: "banana", title: "Banana" }
			],
			defaultValue: "orange",
			choiceType: "radio",

			onSubmit: function(itemId, payload) {
				alert("Submit: " + itemId);
			},
			onCancel: function(payload) {
				alert("cancel: " + payload);
			},
			buttonSubmitTitle: "OK",
			buttonCancelTitle: "Cancel",

			payload: "whatever"
		}

	Properties:
		title: modal box title (no default)
		message: message shown in the box (no default)
		items: list of choice items to show in the box
		defaultValue: _id of initially selected item
		choiceType: "select" or "radio". Default is "select"
		onSubmit: function to execute if user click "OK" button (if not provided, box will simply close)
		onCancel: function to execute if user click "Cancel" button (if not provided box will simply close)
		buttonSubmitTitle: text to show on "OK" button (default: "OK")
		buttonCancelTitle: text to show on "Cancel" button (default: "Cancel")
		payload: onSubmit and onCancel handler will be called with this argument. For example it can be some _id useful in your program (or whatever)
*/

export const ChoiceDialog = function(options = {}) {
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
		var val = null;
		if(this.props.choiceType === "radio") {
			val = $(".modal").find("[name='input-select']:checked").val();
		} else {
			val = $(".modal").find("[name='input-select']").val();
		}

		if(this.props.onSubmit) {
			this.props.onSubmit(val, this.props.payload);
		}
		$(".modal").modal("hide");
	}

	render() {
		var self = this;
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
									{this.props.choiceType === "radio" ? (
										this.props.items.map(function(item) {
											return (
												<div className="radio" key={item._id}>
													<label>
														<input type="radio" name="input-select" value={item._id} defaultChecked={item._id === self.props.defaultValue}/* ? "checked" : ""}*/ />
														{item.title}
													</label>
												</div>
											);
										})
									) : (
										<select name="input-select" className="form-control input-control" autoFocus="autofocus" defaultValue={self.props.defaultValue}>
											{this.props.items.map(function(item) {
												return (<option key={item._id} value={item._id}>{item.title}</option>);
											})}
										</select>
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
