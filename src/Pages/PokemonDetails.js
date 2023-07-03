import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = response.data;
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Abilities:</p>
      <ul>
        {pokemon.abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
