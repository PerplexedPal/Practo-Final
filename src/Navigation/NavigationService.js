import { NavigationActions, StackActions } from '@react-navigation/native';
import * as React from 'react';
let _navigator;

export const navigationRef = React.createRef();

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;
}

export function navigate(routeName) {
	console.log('the navigator handler', routeName);
	navigationRef.current?.navigate(routeName)
}

function goBack() {
	_navigator.dispatch(NavigationActions.back());
}

function resetNavigation(routeName = 'loginScreen') {
	const resetAction = StackActions.reset({
		index: 0,
		actions: [NavigationActions.navigate({ routeName })],
	});
	_navigator.dispatch(resetAction);
}

export default {
	setTopLevelNavigator,
	resetNavigation,
	goBack,
};