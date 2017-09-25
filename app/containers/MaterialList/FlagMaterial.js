import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default class FlagMaterial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={this.props.onPress}
        >
          { this.props.isUsed === 0 ?
            <Text style={{ color: '#000', borderWidth: 1, borderColor: '#000', padding: 8, borderRadius: 10 }}>Set</Text> :
            <Text style={{ color: '#4CAF50', borderWidth: 1, borderColor: '#4CAF50', padding: 8, borderRadius: 10 }}>Used</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}
