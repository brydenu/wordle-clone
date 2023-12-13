export default function ClickableKey({ char }) {
    return (
        <div
            className="clickable-key w-[43px] h-[58px] flex justify-center items-center text-black bg-[#D3D6DA] hover:cursor-pointer text-center text-xl rounded font-bold"
            data-char-key={char}
        >
            <p data-char-key={char}>{char}</p>
        </div>
    );
}
