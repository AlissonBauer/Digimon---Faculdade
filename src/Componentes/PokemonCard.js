import React from 'react';
import { Link } from 'react-router-dom';
import '../Componentes/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const { id, name, image } = pokemon;

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${id}`} className="pokemon-link">
        <img src={image} alt={name} className="pokemon-image" />
        <h3 className="pokemon-name">{name}</h3>
      </Link>
    </div>
  );
};

export default PokemonCard;