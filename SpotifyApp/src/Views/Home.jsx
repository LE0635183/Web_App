import React from 'react'
import { useNavigate } from 'react-router-dom' // 1


function Home() {
const navigate = useNavigate() // 2

  return (
    <div className="container">
      <div className="container" style={{ paddingTop: '200px' }}>
        <img src="/assets/010-04.jpg" alt="" style={{height: '300px'}}/>
        <p>Featuring the best music that $0.00 could buy!</p>
        <h3>Choose the library you would like to access:</h3>
        <br />
        <div className="row">
          <div className="col">
            <a className="btn btn-primary mx-3" onClick={()=> navigate('/local')}>Local Library</a>
            <h6>Browse a curated selection</h6>
          </div>
          <div className="col">
            <a className="btn btn-success mx-3" onClick={()=> navigate('/spotify')}>Spotify Library</a>
            <h6>Search for songs using the Spotify API</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home