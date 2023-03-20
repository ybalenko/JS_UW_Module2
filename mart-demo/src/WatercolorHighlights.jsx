import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import dict from './artitems.json';
import PropTypes from 'prop-types';



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
    const [keyword, setKeyword] = useState(undefined);
    const [artistOrCulture, setArtistOrCulture] = useState(undefined);
    const [artTitle, setArtTitle] = useState(undefined);
    const navigate = useNavigate();

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


    const handleSubmit = () => {
        if (keyword || artTitle || artistOrCulture) {
            const params = {
                "keyword": keyword,
                "artistOrCulture": artistOrCulture,
                "artTitle": artTitle
            }
            const paramString = JSON.stringify(params)
            navigate(`/watercolors/search/${paramString}`)
        }

    }

    return (
        <>
            <div>
                <h1>Watercolor inspirations from the MET collections</h1>
                <RenderWatercolorHighlights artProfile={artItem} />
                <p></p>
                <h3>Search for more</h3>
                <form>
                    <label for="key-word"></label>
                    <input type="text" id="key-word" placeholder='key-word' value={keyword} onChange={e => setKeyword(e.target.value)} />
                    <p></p>
                    <label for="art-title"></label>
                    <input type="text" id="art-title" placeholder='art-title' value={artTitle} onChange={e => setArtTitle(e.target.value)} />
                    <p></p>
                    <label for="artistOrCulture"></label>
                    <input type="text" id="artistOrCulture" placeholder='artistOrCulture' value={artistOrCulture} onChange={e => setArtistOrCulture(e.target.value)} />
                    <p></p>
                    <button className="search-button" type="button" onClick={handleSubmit}>Submit</button>
                    <p></p>
                </form>
                <span id='back-link'>
                    <Link to="/">Homepage</Link></span>
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

