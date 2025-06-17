/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
