import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';



export default function SearchForm({ medium }) {
    const [keyword, setKeyword] = useState(undefined);
    const [artistOrCulture, setArtistOrCulture] = useState(undefined);
    const [artTitle, setArtTitle] = useState(undefined);
    const navigate = useNavigate();


    const handleSubmit = () => {
        if (keyword || artTitle || artistOrCulture) {
            const params = {
                "keyword": keyword,
                "artistOrCulture": artistOrCulture,
                "artTitle": artTitle
            }
            const paramString = JSON.stringify(params)
            navigate(`/${medium}/search/${paramString}`)
        }
        if (keyword === undefined && artTitle === undefined && artistOrCulture === undefined) {
            alert('At least one parameter should be specified to search')
        }
    }

    return (
        <>
            <div>
                <h3>Search for more</h3>
                <form class="form-inline">
                    <div class="form-group">
                        <div class="col-md-6">
                            <p>
                                <input type="text" class="form-control" id="key-word" placeholder='Type a key word' value={keyword} onChange={e => setKeyword(e.target.value)} />
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <input type="text" id="art-title" class="form-control" placeholder='Type a title' value={artTitle} onChange={e => setArtTitle(e.target.value)} />
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <input type="text" id="artistOrCulture" class="form-control" placeholder='Type an artist or culture' value={artistOrCulture} onChange={e => setArtistOrCulture(e.target.value)} />
                            </p>
                        </div>
                        <button class="btn btn-primary" type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                    <span id='back-link'>
                        <Link to="/">Homepage</Link></span>
                </form>
            </div>
        </>
    );
};





