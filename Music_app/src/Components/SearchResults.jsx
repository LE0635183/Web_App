import React from 'react';

function SearchResults({ song, artist, album, duration, url, playSong, outUrl  }) {

    const seconds = Math.floor((duration / 1000) % 60)
    const minutes = Math.floor((duration / 1000) / 60)
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    const songDetails = { song, album, artist, url }
    
    return (
        <div className='row border rounded align-items-center text-muted p-1 my-2 mx-4 bg-light bg-gradient'>
            <div className='col-4 text-dark fw-bold'>{song}</div>
            <div className="col">
                <div>{artist}</div>
                <div>{album}</div>
            </div>
            <div className="col">{formattedTime}</div>
                {songDetails.url ? (
                    <div className="col btn btn-warning p-1 m-1" onClick={() => playSong(songDetails)}>Preview</div>
                ) : (
                    <div className="col btn btn-secondary p-1 m-1" disabled>No preview</div>
                )}
            <a className="col btn btn-success p-1 m-1" href={outUrl} target="_blank">Open on Spotify</a>
        </div>
    );
}

export default SearchResults
