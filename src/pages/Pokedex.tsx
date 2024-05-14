import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Pokedex.css';
import PokemonList from '../components/PokedexContainer';

const Pokedex: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokedex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pokedex</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PokemonList />
      </IonContent>
    </IonPage>
  );
};

export default Pokedex;
