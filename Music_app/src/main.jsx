import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Views/Home.jsx'
import LocalLibrary from './Views/LocalLibrary.jsx'
import SpotifyLibrary from './Views/SpotifyLibrary.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/local' element={<LocalLibrary />} />
      <Route path='/spotify' element={<SpotifyLibrary />} />
    </Routes>
  </BrowserRouter>,
)