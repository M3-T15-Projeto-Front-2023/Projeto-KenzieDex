import { useContext, useEffect, useState } from 'react';
import { StyledTeamUl } from './style';
import { TeamCard } from './TeamCard';
import { apiFake } from '../../services/api';
import { iInfos, PokemonContext } from '../../providers/PokemonContext';


export const TeamList = () => {
  const token = localStorage.getItem('@token');

  const { pokemonTeam, setPokemonTeam } = useContext(PokemonContext);
  
  return (
    <StyledTeamUl>
      {pokemonTeam.length > 0 && pokemonTeam.map((teamPokemon) => (
        
        <TeamCard
          key={teamPokemon.pokemonTeam.id}
          name={teamPokemon.pokemonTeam.name}
          id={teamPokemon.pokemonTeam.id}
          url={teamPokemon.pokemonTeam.location_area_encounters}
          order={teamPokemon.pokemonTeam.order}
          height={teamPokemon.pokemonTeam.height}
          weight={teamPokemon.pokemonTeam.weight}
          abilities={teamPokemon.pokemonTeam.abilities}
          types={teamPokemon.pokemonTeam.types}
          pokemonId={teamPokemon.id}
        />
      ))}
    </StyledTeamUl>
  );
};
