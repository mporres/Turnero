import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TicketScreen from '../screens/ReceiveNotifications';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const HomeStack = createStackNavigator({
        Home: HomeScreen,
    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Inicio',
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = {
            Platform.OS === 'ios' ?
            `ios-home${focused ? '' : '-outline'}` : 'md-home'
        }
        />
    ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator({
        Links: LinksScreen,
    },
    config
);

LinksStack.navigationOptions = {
    tabBarLabel: 'Contacto',
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === 'ios' ? 'ios-link' : 'md-link' }
        />
    ),
};

LinksStack.path = '';

const TicketStack = createStackNavigator({
        Ticket: TicketScreen,
    },
    config
);

TicketStack.navigationOptions = {
    tabBarLabel: 'Tickets',
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === 'ios' ? 'ios-paper' : 'md-paper' }
        />
    ),
};

TicketStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    TicketStack,
});

tabNavigator.path = '';

export default tabNavigator;