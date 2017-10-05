import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View, Image, Text, Alert, Modal, TouchableHighlight, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import strings from '../../localization';
import HeaderPoint from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';
import Redeem from '../Redeem';


class BoothList extends Component {
  state = {
    modalVisible: false
  }

  componentWillMount() {
    this.props.fetchBoothList();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { booth } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <HeaderPoint title={strings.booth.title} />
          <Button
            style={styles.btnBooth}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16 }}>{strings.booth.register}</Text>
          </Button>
          <View style={{ marginTop: 22 }}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => { this.setModalVisible(!this.state.modalVisible); }}
            >
              <ScrollView>
                <View style={{ marginTop: 22, marginLeft: 22, marginRight: 22, marginBottom: 22 }}>
                  <View>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>{strings.booth.howto}</Text>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <Text style={{ fontSize: 16 }}>
                        {strings.booth.info}{'\n'}{strings.booth.find}
                      </Text>
                      <View style={{ margin: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Fajar Adityo</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>081252700655</Text>
                      </View>
                      <Text style={{ fontSize: 16 }}>
                        {strings.booth.alreadyRegister}
                      </Text>
                    </View>
                    <View style={styles.redeem}>
                      <Redeem />
                    </View>
                    <Button
                      primary
                      style={styles.btnModal}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      <Text style={{ color: '#FFF' }}>{strings.global.back}</Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </View>
          <Content style={styles.content}>
            {booth.map(data => (
              <Card key={data.id} >
                <Body>
                  <View style={styles.profileSection}>
                    <Image
                      style={styles.profilePic}
                      resizeMode='stretch'
                      source={{ uri: data.logo_url }}
                    />
                  </View>
                </Body>
                <CardItem style={styles.itemNameSection}>
                  <Body>
                    <View style={styles.bodySection}>
                      <View style={styles.nameSection}>
                        <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
                        <Text numberOfLines={3} style={styles.summary} >
                          {data.summary}
                        </Text>
                      </View>
                    </View>
                  </Body>
                </CardItem>
                <CardItem footer style={styles.footerSection}>
                  <Button
                    bordered
                    style={styles.footerButton}
                    onPress={() => {
                      Actions.boothInfo({
                        summary: data.summary,
                        user: data.user,
                        booth_photo: data.logo_url,
                        booth_id: data.id
                      });
                    }}
                  >
                    <Text style={{ color: 'blue' }}>{strings.booth.more}</Text>
                  </Button>
                </CardItem>
              </Card>
            ))}
          </Content>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  booth: selectors.getListBooth()
});
export default connect(mapStateToProps, actions)(BoothList);
