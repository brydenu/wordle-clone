export default function ClickableKey({ char, keyCorrectness }) {
    let colorClasses = "text-black bg-[#D3D6DA]";
    console.log(`keyCorrectness for ${char}`, keyCorrectness);
    if (keyCorrectness === "correct") {
        colorClasses = "text-white bg-[#6aaa64]";
    } else if (keyCorrectness === "partial") {
        colorClasses = "text-white bg-[#c9b458]";
    } else if (keyCorrectness === "incorrect") {
        colorClasses = "text-white bg-[#787c7e]";
    }
    return (
        <div
            className={`${colorClasses} clickable-key w-[43px] h-[58px] flex justify-center items-center hover:cursor-pointer text-center text-xl rounded font-bold`}
            data-char-key={char}
        >
            <p data-char-key={char}>{char}</p>
        </div>
    );
}
