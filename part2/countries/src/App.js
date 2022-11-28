import {useState} from 'react'

import QueryResult from './components/QueryResult'

const App = ({countries}) => {
  const [query, setQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return;

    setSelectedCountries(
      countries.filter(country => country.name.common.toLowerCase().includes(normalizedQuery))
    );
  }

  const handleQueryChange = event => setQuery(event.target.value);

  return (<div>
    <form onSubmit={handleSubmit}>
      Find country: <input value={query} onChange={handleQueryChange}/>
    </form>

    <QueryResult selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}/>
  </div>);
}

export default App;