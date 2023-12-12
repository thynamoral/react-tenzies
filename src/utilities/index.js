export const getRandomDie = () => {
  return {
    value: Math.floor(Math.random() * 6) + 1,
    isHeld: false
  }
}
