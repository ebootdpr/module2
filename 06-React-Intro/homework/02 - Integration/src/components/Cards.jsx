import Card from './Card';

export default function Cards(props) {
   //character es un array de objetos
   const { characters } = props;
   return (
      <div>
         {characters.map(obj => (
            <Card
               name={obj.name}
               species={obj.species}
               gender={obj.gender}
               image={obj.image}
               onClose={() => window.alert('Emulamos que se cierra la card')}
            />
         )
         )}
      </div>)
}
