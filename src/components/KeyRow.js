import BackspaceKey from "./BackspaceKey";
import EnterKey from "./EnterKey";
import ClickableKey from "./ClickableKey";

export default function KeyRow({
    keys,
    handleClick,
    commands = false,
    guessedChars,
}) {
    return (
        <div
            className="key-row w-full flex flex-row h-[58px] justify-center gap-2"
            onClick={handleClick}
        >
            {!!commands && <EnterKey />}
            {keys.map((char) => {
                let keyCorrectness = null;
                if (guessedChars.correct.includes(char)) {
                    keyCorrectness = "correct";
                } else if (guessedChars.partial.includes(char)) {
                    keyCorrectness = "partial";
                } else if (guessedChars.incorrect.includes(char)) {
                    keyCorrectness = "incorrect";
                }
                return (
                    <ClickableKey
                        className="key"
                        char={char}
                        key={`key-${char}`}
                        keyCorrectness={keyCorrectness}
                    />
                );
            })}
            {!!commands && <BackspaceKey />}
        </div>
    );
}
