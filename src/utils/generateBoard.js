import TileRow from "@/components/TileRow";

export default function generateBoard(wordLength, guessLimit) {
    const rows = Array.from({ length: guessLimit }, (_, index) => (
        <TileRow
            wordLength={wordLength}
            rowNum={index + 1}
            key={`row-${index}`}
        />
    ));

    return <>{rows}</>;
}
