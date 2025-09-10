import Footer from './components/Footer.jsx'
import { useEffect, useState } from 'react'
import Card from './components/Card.jsx'


const baseDeck = [
  { src: '/images/banane.png', matched: false, name: 'banane' },
  { src: '/images/cerise.png', matched: false, name: 'cerise' },
  { src: '/images/apple.png', matched: false, name: 'pomme' },
  { src: '/images/fraise.png', matched: false, name: 'fraise' },
  { src: '/images/framboise.png', matched: false, name: 'framboise' },
  { src: '/images/grenadine.png', matched: false, name: 'grenadine' },
  { src: '/images/mangue.png', matched: false, name: 'mangue' },
  { src: '/images/mirabelle.png', matched: false, name: 'mirabelle' },
  { src: '/images/pasteque.png', matched: false, name: 'pastèque' },
  { src: '/images/poire.png', matched: false, name: 'poire' },
  { src: '/images/prune.png', matched: false, name: 'prune' },
  { src: '/images/raisin.png', matched: false, name: 'raisin' },
]

function App() {
  const [cards, setCards] = useState([])
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [turnLocked, setTurnLocked] = useState(false) 
  const [turns, setTurns] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  // Génère un id stable
  const makeId = () =>
    (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`)

  // Mélange et (re)lance une partie
  const mixCards = () => {
    const mixed = [...baseDeck, ...baseDeck]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: makeId(), matched: false }))

    setCards(mixed)
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(0)
    setTurnLocked(false)
    setGameWon(false)
  }

  // Lancement au premier rendu
  useEffect(() => {
    mixCards()
  }, [])

  // Gestion du choix utilisateur
  const handleChoice = (card) => {
    if (turnLocked) return
    if (!firstChoice) {
      setFirstChoice(card)
    } else if (card.id !== firstChoice.id) {
      setSecondChoice(card)
    }
  }

  // Comparaison dès qu’on a deux cartes
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setTurnLocked(true)
      const isMatch = firstChoice.src === secondChoice.src

      if (isMatch) {
        setCards(prev =>
          prev.map(c => (c.src === firstChoice.src ? { ...c, matched: true } : c))
        )
        setTimeout(() => {
          resetTurn()
        }, 500)
      } else {
        setTimeout(() => {
          resetTurn()
        }, 900)
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {    
      setGameWon(true)
      setTurnLocked(true)
    }
  }, [cards])

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(t => t + 1)
    setTurnLocked(false)
  }

  return (
    <div className="App">
      <h1>Memory Game 🧠</h1>

      <div className="controls">
        <button onClick={mixCards}>Recommencer</button>
        <span> Tours : {turns}</span>
        {turnLocked}
      </div>

      <div className="card-grid" aria-live='polite'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={turnLocked || card.matched}
          />
        ))}
      </div>

      <div className="game-status">
              {gameWon && (
        <div  role="dialog" aria-modal="true" aria-label="Partie terminée">
          <div className="modal">
            <h2>🎉 Bravo !</h2>
            <p>Tu as trouvé toutes les paires en <strong>{turns}</strong> tours.</p>

          </div>
        </div>
      )}
      </div>

      <Footer/>
    </div>
  )
}

export default App
