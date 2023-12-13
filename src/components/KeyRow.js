import BackspaceKey from "./BackspaceKey";
import EnterKey from "./EnterKey";
import ClickableKey from "./ClickableKey";

export default function KeyRow({ keys, handleClick, commands = false }) {
    return (
        <div
            className="key-row w-full flex flex-row h-[58px] justify-center gap-2"
            onClick={handleClick}
        >
            {!!commands && <EnterKey />}
            {keys.map((char) => (
                <ClickableKey className="key" char={char} key={`key-${char}`} />
            ))}
            {!!commands && <BackspaceKey />}
        </div>
    );
}
