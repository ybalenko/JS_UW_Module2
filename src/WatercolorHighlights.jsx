import React, { useState, useEffect } from 'react';
import dict from './artitems.json';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';



export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function parseData(data, setArtItem) {
    //get random object ids 
    let arrayOfRandomNumbers = [];
    for (let i = 0; i < 4; i++) {
        let randomNumber = getRandomInt(data.total);
        if (!arrayOfRandomNumbers.includes(randomNumber))
            arrayOfRandomNumbers.push(data.objectIDs[randomNumber]);
    }
    setArtItem(arrayOfRandomNumbers)
}

export default function WatercolorHighlights() {
    const [artItem, setArtItem] = useState(undefined);

    // get random word from json
    let randomInt = getRandomInt(dict.words.length)
    let randomWord = dict.words[randomInt]

    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Watercolors&q=${randomWord}`)
            .then(response => response.json())
            .then(
                (data) => { parseData(data, setArtItem) },
                (error) => { console.log(error) })
    }, [])



    return (
        <>
            <div>
                <h1>Watercolor inspirations from the MET collections</h1>
                <RenderWatercolorHighlights artProfile={artItem} />
                <SearchForm medium="watercolors" />
            </div>
        </>
    );
};



export function RenderWatercolorHighlights({ artProfile }) {
    const [artDetails, setArtDetails] = useState([]);

    useEffect(() => {
        if (artProfile !== undefined) {
            artProfile.map((artObjectId, idx) => {
                const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artObjectId}`
                console.log("art obj id", artObjectId)
                fetch(url)
                    .then(response => response.json())
                    .then(
                        (data) => {
                            let newArtDetail = {
                                'title': data.title,
                                'primaryImage': data.primaryImage,
                                'artistDisplayName': data.artistDisplayName,
                            };
                            setArtDetails(a => [...a, newArtDetail]);
                        },
                        (error) => { console.log(error) })
            });
        }
    }, [artProfile])

    return (
        <>
            <WatercolorHighlightDetails watercolorDetails={artDetails} />
        </>
    );
}

function WatercolorHighlightDetails({ watercolorDetails }) {
    const watercolor = watercolorDetails.map((artItem, id) => {
        return (
            <>
                <div className='pictures-container' key={id}>
                    <img className='art-image' src={artItem.primaryImage} alt={artItem.title} />
                    <span className='art-details' > Title: {artItem.title} </span>
                    <span className='art-details'> Artist: {artItem.artistDisplayName} </span>
                </div>

            </>
        );
    });

    return (
        <>
            <div className='art-container'> {watercolor}</div>
        </>
    );
};

RenderWatercolorHighlights.propTypes = {
    artProfile: PropTypes.array
};

WatercolorHighlightDetails.propTypes = {
    watercolorDetails: PropTypes.array
};

