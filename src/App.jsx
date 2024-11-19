import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import Contribute from './components/Contribute/Contribute';
import Footer from './components/Footer/Footer';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <Search />
      <Contribute />
    </>
  );
}

export default App;
