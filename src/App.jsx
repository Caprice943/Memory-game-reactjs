import { useEffect, useState} from 'react';
import Card from './componnents/Card';

const cartes =  [
  { src : "/images/banane.png"       ,matched:false    },
  { src : "/images/cerise.png"       ,matched:false    },
  { src : "/images/citron.png"       ,matched:false    },
  { src : '/images/apple.png'        ,matched:false    },
  { src : "/images/fraise.png"       ,matched:false    },
  { src : "/images/framboise.png"    ,matched:false    },
  { src : "/images/grenadine.png"    ,matched:false    },
  { src : "/images/lemon.png"        ,matched:false    },
  { src : "/images/mangue.png"       ,matched:false    },
  { src : "/images/mirabelle.png"    ,matched:false    },
  { src : "/images/orange.png"       ,matched:false    },
  { src : "/images/pasteque.png"     ,matched:false    },
  { src : "/images/peache.png"       ,matched:false    },
  { src : "/images/peche.png"        ,matched:false    },
  { src : "/images/poire.png"        ,matched:false    },
  { src : "/images/pomme.png"        ,matched:false    },
  { src : "/images/prune.png"        ,matched:false    },
  { src : "/images/raisin.png"       ,matched:false    }
  
]


function App() {
  
  const [cards, setCards] = useState([])
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)

  // function qui génère les cards à des positions aléatoires
  const mixCards = () => {
    const mixedCards = [...cartes, ...cartes]
      .sort(() => Math.random() - 0.5 )
      .map(card => ({ ...card, id: Math.random() }));
      
    setCards(mixedCards)
  }

  //j'affecte le chemin et l'id de ma card aux choix(les clicks) consécutifs
  const handleChoice = (card) => {
    
    if(firstChoice){
      setSecondChoice(card)
    } else {
      setFirstChoice(card)
    } 
    console.log(firstChoice);
  }

  //ici je compare les chemins des choix que j'ai fait pour déterminer si ce sont les mêmes cards
  useEffect ( () => {
    if (firstChoice && secondChoice ){

      if( firstChoice.src === secondChoice.src){
          setCards(previewCards => {
            return previewCards.map(card => {
              if(card.src === firstChoice.src){
                return {...card, matched:true}
              } else{
                return card
              }
            })
            
          })
          resetChoice()

      }

      else  {
        setTimeout(() => resetChoice(), 1000) 
      }
    } 
  }, [firstChoice, secondChoice])

  console.log(cards);

  //je remets les objets qui contiennent mes cards à zéro pour pouvoir continuer la comparaison
  const resetChoice = () => {
    setFirstChoice(null)
    setSecondChoice(null)
  }
  
 

  return (
    <div className="App">
            <h1> Memory Game 🧠 </h1>
            <button onClick={mixCards}> Start </button>

            <div className="card-grid">
              {
                cards.map(card => ( 
                  <Card 
                  key={card.id} 
                  card={card}
                  handleChoice={handleChoice}
                  flipped={ card === firstChoice || card === secondChoice || card.matched }
                  />
                ))

              }
            </div>

    </div>
  );
}

export default App;
