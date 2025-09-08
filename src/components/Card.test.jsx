import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'

const makeCard = (over = {}) => ({ id: '1', src: '/images/apple.png', name: 'pomme', ...over })

test('appelle handleChoice au clic quand non flipped et non disabled', async () => {
  const onChoice = vi.fn()
  render(<Card card={makeCard()} flipped={false} disabled={false} handleChoice={onChoice} />)

  const user = userEvent.setup()
  const cover = screen.getByRole('button', { name: /dos de carte/i })
  await user.click(cover)

  expect(onChoice).toHaveBeenCalledTimes(1)
})

test("n'appelle pas handleChoice si la carte est déjà retournée (flipped)", async () => {
  const onChoice = vi.fn()
  render(<Card card={makeCard()} flipped={true} disabled={false} handleChoice={onChoice} />)

  const user = userEvent.setup()
  const cover = screen.getByAltText(/dos de carte/i) // tabIndex -1 → on passe par l'alt
  await user.click(cover)

  expect(onChoice).not.toHaveBeenCalled()
})

test("n'appelle pas handleChoice si disabled=true", async () => {
  const onChoice = vi.fn()
  render(<Card card={makeCard()} flipped={false} disabled={true} handleChoice={onChoice} />)

  const user = userEvent.setup()
  const cover = screen.getByAltText(/dos de carte/i)
  await user.click(cover)

  expect(onChoice).not.toHaveBeenCalled()
})

test('supporte clavier (Enter)', async () => {
  const onChoice = vi.fn()
  render(<Card card={makeCard()} flipped={false} disabled={false} handleChoice={onChoice} />)

  const user = userEvent.setup()
  const cover = screen.getByRole('button', { name: /dos de carte/i })
  cover.focus()
  await user.keyboard('{Enter}')

  expect(onChoice).toHaveBeenCalledTimes(1)
})
