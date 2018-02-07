import moment from "moment";
import * as stringUtils from "/imports/modules/both/string_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as objectUtils from "/imports/modules/both/object_utils";

export const isValidEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(filter.test(value)) {
		return true;
	}
	return false;
};

export const isValidPassword = function(value, min_length) {
	if(!value || value === "" || value.length < min_length)
		return false;
	return true;
};

export const isValidIPv4 = function(value) {
	var filter = /^(\d{1,3}\.){3}(\d{1,3})$|^(0x[\da-fA-F]{2}\.){3}(0x[\da-fA-F]{2})$|^(0[0-3][0-7]{2}\.){3}(0[0-3][0-7]{2})|^0x[\da-fA-F]{8}$|^[0-4]\d{9}$|^0[0-3]\d{10}$/;
	if(filter.test(value)) {
		return true;
	}
	return false;
};

export const isValidIPv6 = function(value) {
	var filter = /^([\da-fA-F]{1,4}:){7}([\da-fA-F]{1,4})$/;
	if(filter.test(value)) {
		return true;
	}
	return false;
};

export const isValidIP = function(value) {
	if(isValidIPv4(value) || isValidIPv6(value)) {
		return true;
	}
	return false;
};

export const itemIsChecked = function(desiredValue, itemValue) {
	if(!desiredValue && !desiredValue == false && !itemValue && !itemValue == false) {
		return "";
	}

	if(Array.isArray(desiredValue))
		return desiredValue.indexOf(itemValue) >= 0 ? "checked" : "";

	return desiredValue == itemValue ? "checked" : "";
};

export const optionIsSelected = function(desiredValue, itemValue) {
	if(!desiredValue && !desiredValue == false && !itemValue && !itemValue == false) {
		return "";
	}

	if(Array.isArray(desiredValue))
		return desiredValue.indexOf(itemValue) >= 0 ? "selected" : "";

	return desiredValue == itemValue ? "selected" : "";
};


/*
	options object:
		{
			onSuccess: function(values) { ... },
			onError: function(message) { ... },
			onValidate: function(fieldName, fieldValue) { ...},
			fields: {
				fieldName: {
					type: "...",
					format: "...",
					min: "...",
					max: "...",
					required: true
				}
			} 
		}
*/

export const getFormData = function(formElement, options) {
	validateForm($(formElement), options ? options.onValidate : null, options ? options.onError : null, options ? options.onSuccess : null, options);
};

