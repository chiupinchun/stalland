export const getRandomFromRange = (min: number, max: number, isPasive = true) => {
  const direct = isPasive
    ? 1
    : Math.random() > 0.5 ? 1 : -1

  return (min + Math.random() * (max - min)) * direct
}