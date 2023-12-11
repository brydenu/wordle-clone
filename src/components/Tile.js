"use client";

import { useEffect } from "react";

export default function Tile({ char = { letter: "", correctness: -1 } }) {
    let classes = "border border-gray bg-white/0";
    useEffect(() => {
        if (typeof char === "object") {
            if (char.correctness === 2) {
                classes = "bg-green-700";
            } else if (char.correctness === 1) {
                classes = "bg-yellow-700";
            } else if (char.correctness === 0) {
                classes = "bg-gray-700";
            } else if (char.correctness === -1) {
                classes = "border border-gray bg-white/0";
            }
        } else {
            classes = "border border-gray bg-white/0";
        }
    }, [char]);

    // console.log("char", char);

    return (
        <div
            className={`wordle-tile ${classes} w-[48px] h-[48px] min-w-max min-h-full flex justify-center align-middle items-center`}
        >
            <p className="font-semibold text-3xl text-center justify-center text-white">
                {char.letter || ""}
            </p>
        </div>
    );
}
