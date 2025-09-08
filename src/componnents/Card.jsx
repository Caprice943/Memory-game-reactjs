import React from 'react';

const Card = ({card , handleChoice, flipped}) => {

    const choiceCards = () => {
        handleChoice(card)

    }

    return (
    <div className="card">
        <div className={flipped ? "flipped" : ""}>
        <img className="fruit"
            src={card.src} 
            alt="fruit" 
            
        />
        <img className="cover"
            src="/images/cover.jpg"
            onClick={choiceCards} 
            alt="cover"
        />


        </div>
    </div>

        
    );
};

export default Card;