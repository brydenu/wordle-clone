"use client";

import { useEffect, useState } from "react";
import Tile from "./Tile";
import verifyRealWord from "@/utils/verifyRealWord";

export default function TileRow({
    rowNum,
    wordLength,
    currentGuessNum,
    updateChars,
    currentChars,
    previousChars
}) {
    const [chars, setChars] = useState([]);
    const [submitted, setSubmitted] = useState([]);

    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (rowNum === currentGuessNum) {
                let typedChar = event.key;
                if (ALPHABET.includes(typedChar?.toUpperCase())) {
                    typedChar = typedChar?.toUpperCase();
                }
                const updated = updateChars(typedChar);
                if (updated) {
                    setSubmitted(updated);
                }
                if ([0, 1, 2].includes(updated[0].correctness)) {
                    setIsSubmitting(true);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    useEffect(() => {
        if (rowNum === currentGuessNum) {
            setChars(currentChars);
        }
    }, [currentChars]);

    useEffect(() => {
        setChars(submitted);
    }, [submitted]);

    useEffect(() => {
        if (rowNum !== currentGuessNum && previousChars.length) {
            console.log("previousChars", previousChars)
            setChars(previousChars[rowNum - 1])
        }
    }, [previousChars])

    // console.log("submitted", submitted);
    // console.log(`row ${rowNum} chars`, chars);
    // console.log(`row ${rowNum} submitted`, submitted);
    const tiles = Array.from({ length: wordLength }, (_, index) => (
        <Tile
            tileNum={index + 1}
            key={`tile-${rowNum}-${index + 1}`}
            char={chars[index] ? chars[index] : { letter: "", correctness: -1 }}
            currentRow={rowNum === currentGuessNum}
        />
    ));

    // console.log("chars", chars);
    // console.log("rowNum", rowNum);
    // console.log("currentGuess", currentGuessNum);

    return <div className={`wordle-row flex flex-row gap-[5px]`}>{tiles}</div>;
}
