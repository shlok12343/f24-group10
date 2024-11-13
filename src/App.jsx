import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Explore from './components/Explore/Explore';
import Separator from './components/Separator/Separator';
import Carousel from './components/Carousel/Carousel';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <Search />
      <Separator />
      <Carousel />
    </>
  );
}

export default App;
