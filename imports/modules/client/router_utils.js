import {FlowRouter} from 'meteor/kadira:flow-router';
import {routeGranted} from "/imports/ui/router/router.jsx";

export function pathFor(routeName, params, queryParams) {
	return FlowRouter.path(routeName, params, queryParams);
}

export function menuItemClass(routeName) {
	if(routeGranted && !routeGranted(routeName)) {
		return "hidden";
	}

	if(!FlowRouter.current() || !FlowRouter.current().route || !FlowRouter.getRouteName()) {
		return "";
	}

	if(!FlowRouter._routesMap[routeName]) {
		return "";
	}

	var currentPath = FlowRouter.current().route.path;
	var routePath = FlowRouter._routesMap[routeName].pathDef;
	var currentName = FlowRouter.getRouteName();

	if(routePath === "/") {
		return (currentPath == routePath || currentName.indexOf(routeName + ".") == 0) ? "active" : "";
	}

	return currentPath == routePath || (currentPath + "/").indexOf(routePath + "/") === 0 ? "active" : "";
}
