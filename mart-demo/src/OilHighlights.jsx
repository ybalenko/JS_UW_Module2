import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import dict from './artitems.json';
import PropTypes from 'prop-types';
import { getRandomInt, RenderWatercolorHighlights, parseData } from './WatercolorHighlights';


export default function OilHighlights() {
    const [artItem, setArtItem] = useState(undefined);
    const [keyword, setKeyword] = useState(undefined);
    const [artistOrCulture, setArtistOrCulture] = useState(undefined);
    const [artTitle, setArtTitle] = useState(undefined);
    const navigate = useNavigate();


    let randomInt = getRandomInt(dict.words.length)
    let randomWord = dict.words[randomInt]

    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Oil|Paintings&q=${randomWord}`)
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
            navigate(`/oils/search/${paramString}`)
        }

    }

    return (
        <>
            <div>
                <h1>Oil inspirations from the MET collections</h1>
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

