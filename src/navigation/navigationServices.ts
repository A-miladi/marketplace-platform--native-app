//Navigation methods

//third parties
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
  DrawerActions,
} from '@react-navigation/native';
import {AllStackParamList} from './types';
//types

export const navigationRef = createNavigationContainerRef();

/**
 * Recursive function that delays the next call if the navigation is not yet mounted.
 */
const navigationMethod = (successCallback: () => unknown) => {
  if (navigationRef.isReady()) {
    return successCallback();
  }
  setTimeout(() => {
    navigationMethod(successCallback);
  }, 10);
};

/**
 * Navigate to a new route.
 */
export const navigate = <T extends keyof AllStackParamList>(
  name: T,
  params?: AllStackParamList[T],
) => {
  navigationMethod(() => {
    // @ts-ignore Suspended complexity warning typescript.
    navigationRef.navigate(name, params);
  });
};

/**
 * Navigate to previous screen and send back params
 */

export const navigateBack = <T extends keyof AllStackParamList>(
  name: T,
  params?: AllStackParamList[T],
) => {
  navigationMethod(() => {
    // @ts-ignore Suspended complexity warning typescript.
    navigationRef.navigate({
      name: name,
      params: params,
      merge: true,
    });
  });
};

/**
 * Navigate and reset root.
 */
export const resetRoot = (routeName: string, params?: object) => {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName, params}],
      }),
    );
  });
};

/**
 * Replace.
 */
export const replace = (routeName: string, params?: object) => {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(StackActions.replace(routeName, params));
  });
};

/**
 * Set params for the current route.
 */
export const setParams = (params: object, routeKey?: string) => {
  navigationMethod(() => {
    navigationRef.dispatch({
      ...CommonActions.setParams(params),
      source: routeKey,
    });
  });
};

/**
 * Check if it's possible to go back.
 */
export const canGoBack = () => {
  return navigationMethod(navigationRef.canGoBack);
};

/**
 * Go back to the previous route.
 */
export const goBack = () => {
  navigationMethod(navigationRef.goBack);
};

/**
 * Returns the navigation state for all navigators in the navigator tree.
 */
export const getRootState = () => {
  return navigationMethod(navigationRef.getRootState);
};

export const openSidebar = () => {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(DrawerActions.openDrawer());
  });
};

export const closeSidebar = () => {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(DrawerActions.closeDrawer());
  });
};
