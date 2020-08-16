import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AddressPopupScreen from "../components/addressPopupComponent.js";

const movieURL =
  "http://www.json-generator.com/api/json/get/cfyNaTyYya?indent=2";

const HomeScreen = ({ navigation }) => {
  let popupRef = React.createRef();

  const onshowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetch(movieURL)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, [])
  );

  const renderItem = (data) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", { name: data.item.name });
      }}
      style={styles.list}
    >
      <View
        style={{
          flex: 1,
          borderColor: "red",
          borderRadius: 9,
          width: 380,
          height: 80,
          justifyContent: "space-evenly",
          borderWidth: 1,
          alignItems: "flex-start",
          //marginStart: 2,
        }}
      >
        <Text style={{ marginStart: 10 }}>{data.item.name}</Text>
        <Text style={{ marginStart: 10 }}>{data.item.phone}</Text>
        <Text style={{ marginStart: 10 }}>{data.item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          borderRadius: 1,
          backgroundColor: "rgba(0,0,0,0)",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={onshowPopup} style={styles.location}>
            <Text>Location</Text>
          </TouchableOpacity>
          <TextInput
            style={{
              borderRadius: 12,
              margin: 15,
              backgroundColor: "#ffcccb",
              height: 50,
            }}
          >
            <Text>Search</Text>
          </TextInput>
          <FlatList
            style={{ marginTop: 5 }}
            data={data}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.guid.toString()}
          />
          <AddressPopupScreen
            title="Location Selector"
            ref={(target) => (popupRef = target)}
            onTouchOutside={onClosePopup}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-evenly",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
    marginTop: 1,
    marginBottom: 1,
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff",
  },
  location: {
    paddingVertical: 10,
    margin: 10,
    backgroundColor: "#fff",
  },
});
