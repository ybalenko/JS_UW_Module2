import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RenderWatercolorHighlights, parseData } from './WatercolorHighlights';


export default function OilSearch() {
    let { params } = useParams();
    const paramObj = JSON.parse(params)
    const [artItem, setArtItem] = useState(undefined);

    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Oil|Paintings&q=${paramObj.keyword}&q=${paramObj.artistOrCulture}&q=${paramObj.artTitle}`)
            .then(response => response.json())
            .then(
                (data) => { parseData(data, setArtItem) },
                (error) => { console.log(error) })
    }, [])


    return (
        <>
            <div>
                <h1>Oil search results for {paramObj.keyword} {paramObj.artistOrCulture} {paramObj.artTitle}</h1>
                <RenderWatercolorHighlights artProfile={artItem} />
                <p id='back-link'>
                    <Link to="/">Homepage</Link></p>
                <p id='back-link'>
                    <Link to="/oils">Oil Highlights</Link></p>
            </div>
        </>
    )


}

