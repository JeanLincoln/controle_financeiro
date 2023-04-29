import { differenceInMonths, isWithinInterval } from 'date-fns'
import { fetchOutcomeTransactions } from '../services/API'
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
            element.value += value.value / value.installment
          }
        })
        return acc
      }

      acc.push({ name: value.type, value: value.value / value.installment })

      return acc
    },
    []
  )
  return totalOutcomeTypesArray.sort((a, b) => a.value - b.value)
}

export const totalOutcomePerMonth = async () => {
  const data = await fetchOutcomeTransactions()
  const thisYear = new Date().getFullYear()

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const resultArray = [
    { name: 'Janeiro', total: 0 },
    { name: 'Fevereiro', total: 0 },
    { name: 'Março', total: 0 },
    { name: 'Abril', total: 0 },
    { name: 'Maio', total: 0 },
    { name: 'Junho', total: 0 },
    { name: 'Julho', total: 0 },
    { name: 'Agosto', total: 0 },
    { name: 'Setembro', total: 0 },
    { name: 'Outubro', total: 0 },
    { name: 'Novembro', total: 0 },
    { name: 'Dezembro', total: 0 },
  ]

  for (let i = 0; i <= monthNames.length; i++) {
    const filteredTransations = data.filter((transaction: OutcomeTransaction) => {
      const datesDifference = differenceInMonths(
        new Date(thisYear, i, new Date(transaction.date).getDate()),
        new Date(
          new Date(transaction.date).getFullYear(),
          new Date(transaction.date).getMonth(),
          new Date(transaction.date).getDate()
        )
      )

      const ocorringPurchase = datesDifference >= 0 && datesDifference <= transaction.installment
      const paidPurchase = datesDifference > transaction.installment - 1

      return ocorringPurchase && !paidPurchase
    })

    if (filteredTransations.length > 0) {
      const monthTotal = filteredTransations.reduce(
        (acc: number, transaction: OutcomeTransaction) => {
          acc += transaction.value / transaction.installment
          return acc
        },
        0
      )
      resultArray[i].total = monthTotal
    }
  }

  return resultArray
}

export const getColors = (outcomeValues: OutcomeTransaction[]) => {
  const colors = [] as string[]
  const totalOutcomeTypesArray = totalOutcomeTypes(outcomeValues)
  totalOutcomeTypesArray.forEach(() => {
    colors.push(`#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`)
  })
  return colors
}
