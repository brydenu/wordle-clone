export default function ClickableKey({ char }) {
    return (
        <div
            className="clickable-key w-[43px] h-[58px] flex justify-center items-center text-white bg-gray-700 hover:cursor-pointer text-center text-xl rounded font-bold"
            data-char-key={char}
        >
            <p>{char}</p>
        </div>
    );
}
