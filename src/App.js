import {useState, useEffect} from 'react';
import PokemonList from './components/PokemonList'
import axios from 'axios';
import Pagination from './components/Pagination';
import SearchBox from './components/SearchBox';
import RefreshButton from './components/RefreshButton';

function App() {
  // Set up the initial state values.
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=100');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Get the data from the api each time we change page.
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p))
    });
    return () => cancel()
  }, [currentPageUrl])

  // Update the current page when a button is clicked.
  function paginationLinks(direction) {
    if (direction === 'next') 
    {
      setCurrentPageUrl(nextPageUrl)
    } else {
      setCurrentPageUrl(prevPageUrl)
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function handleReset() {
    setSearch('')
  }

  const filteredPokemon = pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))

  // Loading.
  if (loading) return "Loading..."

  return (
    <div className='app'>
      <div className='search'>
        <h1>Pokemon</h1>
        <SearchBox handleSearch={handleSearch} value={search}/>
        <RefreshButton handleReset={handleReset} />
      </div>
      <div className='pokemon'>
        <PokemonList pokemon={search ? filteredPokemon : pokemon} />
      </div>
      <div className='pagination'>
        {nextPageUrl && <Pagination name='next' paginationLinks={paginationLinks} icon='fa-arrow-right' />}
        {prevPageUrl && <Pagination name='prev' paginationLinks={paginationLinks} icon='fa-arrow-left' />}
      </div>
    </div>
  );
}

export default App;
