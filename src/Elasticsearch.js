import React, { useState } from 'react';
import './Elasticsearch.css';

function ElasticsearchSearch() {
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://jojin77-dev-elasticsearch-7-1.delta.1276145f.lowtouch.cloud/hellonode/_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            match: {
              content: searchWord,
            },
          },
        }),
      });

      const data = await response.json();
      setSearchResults(data.hits.hits);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
      
      <ul className="search-results">
        {searchResults.map((result) => (
          <li key={result._id}>{result._source.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default ElasticsearchSearch;
