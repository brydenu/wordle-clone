"use client";

import { useEffect, useState } from "react";

export default function Tile({
    char = { letter: "", correctness: -1 },
    currentRow,
}) {
    const [classes, setClasses] = useState(
        "border-[#D3D6DA] border-2 bg-white/0 text-black"
    );
    // console.log("char", char);
    useEffect(() => {
        if (char.correctness === 2) {
            // console.log("correctness correct");
            setClasses("bg-[#6aaa64] text-white");
        } else if (char.correctness === 1) {
            console.log("correctness partial");

            setClasses("bg-[#c9b458]");
        } else if (char.correctness === 0) {
            // console.log("correctness incorrect");
            setClasses("bg-gray-700 text-white");
        } else if (char.correctness === -1 || !char.correctness) {
            if (char.letter) {
                setClasses("border-[#878a8c] border-2 bg-white/0 text-black");
            } else {
                setClasses("border-[#D3D6DA] border-2 bg-white/0 text-black");
            }
        }
    }, [char]);

    // useEffect(() => {
    //     console.log("char changed");
    // }, [char]);

    // useEffect(() => {
    //     console.log("currentRow changed");
    // }, [currentRow]);

    // console.log("char", char);

    return (
        <div
            className={`wordle-tile ${classes} w-[52px] h-[52px] min-w-max min-h-full flex justify-center align-middle items-center`}
        >
            <p className={`font-bold text-3xl text-center justify-center`}>
                {char.letter || ""}
            </p>
        </div>
    );
}
