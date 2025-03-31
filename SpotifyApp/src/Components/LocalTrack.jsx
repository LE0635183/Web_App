import React from 'react'

function LocalTrack(props) {        
    const songSource = props.source;

    const songDetails = {
        name: props.name,
        artist: props.artist
    }
    
    return (
        <div className='container-fluid bg-light border-2 border border-info rounded p-3 mx-1 my-2'>
            <div className="row">
                <div className="col fw-bold">{props.name}</div>
                <div className="col">{props.artist}</div>
                <div className="col text-secondary">{props.duration}</div>
                <div className="col">
                    <button className='btn btn-info text-white' onClick={() => props.playSong(songSource, songDetails)}>Play ▶️</button>
                </div>
                <div className="col">Played {props.listens} times.</div>
            </div>
        </div>
    )
}

export default LocalTrack