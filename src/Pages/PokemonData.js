import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonData.css';
import ReactPaginate from 'react-paginate';

const PokemonData = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 50;
  const pagesVisited = pageNumber * itemsPerPage;

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = response.data.results;
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar em ordem alfabética
        setPokemonList(sortedData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonList();
  }, []);

  const fetchPokemonDetails = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      const data = response.data;
      setSelectedPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePokemonClick = (pokemon) => {
    fetchPokemonDetails(pokemon);
  };

  const displayPokemons = pokemonList
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((pokemon) => (
      <div
        className={`pokemon-item ${selectedPokemon === pokemon ? 'active' : ''}`}
        key={pokemon.name}
        onClick={() => handlePokemonClick(pokemon)}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
          alt={pokemon.name}
        />
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <Link to={`/pokemon/${pokemon.name}`}>Ver detalhes</Link>
      </div>
    ));

  const pageCount = Math.ceil(pokemonList.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="pokemon-data-container">
      <div className="pagination-container">
        <ReactPaginate
          previousLinkClassName="previous"
          nextLinkClassName="next"
          disabledClassName="disabled"
          pageRangeDisplayed={2}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page"
          breakClassName="break"
          marginPagesDisplayed={1}
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={changePage}
          
        />
      </div>

      <div className="pokemon-list-container">{displayPokemons}</div>

      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>Abilities:</p>
          <ul>
            {selectedPokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonData;
