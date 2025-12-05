//@ts-nocheck
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import WordSearch from "@blex41/word-search";

import football from "./data/football.json";
import countries from "./data/countries.json";
import animals from "./data/animals.json"
import astronomy from "./data/astronomy.json";
import capitals from "./data/capitals.json";
import mammals from "./data/mammals.json";
import fishes from "./data/fishes.json";
import music from "./data/music.json";
import basketball from "./data/football.json";
import cars from "./data/cars.json";
import brands from "./data/cars.json";


const puzzles = {
    football, countries, animals, astronomy, capitals, mammals, fishes, music, basketball, cars, brands
};

const GRID_SIZE = 8;

// keep count of the formed words,
// if the count of the formed words === the number of words, game over
// start a timer
// store highscores
// get the path and the then the word.
// Build a map of the words. Form the word as the user presses, if in the map, success | Push the coords into an array

const PuzzleContext = createContext({});

const PuzzleProvider = ({ children }: { children: ReactNode }) => {
    let ws = new WordSearch();
    const [grid, setGrid] = useState([]);
    const [words, setWords] = useState([]);

    const [options, setOptions] = useState({});
    const params = useGlobalSearchParams();

    useEffect(() => {
        if (params.category) {
            // If an option is missing, it will be given a default value
            const wordList = puzzles[params.category].slice(0, 80);

            const options = {
                cols: 8,
                rows: 8,
                disabledDirections: ["N", "W", "NW", "SW"],
                dictionary: wordList.filter(word => word.length <= GRID_SIZE),
                maxWords: 20,
                backwardsProbability: 0.3,
                upperCase: true,
                diacritics: true
            };

            ws = new WordSearch(options);
            setGrid(ws.grid);
            setWords(ws.words.map(item => item.word.toUpperCase()));
        }
    }, [params.category])

    return (
        <PuzzleContext.Provider value={{ grid, words }}>
            {children}
        </PuzzleContext.Provider>
    );
}

export default PuzzleProvider;

export const usePuzzle = () => {
    return useContext(PuzzleContext);
}