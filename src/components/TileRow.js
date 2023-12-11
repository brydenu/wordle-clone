"use client";

import { useEffect, useState } from "react";
import Tile from "./Tile";
import verifyRealWord from "@/utils/verifyRealWord";

export default function TileRow({
    rowNum,
    wordLength,
    currentGuessNum,
    checkRow,
    updateChars,
    currentChars,
}) {
    const [chars, setChars] = useState([]);

    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (rowNum === currentGuessNum) {
                let typedChar = event.key;
                if (ALPHABET.includes(typedChar.toUpperCase())) {
                    typedChar = typedChar.toUpperCase();
                }
                const updated = updateChars(typedChar);
                console.log("updated", updated);
                if (updated) {
                    setChars(updated);
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

    const tiles = Array.from({ length: wordLength }, (_, index) => (
        <Tile
            tileNum={index + 1}
            key={`tile-${rowNum}-${index + 1}`}
            char={chars[index] ? chars[index] : { letter: "", correctness: -1 }}
        />
    ));

    // console.log("chars", chars);
    // console.log("rowNum", rowNum);
    // console.log("currentGuess", currentGuessNum);

    return <div className={`wordle-row flex flex-row gap-2`}>{tiles}</div>;
}
