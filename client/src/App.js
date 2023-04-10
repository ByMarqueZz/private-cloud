import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';

function App() {
    const [url, setUrl] = useState('http://localhost:3090');
      return (
        <>
          <BrowserRouter>
            <Routes>
                <Route path="/:path?" element={<Home url={url}/>} />
            </Routes>
          </BrowserRouter>
        </>
      );
}

export default App;
