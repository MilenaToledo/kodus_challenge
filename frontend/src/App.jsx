import { useState } from 'react'
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResponseBox from './components/ResponseBox';
import axios from 'axios';
import './App.css';

const App = () => {
  const [response, setResponse] = useState('');

  const handleSearch = async (question) => {
    try {
      const res = await axios.post('http://localhost:3000/ask', { question });
      setResponse(res.data.answer);
    } catch (error) {
      if (error.response) {
        
        setResponse(`Error: ${error.response.data.error || 'Unknown error. Please try again.'}`);
      } else {
        
        setResponse('Error connecting to the server. Please try again.');
      }
    }
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ResponseBox response={response} />
    </div>
  );
};

export default App;
