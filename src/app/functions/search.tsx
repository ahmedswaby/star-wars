'use client';

import { useState } from 'react';
import { useSearchPeopleQuery } from '../services/starWarsApi';

export default function StarWarsSearch() {
  const [searchTerm, setSearchTerm] = useState('');

//   const { data, error, isLoading } = useSearchPeopleQuery(searchTerm, {
//     skip: searchTerm === '', // Skip query if searchTerm is empty
//   });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Search Star Wars Characters</h1>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ padding: '8px', marginBottom: '16px', width: '100%' }}
      />
    </div>
  );
}
