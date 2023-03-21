
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function parseData(data, setArtItem) {
    //get random object ids 
    let setOfRandomNumbers = new Set();
    for (let i = 0; i < 16; i++) {
        let randomNumber = getRandomInt(data.total);
        setOfRandomNumbers.add(data.objectIDs[randomNumber]);
    }
    const arr = [...setOfRandomNumbers];
    setArtItem(arr);
}
