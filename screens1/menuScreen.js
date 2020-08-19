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

const getURL = "http://www.json-generator.com/api/json/get/cjJsNeCcMO?indent=2";

const MenuScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetch(getURL)
        .then((response) => response.json())
        .then((json) => {
          //console.log(json);
          setData(json);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, [])
  );

  const renderItem = (data) => (
    <View
      style={{
        flex: 1,
        borderColor: "red",
        borderRadius: 10,
        width: 380,
        height: 40,
        justifyContent: "space-evenly",
        borderWidth: 1,
      }}
    >
      <TouchableOpacity style={styles.list}>
        <Text>{data.item.favoriteFruit}</Text>
      </TouchableOpacity>
    </View>
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          // backgroundColor: "rgba(0,0,0,0)",
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
          <TextInput
            style={{
              borderRadius: 12,
              margin: 15,
              backgroundColor: "#ffcccb",
              height: 50,
              marginTop: 20,
            }}
          >
            <Text>Search</Text>
          </TextInput>
          <FlatList
            style={{ marginTop: 0 }}
            data={data}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.guid.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    marginLeft: 3,
    backgroundColor: "white",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
    paddingVertical: 4,
    margin: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  location: {
    paddingVertical: 10,
    margin: 10,
    backgroundColor: "#fff",
  },
});
