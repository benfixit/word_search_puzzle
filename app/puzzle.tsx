//@ts-nocheck
import { useState } from 'react';
import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View, Text } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '@/constants/categories';
import { usePuzzle } from '@/store/PuzzleProvider';


export default function PuzzleScreen() {
    const { grid, words } = usePuzzle();
    const [pressedLetters, setPressedLetters] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const onLetterPress = (rowIndex, colIndex, letter) => {
        // Logic for handling letter selection will go here
        // console.log(`Pressed letter ${letter} at (${rowIndex}, ${colIndex})`);
        let newLetter = pressedLetters + letter;
        setPressedLetters(newLetter);

        if (words.includes(newLetter)) {
            setCorrectAnswers([...correctAnswers, newLetter]);
            setPressedLetters("");
        }
    };

    const renderCell = (letter, rowIndex, colIndex) => (
        <Pressable style={styles.pressable} key={`${rowIndex}-${colIndex}`} onPress={() => onLetterPress(rowIndex, colIndex, letter)}>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{letter}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{
                    marginBottom: 48
                }}>
                    <Text style={{ fontWeight: 900, fontSize: 48, color: "#8F4C99" }}>
                        Freedraw
                    </Text>
                    <Text style={{ fontSize: 20 }}>Break the drawing limits</Text>
                </View>
                <View style={{ backgroundColor: "#E2E5E6", borderWidth: 1, borderColor: "transparent", borderTopLeftRadius: 13, borderTopRightRadius: 12, }}>
                    <View style={{ padding: 12, backgroundColor: "#8F4C99", borderTopLeftRadius: 13, borderTopRightRadius: 12, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#ffffff" }}>Aa</Text>
                        <Text style={{ color: "#ffffff" }}>02:41</Text>
                        <Text style={{ color: "#ffffff" }}>06/16</Text>
                    </View>
                    <View style={styles.grid}>
                        {grid.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                            {row.map((letter, colIndex) => renderCell(letter, rowIndex, colIndex))}
                            </View>
                        ))}
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap", rowGap: 8, margin: 4 }}>
                        {words.map((word, index) => {
                            return (
                                <Text 
                                    key={index} 
                                    style={{ flexGrow: 1, flexBasis: "25%", textDecorationLine: correctAnswers.includes(word) ? "line-through" : "none" }}
                                >{word}</Text>
                            );
                        })}
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%", 
    backgroundColor: "#CCD2DC"
  },
  grid: {
    flexDirection: 'column',
    backgroundColor: "#ffffff", 
    marginTop: 4,
    marginHorizontal: 4,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    display: "flex",
  },
  pressable: {
    flex: 1
  },
  cell: {
    // width: 40, // Adjust size as needed
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    // flex: 1,
    padding: 8
  },
  cellText: {
    fontSize: 16,
    // color: "white"
  },
});