export const validateForm = function(formObject, validationCallback, errorCallback, submitCallback, options) {
	var values = {};
	var error = false;

	var fieldDefinitions = options ? options.fields || {} : {};

	formObject.find("input,select,textarea").each(function() {
		var skipValue = false;
		var inputObject = $(this);
		var formGroup = inputObject.closest(".form-group");
		var fieldName = inputObject.attr("name");
		var labelObject = formGroup.find("label[for='" + fieldName + "']");
		var errorLabel = formGroup.find("#error-text");
		var fieldValue = inputObject.val();

		var fieldDef = fieldDefinitions[fieldName] || {};

		var dataType = fieldDef.type || inputObject.attr("data-type") || "STRING";
		dataType = dataType.toUpperCase();

		var dataFormat = fieldDef.format || inputObject.attr("data-format") || "";
		var minValue = fieldDef.min || inputObject.attr("data-min") || "";
		var maxValue = fieldDef.max || inputObject.attr("data-max") || "";
		var isRequired = fieldDef.required || !!inputObject.attr("required");

		if(!fieldName) skipValue = true;

		if(inputObject.attr("type") == "checkbox") {
			// auto set data type for checkbox
			if(!dataType) {
				// single checkbox with that name means dataType="BOOL" else it is "ARRAY"
				if(formObject.find("input[name='" + fieldName + "']").length == 1) {
					dataType = "BOOL";
				}
				else {
					dataType = "ARRAY";
				}
			}

			if(dataType == "BOOL") fieldValue = inputObject.is(":checked");
			if(dataType == "ARRAY") fieldValue = inputObject.is(":checked") ? fieldValue : "";
		}

		// radio has value only if checked
		if(inputObject.attr("type") == "radio") {
			fieldValue = inputObject.is(":checked") ? fieldValue : "";
			if(dataType != "ARRAY" && !fieldValue) {
				skipValue = true;
			}
		}

		var labelText = inputObject.attr("placeholder") ? inputObject.attr("placeholder") : "";
		if(!labelText) {
			labelText = labelObject ? labelObject.text() : fieldName;
		}

		// hide error message from previous call
		formGroup.removeClass("has-error");
		if(errorLabel) {
			errorLabel.text("").removeClass("visible").addClass("hidden");
			errorLabel.closest(".field").removeClass("error");
		}

		function validationError(errorMessage) {
			formGroup.addClass("has-error");
			inputObject.focus();
			if(errorLabel) {
				errorLabel.text(errorMessage).removeClass("hidden").addClass("visible");
				errorLabel.closest(".field").addClass("error");
			}
			if(errorCallback)
				errorCallback(errorMessage);
			error = true;
		}

		if(!skipValue) {
			// Check required
			if(isRequired && !fieldValue) {
				validationError(labelText + " is required");
				return false;
			}

			// checkbox doesn't have required property, so I set parent container's data-required to true
			if(inputObject.attr("type") == "checkbox") {
				var checkboxContainer = inputObject.closest(".input-div");
				var req = isRequired || checkboxContainer.attr("data-required");
				if(req) {
					var atLeastOneChecked = false;
					checkboxContainer.find("input[type='checkbox']").each(function() {
						if($(this).is(":checked")) atLeastOneChecked = true;
					});
					if(!atLeastOneChecked) {
						validationError(labelText + " is required");
						return false;
					}
				}
			}

			// Convert to bool
			if(dataType == "BOOL") {
			    if(fieldValue == "true") {
			      fieldValue = true;
			    } else {
			      if(fieldValue == "false") {
			        fieldValue = false;
			      } else {
			        fieldValue = fieldValue ? true : false;
			      }
			    }
			}

			// Check Integer, also min and max value
			if(dataType == "INTEGER") {
				if(fieldValue == "") {
					fieldValue = null;
				} else {
					var intValue = parseInt(fieldValue);
					if(isNaN(intValue)) {
						validationError(labelText + ": Invalid value entered");
						return false;
					}

					if(minValue && !isNaN(parseInt(minValue)) && intValue < parseInt(minValue)) {
						if(maxValue && !isNaN(parseInt(maxValue)))
							validationError(labelText + " must be between " + minValue + " and " + maxValue);
						else
							validationError(labelText + " must be equal or greater than " + minValue);
						return false;
					}

					if(maxValue && !isNaN(parseInt(maxValue)) && intValue > parseInt(maxValue)) {
						if(minValue && !isNaN(parseInt(minValue)))
							validationError(labelText + " must be between " + minValue + " and " + maxValue);
						else
							validationError(labelText + " must be equal or less than " + maxValue);
						return false;
					}
					fieldValue = intValue;
				}
			}

			// Check Float, also Min and Max value
			if(dataType == "FLOAT")
			{
				if(fieldValue == "") {
					fieldValue = null;
				} else {
					var floatValue = parseFloat(fieldValue);
					if(isNaN(floatValue)) {
						validationError(labelText + ": Invalid value entered");
						return false;
					}

					if(minValue && !isNaN(parseFloat(minValue)) && floatValue < parseFloat(minValue)) {
						validationError(labelText + " must be equal or greater than " + minValue);
						return false;
					}

					if(maxValue && !isNaN(parseFloat(maxValue)) && floatValue > parseFloat(maxValue)) {
						validationError(labelText + " must be equal or less than " + maxValue);
						return false;
					}
					fieldValue = floatValue;
				}
			}

			// Check valid E-mail address
			if(dataType == "EMAIL") {
				if(fieldValue && !isValidEmail(fieldValue)) {
					validationError(labelText + ": please enter valid e-mail address");
					return false;
			    }
			}

			if(dataType == "IP") {
				if(fieldValue && !isValidIP(fieldValue)) {
					validationError(labelText + ": please enter valid IPv4 or IPv6 address");
					return false;
				}
			}
			if(dataType == "IPV4") {
				if(fieldValue && !isValidIPv4(fieldValue)) {
					validationError(labelText + ": please enter valid IPv4 address");
					return false;
				}
			}
			if(dataType == "IPV6") {
				if(fieldValue && !isValidIPv6(fieldValue)) {
					validationError(labelText + ": please enter valid IPv6 address");
					return false;
				}
			}

			if(dataType == "ARRAY") {
				if(!_.isArray(fieldValue)) {
					var newValue = values[fieldName] ? values[fieldName] : [];
					if(fieldValue) {
						newValue.push(fieldValue);
					}
					fieldValue = newValue;
				}
			}

			// TIME (user input "12:30 am" produces "1800" that is number of seconds from midnight)
			if(dataType == "TIME") {
				if(fieldValue == "") {
					fieldValue = null;
				}
				var seconds = dateUtils.timeToSeconds(fieldValue, dataFormat);
				if(isNaN(parseInt(seconds))) {
					validationError(labelText + ": Invalid value entered.");
					return false;
				}
				fieldValue = seconds;
			}

			if(dataType == "DATE") {
				if(fieldValue == "") {
					fieldValue = null;
				} else {
					var date = moment(fieldValue, dataFormat);
					if(!date.isValid()) {
						validationError(labelText + ": Invalid value entered." + (dataFormat ? " Date is expected in format \"" + dataFormat + "\"" : ""));
						return false;
					}
					fieldValue = date.toDate();
				}
			}

			if(dataType == "STRING") {
				if(_.isArray(fieldValue)) {
					fieldValue = fieldValue.toString();
				}
			}

			// Custom validation
			if(validationCallback) {
				var errorMessage = validationCallback(fieldName, fieldValue);
				if(errorMessage) {
					validationError(errorMessage);
					return false;
				}
			}

			values[fieldName] = fieldValue;
		}
	});

	if(error)
		return;

	values = objectUtils.deepen(values);

	if(submitCallback)
		submitCallback(values);
};
