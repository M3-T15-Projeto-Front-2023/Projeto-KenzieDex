/* eslint-disable no-unsafe-optional-chaining */
import {useContext, useEffect, useState} from 'react'
import { ModalContainer, Modal, ModalClose, PokemonName, AddButton, PokemonType, ModalHeader, ModalMain, PokeTypes, PokemonModalImage } from "./style"
import { iInfos, PokemonContext } from "../../providers/PokemonContext"
import { api } from '../../services/api'

const PokeModal = () => { 
  const { setPokeModal, pokeModal, pokemonTeam, setPokemonTeam} = useContext(PokemonContext)
  const [pokemon, setPokemon] = useState<null | iInfos>(null)

  useEffect(() => {
    const loadSingleData = async () => {
      try {
        const response = await api.get(pokeModal!.url)
        setPokemon(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadSingleData()
  }, [])
  
  if (!pokemon){
    return <h1>loadindg..</h1>
  }

  return (
  <ModalContainer>

    <ModalClose onClick={() => setPokeModal(null)}>X</ModalClose>

   <Modal>
    <div >
     <ModalHeader >
      <PokeTypes>
        <PokemonName >{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</PokemonName>
      
        <PokemonType >{pokemon.types[0]!.type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1)}</PokemonType>
      </PokeTypes>
      
      <PokemonModalImage
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        alt={pokemon.name}
        />

        <AddButton onClick={() => {
          if (pokemonTeam.includes(pokemon)){
            console.log('Este pokemon já está na equipe')
          } else {
            pokemonTeam.push(pokemon)
            setPokemonTeam(pokemonTeam)
          }
        }}>Add to team</AddButton>
     </ModalHeader>

     <ModalMain>
        <h1>Pokedex Data</h1>
        
        <section>
          <span>Order:</span>
          <span>#{pokemon.order}</span>
        </section>
        
        <section>
          <span>Height:</span>
          <span>{Math.round(pokemon.height * 3.2808)}ft</span>
        </section>
        
        <section>
          <span>Weight:</span>
          <span>{pokemon.weight}kg</span>
        </section>

        <section>
          <span>Main ability:</span>
          <span>{pokemon.abilities[0]!.ability.name[0].toUpperCase() + pokemon.abilities[0]!.ability.name.slice(1)}</span>
        </section>
     </ModalMain>
    </div>
   </Modal>
  </ModalContainer>
)}

export default PokeModal