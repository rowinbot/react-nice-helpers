import React from 'react'
import BottomTabBarButton from '../controls/Button/BottomTabBarButton'
import changesStatusBar from '../hocs/changesStatusBar'
import { getType } from './Types'

/**
 * Simple screen with no header.
 * > `react-navigation`
 * @param {object} screen component for route
 * @param {string} statusBarStyle style for native status bar (dark/light)
 * @returns {object} containing route definition
 */
export const stackScreen = (
  Screen,
  statusBarStyle,
  navigationOptions = {}
) => ({
  screen: statusBarStyle ? changesStatusBar(Screen, statusBarStyle) : Screen,
  navigationOptions: {
    header: null,
    gesturesEnabled: true,
    swipeEnabled: true,
    ...navigationOptions
  }
})

/**
 * Simple navigation stack with no header.
 * > `react-navigation`
 * @param {string} initialScreenName name for initial route
 * @returns {object} containing route definition
 */
export const stackNavigator = (initialScreenName, config = {}) => {
  let configObject = {}

  if (getType(config) === 'Object') {
    if (config.customTransitions)
      configObject.transitionConfig = () => ({
        transitionConfig: NavigationTransitionConfig.defaultTransition,
        screenInterpolator: NavigationStyleInterpolator.forHorizontal
      })
  }

  return {
    initialRouteName: initialScreenName,
    headerMode: 'none',
    ...configObject
  }
}

export const bottomTabScreen = (Screen, statusBarStyle) => {
  return ({ Icon, Text, Button, onPress }) => ({
    screen: statusBarStyle ? changesStatusBar(Screen, statusBarStyle) : Screen,
    navigationOptions: {
      tabBarIcon: ({ ...props }) => <Icon {...props} size={20} />,
      tabBarLabel: Text,
      tabBarButtonComponent: onPress
        ? ({ ...props }) => (
            <BottomTabBarButton {...props} onPressOverride={onPress} />
          )
        : Button || BottomTabBarButton
    }
  })
}

/**
 * Simple bottom tab navigation.
 * > `react-navigation`
 * @param {object} definition containing `initialScreenName`, `style`
 * @returns {object} containing route definition
 */
export const bottomTabNavigator = ({ initialScreenName }) => ({
  initialRouteName: initialScreenName,

  tabBarOptions: {
    showLabel: true,
    showIcon: true,

    style: {
      borderTopColor: 'rgb(220,220,220)',
      backgroundColor: '#FFF', // TabBar background,
      height: 50,
      paddingTop: 5,
      paddingBottom: 3
    }
  }
})

/**
 * Simple top tab navigation.
 * > `react-navigation`
 * @param {object} definition containing `initialScreenName`, `style`
 * @returns {object} containing route definition
 */
export const topTabNavigator = ({ initialScreenName }) => ({
  initialRouteName: initialScreenName,
  optimizationsEnabled: true,
  lazy: true,

  tabBarOptions: {
    showLabel: true,
    showIcon: false,
    style: {
      marginTop: -8,
      paddingRight: 12,
      paddingLeft: 12,
      backgroundColor: 'rgb(10,105,243)'
    },
    tabStyle: {
      paddingBottom: -11,
      flex: 1,
      opacity: 1
    },
    indicatorStyle: {
      height: 0
    }
  }
})
