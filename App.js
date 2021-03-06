import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Check from "./components/Check";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNUmber) => {
    setUserNumber(selectedNUmber);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    content = <GameScreen userChoise={userNumber} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Gues a number" />
      {content}
      <Check />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
