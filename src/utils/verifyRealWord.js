const URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export default async function verifyRealWord(word) {
    const res = await fetch(`${URL}/${word}`);
    const jsonified = await res.json();
    const isVerified = jsonified?.title ? false : true;
    return isVerified;
}
