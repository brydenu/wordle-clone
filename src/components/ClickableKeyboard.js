import KeyRow from "./KeyRow";

export default function ClickableKeyboard({ updateChars, guessedChars }) {
    const ROW_1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const ROW_2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const ROW_3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const handleClick = (event) => {
        const char = event.target.getAttribute("data-char-key");
        updateChars(char);
        console.log("char", char);
    };

    return (
        <div className="clickable-keyboard flex flex-col justify-center items-center w-full h-[198px] gap-2">
            <KeyRow
                keys={ROW_1}
                handleClick={handleClick}
                guessedChars={guessedChars}
            />
            <KeyRow
                keys={ROW_2}
                handleClick={handleClick}
                guessedChars={guessedChars}
            />
            <KeyRow
                keys={ROW_3}
                handleClick={handleClick}
                guessedChars={guessedChars}
                commands={true}
            />
        </div>
    );
}
