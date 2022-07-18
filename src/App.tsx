import React, { Fragment } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101214",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
  },
});

export default function App() {
  return (
    <Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
      </View>
    </Fragment>
  );
}
