import React from 'react';
import './App.css';
import Main from './Components/Main';
import Header from './Components/Header';
import Search from './Components/Search';
import Single from './Components/Single';

function App() {
  return (
    <>
      <Header/>
      <Search/>
      <Single/>
      {/* <Main/> */}
    </>
  );
}

export default App;