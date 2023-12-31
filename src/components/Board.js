"use client";

import generateBoard from "@/utils/generateBoard";
import TileRow from "./TileRow";

export default function Board({
    guessLimit,
    wordLength,
    currentGuessNum,
    checkRow,
    updateChars,
    currentChars,
    previousChars
}) {
    // const board = generateBoard(wordLength, guessLimit);

    const rows = Array.from({ length: guessLimit }, (_, index) => (
        <TileRow
            currentGuessNum={currentGuessNum}
            wordLength={wordLength}
            rowNum={index + 1}
            checkRow={checkRow}
            key={`row-${index + 1}`}
            updateChars={updateChars}
            currentChars={currentChars}
            previousChars={previousChars}
        />
    ));
    return (
        <div
            id="wordle-board"
            className="flex flex-col items-center w-full gap-[5px] p-[10px]"
        >
            {rows}
        </div>
    );
}
