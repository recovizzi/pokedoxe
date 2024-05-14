import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './PokedexContainer.css';

// Type for Pokémon data structure
interface Pokemon {
  pokedex_id: number;
  name: { fr: string; en: string; jp: string };
  sprites: { regular: string; shiny: string; gmax: { regular: string; shiny: string } };
  category: string;
  height: string;
  weight: string;
}

const fetchPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Pokemon[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemonList().then(setPokemons);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="pokedex-container">
        <div className="pokemon-list">
          <IonList>
            {pokemons.map(pokemon => (
              <IonItem key={pokemon.pokedex_id} onClick={() => setSelectedPokemon(pokemon)} className="pokemon-item">
                <IonLabel>
                  {pokemon.name.fr} (ID: #{pokemon.pokedex_id})
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </div>
        <div className="pokemon-details">
          {selectedPokemon && (
            <>
              <img src={selectedPokemon.sprites.regular} alt={selectedPokemon.name.fr} className="pokemon-image" />
              <h1>{selectedPokemon.name.fr}</h1>
              <p>{selectedPokemon.category}</p>
              <p>Taille: {selectedPokemon.height} | Poids: {selectedPokemon.weight}</p>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PokemonList;
