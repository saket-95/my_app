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
          console.log(json);
          setData(json);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, [])
  );

  const renderItem = (data) => (
    <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>{data.item.favoriteFruit}</Text>
    </TouchableOpacity>
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
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
          <FlatList
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
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
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
