import ClickableKey from "./ClickableKey";

export default function KeyRow({ keys, handleClick }) {
    return (
        <div
            className="key-row w-full flex flex-row h-[58px] justify-center gap-1"
            onClick={handleClick}
        >
            {keys.map((char) => (
                <ClickableKey className="key" char={char} key={`key-${char}`} />
            ))}
        </div>
    );
}
