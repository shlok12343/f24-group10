import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <Search />
    </>
  );
}

export default App;
