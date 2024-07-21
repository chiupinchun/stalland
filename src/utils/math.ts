export const getRandomFromRange = (min: number, max: number, isPasive = true) => {
  const direct = isPasive
    ? 1
    : Math.random() > 0.5 ? 1 : -1

  return (min + Math.random() * (max - min)) * direct
}

export const degToRadian = (deg: number) => deg / 180 * Math.PI
export const radianToDeg = (radian: number) => radian * 180 / Math.PI

export const getRotationByOffset = (deltaX: number, deltaZ: number) => {
  const prefix = deltaX >= 0 ? degToRadian(90) : degToRadian(270)
  return prefix - Math.atan(deltaZ / deltaX)
}