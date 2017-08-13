import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Vibration,
  WebView
} from 'react-native';

import Camera from 'react-native-camera';

const inject_js = `
document.addEventListener("message", function(event) {
  var scope = angular.element(document.querySelector("body > main > div > div.ng-scope")).scope();
  scope.insideApp = true;
  scope.code = event.data;
  scope.$digest();
  scope.register();
}, false);

$( document ).ready(function() {
  try {
    var scope = angular.element(document.querySelector("body > main > div > div.ng-scope")).scope();
    scope.insideApp = true;
    scope.$digest();
  } catch(e) {}
});
`;

export default class attendance extends Component {
  constructor( props ) {
    super( props );
    this.wvsemcomp = null;
    this.camera = null;
    this.state = {
      count: 0,
      last_read_ts: 0,
      last_read_code: "",
    };

    this.onRead = e => {
      let now = new Date().getTime();
      let state = this.state;
      let diff_ts = now - state.last_read_ts;
      if (e.data !== state.last_read_code && diff_ts > 500 || diff_ts > 3000) {
        state.last_read_code = e.data;
        state.last_read_ts = now;
        this.wvsemcomp.postMessage(state.last_read_code);
        state.count += 1;
        Vibration.vibrate(70);
        this.setState(state);
      }
    }
  }
  render() {
    let count = this.state.count;
    return (
      <View style={styles.flex1}>
        <View style={[styles.center, styles.flex1]}>
          <Camera
            ref={ cam => this.camera = cam }
            style={[styles.flex1, styles.center, styles.stretch]}
            aspect={Camera.constants.Aspect.stretch}
            onBarCodeRead={this.onRead}
            barCodeTypes={['code39', 'code93', 'interleaved2of5']}
          >
            <Text style={[styles.flex1]}> </Text>
            <View style={[styles.row, styles.px1_5]}>
              <View style={[styles.flex1]}/>
              <View style={[styles.laser_bars, styles.flex10]}/>
              <View style={[styles.flex1]}/>
            </View>
            <Text style={[styles.flex1, styles.counter]}>{count}</Text>
          </Camera>
        </View>
        <View style={[styles.flex4]}>
          <WebView
            source={{uri: 'https://semcomp.icmc.usp.br/20/administracao/presenca/'}}
            ref={wvsemcomp => this.wvsemcomp = wvsemcomp}
            injectedJavaScript={inject_js}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex10: {
    flex: 10,
  },
  px1_5: {
    height: 6,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  counter: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 2},
    textShadowRadius: 7,
  },
  laser_bars: {
    borderTopColor: '#FF3333',
    borderBottomColor: '#FF3333',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    opacity: 0.5,
  }
});

AppRegistry.registerComponent('attendance', () => attendance);
