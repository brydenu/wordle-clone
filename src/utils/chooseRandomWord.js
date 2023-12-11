export default function chooseRandomWord(words) {
    const wordArrayLength = words.length;

    const randomIndex = Math.floor(Math.random() * wordArrayLength);

    return words[randomIndex];
}