"use client";

import { useState, useEffect } from "react";
import Board from "@/components/Board";
import ClickableKeyboard from "@/components/ClickableKeyboard";
import chooseRandomWord from "@/utils/chooseRandomWord";
import verifyRealWord from "@/utils/verifyRealWord";
import words from "@/data/words.json";

export default function Home() {
    const [word, setWord] = useState([]);
    const [guessLimit, setGuessLimit] = useState(6);
    const [wordsList, setWordsList] = useState([]);
    const [wordLength, setWordLength] = useState(5);
    const [currentGuessNum, setCurrentGuessNum] = useState(1);
    const [currentChars, setCurrentChars] = useState([]);
    const [previousWords, setPreviousWords] = useState([]);
    const [previousChars, setPreviousChars] = useState([]);
    const [isRealWord, setIsRealWord] = useState(false);
    const [guessedChars, setGuessedChars] = useState({
        correct: [],
        partial: [],
        incorrect: [],
    });

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

    const addToPrevWords = (chars) => {
        const newWord = chars.map((c) => c.letter).join("");
        setPreviousWords((prev) => [...prev, newWord]);
    };

    const checkOkayChar = (char, referenceWord, idx) => {
        const charIndex = referenceWord.indexOf(char);
        if (charIndex !== -1) {
            referenceWord[charIndex] = "";
            return 1;
        }
        return 0;
    };

    const checkPerfectChar = (char, referenceWord, idx) => {
        if (referenceWord[idx] === char.letter) {
            referenceWord[idx] = "";
            return 2;
        }
        return null;
    };

    const checkUsedSameWord = (chars) => {
        const newWord = chars.join("");
        if (previousWords.includes(newWord)) {
            return true;
        }
        console.log("word not used");
        return false;
    };

    const addGuessedChars = (chars) => {
        const newGuessed = JSON.parse(JSON.stringify(guessedChars));
        for (let char of chars) {
            if (
                guessedChars.correct.includes(char.letter) ||
                guessedChars.partial.includes(char.letter) ||
                guessedChars.incorrect.includes(char.letter)
            ) {
                continue;
            }
            if (char.correctness === 2) {
                const newCorrect = [...newGuessed.correct, char.letter];
                newGuessed.correct = newCorrect;
            } else if (char.correctness === 1) {
                const newPartial = [...newGuessed.partial, char.letter];
                newGuessed.partial = newPartial;
            } else {
                const newIncorrect = [...newGuessed.incorrect, char.letter];
                newGuessed.incorrect = newIncorrect;
            }
        }
        setGuessedChars(newGuessed);
    };

    const checkRow = (attempt) => {
        const checkedChars = attempt.map((c) => c.letter);
        const referenceWord = [...word];
        const isSameWord = checkUsedSameWord(checkedChars);
        if (isSameWord) {
            return;
        }
        for (let i = 0; i < attempt.length; i++) {
            const isPerfect = checkPerfectChar(attempt[i], referenceWord, i);
            if (isPerfect === 2) {
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
        addGuessedChars(checkedChars);
        return checkedChars;
    };

    const updateChars = (typed) => {
        console.log("typed", typed);
        const typedChar = typed?.toUpperCase();
        if (
            ALPHABET.split("").includes(typedChar) &&
            currentChars.length < wordLength
        ) {
            const newChars = [
                ...currentChars,
                { letter: typedChar, correctness: null },
            ];
            console.log("newChars", newChars);
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
            setPreviousChars((prev) => [...prev, submittedChars]);
            addToPrevWords(submittedChars);
            return submittedChars;
        }
        return null;
    };

    console.log("word", word);
    // console.log("currentGuessNumber", currentGuessNum);
    // console.log("previouswords", previousWords);
    console.log("guessedChars", guessedChars);

    return (
        <main className="flex min-h-screen flex-col items-center pt-24">
            <h1 className="text-3xl text-black font-bold font-mono pb-5">
                Wordle
            </h1>

            <hr className="h-0.5 w-full pb-5" />

            <Board
                guessLimit={guessLimit}
                wordLength={wordLength}
                currentGuessNum={currentGuessNum}
                updateChars={updateChars}
                currentChars={currentChars}
                checkRow={checkRow}
                previousChars={previousChars}
            />
            <ClickableKeyboard
                updateChars={updateChars}
                guessedChars={guessedChars}
            />
        </main>
    );
}
