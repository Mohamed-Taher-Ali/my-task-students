import React from 'react';
import MainPage from './pages/MainPage';
import MyLayout from './components/MyLayout';
import './App.css';
import MyProvider from './store';


function App() {
  return (
    <MyProvider>
      <MyLayout>
        <MainPage />
      </MyLayout>
    </MyProvider>
  );
}

export default App;
