import {useState, useEffect} from 'react';
import PokemonList from './PokemonList'
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  // Set up the initial state values.
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

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

  // Loading.
  if (loading) return "Loading..."

  return (
    <div className='app'>
      <h1>Pokemon</h1>
      <div className='pokemon'>
        <PokemonList pokemon={pokemon} />
      </div>
      <div className='pagination'>
        {nextPageUrl && <Pagination name='next' paginationLinks={paginationLinks} icon='fa-arrow-right' />}
        {prevPageUrl && <Pagination name='prev' paginationLinks={paginationLinks} icon='fa-arrow-left' />}
      </div>
    </div>
  );
}

export default App;
