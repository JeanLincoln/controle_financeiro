import { CreateFixedValues } from '../types/TransactionTypes'

export const sortTypes = (a: CreateFixedValues, b: CreateFixedValues) => {
  const nameA = a.type.toUpperCase()
  const nameB = b.type.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
}

export const sortFinalDates = (a: CreateFixedValues, b: CreateFixedValues) => {
  if (!a.finalDate) {
    return 1
  }

  if (!b.finalDate) {
    return -1
  }

  return new Date(a.finalDate).getTime() - new Date(b.finalDate).getTime()
}

export const FixedSorts = (array: CreateFixedValues[]) => {
  array.sort(sortTypes)
  array.sort(sortFinalDates)
}
