"use client";

import { useState, useEffect } from "react";
import Board from "@/components/Board";
import ClickableKeyboard from "@/components/ClickableKeyboard";
import chooseRandomWord from "@/utils/chooseRandomWord";
import verifyRealWord from "@/utils/verifyRealWord";
import words from "@/data/words.json";

export default function Home() {
    const [word, setWord] = useState([]);
    const [guessLimit, setGuessLimit] = useState(2);
    const [wordsList, setWordsList] = useState([]);
    const [wordLength, setWordLength] = useState(5);
    const [currentGuessNum, setCurrentGuessNum] = useState(1);
    const [currentChars, setCurrentChars] = useState([]);
    const [previousChars, setPreviousChars] = useState([]);
    const [isRealWord, setIsRealWord] = useState(false);

    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        if (wordLength === 5) {
            setWordsList(words.five);
        } else if (wordLength === 6) {
            setWordsList(words.six);
        }
    }, [wordLength]);

    useEffect(() => {
        if (wordsList) {
            const randomWord = chooseRandomWord(wordsList);
            if (randomWord) {
                const wordArr = randomWord.split("");
                setWord(wordArr);
            }
        }
    }, [wordsList]);

    useEffect(() => {
        const checkWord = async () => {
            const charArr = [];
            currentChars.map((c) => {
                charArr.push(c.letter);
            });
            const joined = charArr.join("");
            const isReal = await verifyRealWord(joined);
            setIsRealWord(isReal);
        };
        checkWord();
    }, [currentChars]);

    const checkOkayChar = (char, referenceWord, idx) => {
        const charIndex = referenceWord.indexOf(char);
        if (charIndex !== -1) {
            referenceWord[charIndex] = "";
            return 1;
        }
        return 0;
    };

    const checkPerfectChar = (char, referenceWord, idx) => {
        if (referenceWord[idx] === char) {
            referenceWord[idx] = "";
            return 2;
        }
        return null;
    };

    const checkRow = (attempt) => {
        const checkedChars = attempt.map((c) => c.letter);
        const referenceWord = [...word];
        for (let i = 0; i < attempt.length; i++) {
            const isPerfect = checkPerfectChar(attempt[i], referenceWord, i);
            if (isPerfect) {
                checkedChars[i] = {
                    letter: attempt[i].letter,
                    correctness: isPerfect,
                };
            }
        }
        for (let i = 0; i < checkedChars.length; i++) {
            if (typeof checkedChars[i] !== "object") {
                const isOkay = checkOkayChar(checkedChars[i], referenceWord, i);
                checkedChars[i] = {
                    letter: attempt[i].letter,
                    correctness: isOkay,
                };
            }
        }
        setCurrentGuessNum((current) => current + 1);
        console.log("checkedchars", checkedChars)
        return checkedChars;
    };

    const updateChars = (typed) => {
        const typedChar = typed?.toUpperCase();
        console.log("typedChar", typedChar);
        if (
            ALPHABET.split("").includes(typedChar) &&
            currentChars.length < wordLength
        ) {
            const newChars = [
                ...currentChars,
                { letter: typedChar, correctness: null },
            ];
            setCurrentChars(newChars);
            return newChars;
        } else if (typedChar === "BACKSPACE" && currentChars.length > 0) {
            const newChars = [...currentChars];
            newChars.pop();
            setCurrentChars(newChars);
            return newChars;
        } else if (
            typedChar === "ENTER" &&
            currentChars.length === wordLength &&
            isRealWord
        ) {
            const submittedChars = checkRow(currentChars);
            console.log("submittedChars", submittedChars);
            setCurrentChars([]);
            setPreviousChars((prev) => ([...prev, submittedChars]));
            return submittedChars;
        }
        return null;
    };

    // console.log("word", word);
    // console.log("currentGuessNumber", currentGuessNum);

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            {/* <h1>Wordle</h1>
            <hr /> */}

            <Board
                guessLimit={guessLimit}
                wordLength={wordLength}
                currentGuessNum={currentGuessNum}
                updateChars={updateChars}
                currentChars={currentChars}
                checkRow={checkRow}
                previousChars={previousChars}
            />
            <ClickableKeyboard updateChars={updateChars} />
        </main>
    );
}
