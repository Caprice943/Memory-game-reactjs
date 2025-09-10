import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { vi } from 'vitest'

function getCoverForFruit(fruitImg) {
  const wrapper = fruitImg.closest('.card')?.querySelector('div')
  return wrapper?.querySelector('.cover')
}

// mélange stable pour que le test soit déterministe (facultatif)
beforeEach(() => {
  vi.spyOn(Math, 'random').mockReturnValue(0.1)
})
afterEach(() => {
  vi.restoreAllMocks()
})

test('rend une grille et permet de faire un match', async () => {
  render(<App />)
  const user = userEvent.setup()

  // la grille apparaît (useEffect -> mixCards)
  const covers = await screen.findAllByAltText(/dos de carte/i) // attend l’apparition
  expect(covers.length).toBeGreaterThan(0)

  // trouve une paire
  const fruits = screen.getAllByAltText(/carte/i)
  const map = new Map()
  for (const img of fruits) {
    const alt = img.getAttribute('alt')
    if (!map.has(alt)) map.set(alt, [])
    map.get(alt).push(img)
  }
  const [, pairImgs] = Array.from(map.entries()).find(([, arr]) => arr.length >= 2)

  const cover1 = getCoverForFruit(pairImgs[0])
  const cover2 = getCoverForFruit(pairImgs[1])

  await user.click(cover1)
  await user.click(cover2)

  // attend le délai de 500ms (match) -> flipped persistant
  await waitFor(() => {
    const wrap1 = pairImgs[0].closest('.card')?.querySelector('div')
    const wrap2 = pairImgs[1].closest('.card')?.querySelector('div')
    expect(wrap1).toHaveClass('flipped')
    expect(wrap2).toHaveClass('flipped')
  }, { timeout: 1200 })

  expect(screen.getByText(/tours\s*:/i).textContent).toMatch(/\d+/)
}, 10000)

// test('une non-correspondance se retourne après délai', async () => {
//   render(<App />)
//   const user = userEvent.setup()

//   await screen.findAllByAltText(/dos de carte/i) // s’assure que la grille est là

//   const fruits = screen.getAllByAltText(/carte/i)
//   const first = fruits[0]
//   const second = fruits.find(img => img.getAttribute('alt') !== first.getAttribute('alt'))

//   const cover1 = getCoverForFruit(first)
//   const cover2 = getCoverForFruit(second)

//   await user.click(cover1)
//   await user.click(cover2)

//   // juste après les clics, elles sont toutes deux retournées
//   let wrap1 = first.closest('.card')?.querySelector('div')
//   let wrap2 = second.closest('.card')?.querySelector('div')
//   expect(wrap1).toHaveClass('flipped')
//   expect(wrap2).toHaveClass('flipped')

  
//   await waitFor(() => {
//     wrap1 = first.closest('.card')?.querySelector('div')
//     wrap2 = second.closest('.card')?.querySelector('div')
//     expect(wrap1).not.toHaveClass('flipped')
//     expect(wrap2).not.toHaveClass('flipped')
//   }, { timeout: 1500 })
// }, 10000)
