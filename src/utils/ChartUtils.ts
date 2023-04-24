import { OutcomeTransaction } from '../types/TransactionTypes'

type totalOutcomeTypesArrayProps = {
  name: string
  value: number
}[]

export const totalOutcomeTypes = (outcomeValues: OutcomeTransaction[]) => {
  const totalOutcomeTypesArray = outcomeValues.reduce(
    (acc: totalOutcomeTypesArrayProps, value: OutcomeTransaction) => {
      const typeExists = acc.some((element, index) => element.name === value.type)

      if (typeExists) {
        acc.forEach((element) => {
          if (element.name === value.type) {
            element.value += value.value
          }
        })
        return acc
      }

      acc.push({ name: value.type, value: value.value })

      return acc
    },
    []
  )
  return totalOutcomeTypesArray
}

export const totalOutcomePerMonth = (outcomeValues: OutcomeTransaction[]) => {
  const totalOutcomeTypesArray = outcomeValues.reduce(
    (acc: totalOutcomeTypesArrayProps, value: OutcomeTransaction) => {
      const typeExists = acc.some((element, index) => element.name === value.type)

      if (typeExists) {
        acc.forEach((element) => {
          if (element.name === value.type) {
            element.value += value.value
          }
        })
        return acc
      }

      acc.push({ name: value.type, value: value.value })

      return acc
    },
    []
  )
  return totalOutcomeTypesArray
}

export const getColors = (outcomeValues: OutcomeTransaction[]) => {
  const colors = [] as string[]
  const totalOutcomeTypesArray = totalOutcomeTypes(outcomeValues)
  totalOutcomeTypesArray.forEach(() => {
    colors.push(`#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`)
  })
  return colors
}
