import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const deviceHeight = Dimensions.get("window").height;

class LocationPopupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={{ flex: 1, width: "100%" }} />;
    if (!onTouch) return View;
    return (
      <TouchableOpacity onPress={onTouch} style={{ flex: 1, width: "100%" }}>
        {view}
      </TouchableOpacity>
    );
  }

  renderTitle = () => {
    const { title } = this.props;
    return (
      <View>
        <Text
          styles={{
            color: "#111",
            fontSize: 20,
            fontWeight: "500",
            margin: 15,
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  render() {
    let { show } = this.state;
    const { onTouchOutside, title } = this.props;

    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
        >
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 18,
              maxHeight: deviceHeight * 0.5,
            }}
          >
            {this.renderTitle()}
          </View>
        </View>
      </Modal>
    );
  }
}

export default LocationPopupScreen;
