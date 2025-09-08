import React, { memo, useCallback } from 'react'

const Card = ({ card, handleChoice, flipped, disabled = false }) => {
  const onChoose = useCallback(() => {
    if (!disabled && !flipped) handleChoice(card)
  }, [disabled, flipped, handleChoice, card])

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChoose()
      }
    },
    [onChoose]
  )

  const altFruit = card?.name ? `Carte ${card.name}` : 'Carte'

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        {/* Face visible */}
        <img
          className="fruit"
          src={card.src}
          alt={altFruit}
          loading="lazy"
          decoding="async"
          draggable={false}
          width={90}
          height={90}
        />
        {/* Dos de carte */}
        <img
          className="cover"
          src="/images/cover.jpg"
          alt="Dos de carte"
          onClick={onChoose}
          onKeyDown={onKeyDown}
          role="button"
          tabIndex={disabled || flipped ? -1 : 0}
          aria-pressed={flipped}
          aria-disabled={disabled || flipped}
          draggable={false}
          width={90}
          height={90}
        />
      </div>
    </div>
  )
}

export default memo(Card)
