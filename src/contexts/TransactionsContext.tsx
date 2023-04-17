import { api } from '../../axios'
import { ReactNode, createContext, useState, useEffect } from 'react'
import { differenceInMonths, isSameMonth, isWithinInterval } from 'date-fns'
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation'

import {
  CreateFixedValues,
  CreateIncomeTransaction,
  CreateOutcomeTransaction,
  FixedValues,
  IncomeTransaction,
  OutcomeTransaction,
} from '../types/TransactionTypes'
import { FixedSorts, sortFinalDates, sortTypes } from '../utils/SortFixedValues'
import { toast } from 'react-toastify'

type TransactionContextType = {
  loading: Boolean
  incomeValues: IncomeTransaction[]
  outcomeValues: OutcomeTransaction[]
  fixedValues: FixedValues[]
  filterMonth: string
  setFilterMonth: (FilterMonth: string) => void
  fetchTransactions: () => void
  monthlyIncomeTotal: () => number
  monthlyOutcomeTotal: () => number
  fixedIncomeTotal: () => number
  fixedOutcomeTotal: () => number
  newTransaction: (
    type: string,
    data: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => Promise<void>
  deleteTransaction: (type: string, transactionId: string) => Promise<void>
  updateTransaction: (
    transactionToUpdateId: string,
    type: string,
    updateTransaction: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => Promise<void>
}

type CyclesContextProviderProps = {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsContextProvider({ children }: CyclesContextProviderProps) {
  const [loading, setLoading] = useState(false)
  const [incomeValues, setIncomeValues] = useState<IncomeTransaction[]>([])
  const [outcomeValues, setOutcomeValues] = useState<OutcomeTransaction[]>([])
  const [fixedValues, setFixedValues] = useState<FixedValues[]>([])
  const [filterMonth, setFilterMonth] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`
    }`
  )

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const incomeResponse = await api.get('incomeTransactions')
      const outcomeResponse = await api.get('outcomeTransactions')
      const fixedResponse = await api.get('fixedValues')

      const filteredDate = new Date(
        Number(filterMonth.split('-')[0]),
        Number(filterMonth.split('-')[1]) - 1
      )

      const filteredIncomeResponse = incomeResponse.data.filter((transaction: IncomeTransaction) =>
        isSameMonth(
          new Date(transaction.date),
          new Date(Number(filterMonth.split('-')[0]), Number(filterMonth.split('-')[1]) - 1)
        )
      )

      const filteredOutcomeResponse = outcomeResponse.data.filter(
        (transaction: OutcomeTransaction) => {
          const datesDifference = differenceInMonths(
            FilterMonthDate(filterMonth),
            TransactionDate(transaction.date)
          )

          const ocorringPurchase =
            datesDifference >= 0 && datesDifference <= transaction.installment
          const paidPurchase = datesDifference > transaction.installment - 1

          return ocorringPurchase && !paidPurchase
        }
      )

      const filteredFixedResponse = fixedResponse.data.filter((transaction: IncomeTransaction) => {
        const fixedInitialDate = new Date(transaction.initialDate)
        const fixedFinalDate = transaction.finalDate
          ? new Date(transaction.finalDate)
          : new Date(2999, 1, 1)

        return isWithinInterval(filteredDate, {
          start: new Date(fixedInitialDate),
          end: new Date(fixedFinalDate),
        })
      })

      FixedSorts(filteredFixedResponse)

      setIncomeValues(filteredIncomeResponse)
      setOutcomeValues(filteredOutcomeResponse)
      setFixedValues(filteredFixedResponse)
      setLoading(false)
    } catch ({ message, error }: any) {
      toast('Houve um erro ao carregar as transações:\n' + `${message}:${error}`, {
        className: 'error',
      })
    }
  }

  const newTransaction = async (
    type: string,
    data: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => {
    const incomeTransaction = type === 'income'
    const outcomeTransaction = type === 'outcome'
    const fixedTransaction = type === 'fixed'

    if (incomeTransaction) {
      try {
        const response = await api.post('incomeTransactions', data)
        setIncomeValues((state) => [response.data, ...state])
        toast('Transação de entrada inserida !', { className: 'success' })
        return
      } catch ({ message, error }: any) {
        toast('Houve um erro ao criar a transação de entrada:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
    }

    if (outcomeTransaction) {
      try {
        const response = await api.post('outcomeTransactions', data)
        setOutcomeValues((state) => [response.data, ...state])
        toast('Transação de saída inserida !', { className: 'success' })
        return
      } catch ({ message, error }: any) {
        toast('Houve um erro ao criar a transação de saída:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
    }

    if (fixedTransaction) {
      try {
        const response = await api.post('fixedValues', data)
        setFixedValues((state) => [response.data, ...state])
        toast('Transação fixa inserida !', { className: 'success' })
        return
      } catch ({ message, error }: any) {
        toast('Houve um erro ao criar a transação fixa:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
    }
  }

  const deleteTransaction = async (type: string, transactionId: string) => {
    const incomeTransaction = type === 'income'
    const outcomeTransaction = type === 'outcome'
    const fixedTransaction = type === 'fixed'

    if (incomeTransaction) {
      try {
        await api.delete(`incomeTransactions/${transactionId}`)
        const remainingTransactions = incomeValues.filter(
          (transaction) => transaction.id !== transactionId
        )
        setIncomeValues(remainingTransactions)
        toast('Transação de entrada excluída !', { className: 'success' })
      } catch ({ message, error }: any) {
        toast('Houve um erro ao deletar a transação de entrada:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
      return
    }
    if (outcomeTransaction) {
      try {
        await api.delete(`outcomeTransactions/${transactionId}`)
        const remainingTransactions = outcomeValues.filter(
          (transaction) => transaction.id !== transactionId
        )
        setOutcomeValues(remainingTransactions)
        toast('Transação de saída excluída !', { className: 'success' })
      } catch ({ message, error }: any) {
        toast('Houve um erro ao deletar a transação de saída:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
    }

    if (fixedTransaction) {
      try {
        await api.delete(`fixedValues/${transactionId}`)
        const remainingTransactions = fixedValues.filter(
          (transaction) => transaction.id !== transactionId
        )
        setFixedValues(remainingTransactions)
        toast('Transação fixa excluída !', { className: 'success' })
      } catch ({ message, error }: any) {
        toast('Houve um erro ao deletar a transação fixa:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
      return
    }
  }

  const updateTransaction = async (
    transactionToUpdateId: string,
    type: string,
    Transactionupdate: CreateIncomeTransaction | CreateOutcomeTransaction | CreateFixedValues
  ) => {
    const incomeTransaction = type === 'income'
    const outcomeTransaction = type === 'outcome'
    const fixedTransaction = type === 'fixed'

    if (incomeTransaction) {
      try {
        await api.put(`incomeTransactions/${transactionToUpdateId}`, Transactionupdate)
        fetchTransactions()
        toast('Transação de entrada atualizada !', { className: 'success' })
        return
      } catch ({ error, message }: any) {
        toast('Houve um erro ao atualizar a transação de entrada:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
    }
    if (outcomeTransaction) {
      try {
        await api.put(`outcomeTransactions/${transactionToUpdateId}`, Transactionupdate)
        fetchTransactions()
        toast('Transação de saída atualizada !', { className: 'success' })
        return
      } catch ({ error, message }: any) {
        toast('Houve um erro ao atualizar a transação de saída:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
    }

    if (fixedTransaction) {
      try {
        await api.put(`fixedValues/${transactionToUpdateId}`, Transactionupdate)
        fetchTransactions()
        toast('Transação fixa atualizada !', { className: 'success' })
        return
      } catch ({ error, message }: any) {
        toast('Houve um erro ao atualizar a transação fixa:\n' + `${message}:${error}`, {
          className: 'error',
        })
      }
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [filterMonth])

  const monthlyIncomeTotal = () => {
    const total = incomeValues.reduce((acc, income) => {
      acc = acc += income.value
      return acc
    }, 0)
    return total
  }

  const monthlyOutcomeTotal = () => {
    const total = outcomeValues.reduce((acc, income) => {
      acc = acc += income.installment > 1 ? income.value / income.installment : income.value
      return acc
    }, 0)
    return total
  }

  const fixedIncomeTotal = () => {
    const fixedIncomesTotal = fixedValues.reduce((acc, income) => {
      const fixedIncome = income.type === 'Entrada'
      const incomeInitialDate = new Date(income.initialDate)
      const incomeFinalDate = income.finalDate ? new Date(income.finalDate) : new Date(2999, 1, 1)
      const filteredDate = new Date(
        Number(filterMonth.split('-')[0]),
        Number(filterMonth.split('-')[1]) - 1
      )

      if (
        fixedIncome &&
        isWithinInterval(filteredDate, {
          start: incomeInitialDate,
          end: incomeFinalDate,
        })
      ) {
        acc = acc += income.value
      }
      return acc
    }, 0)

    return fixedIncomesTotal
  }

  const fixedOutcomeTotal = () => {
    const fixedOutcomesTotal = fixedValues.reduce((acc, income) => {
      const fixedOutcome = income.type === 'Saída'
      const outcomeInitialDate = new Date(income.initialDate)
      const outcomeFinalDate = income.finalDate ? new Date(income.finalDate) : new Date(2999, 1, 1)
      const filteredDate = new Date(
        Number(filterMonth.split('-')[0]),
        Number(filterMonth.split('-')[1]) - 1
      )
      if (
        fixedOutcome &&
        isWithinInterval(filteredDate, {
          start: outcomeInitialDate,
          end: outcomeFinalDate,
        })
      ) {
        acc = acc += income.value
      }

      return acc
    }, 0)
    return fixedOutcomesTotal
  }

  return (
    <TransactionsContext.Provider
      value={{
        loading,
        incomeValues,
        outcomeValues,
        fixedValues,
        filterMonth,
        setFilterMonth,
        fetchTransactions,
        monthlyIncomeTotal,
        monthlyOutcomeTotal,
        fixedIncomeTotal,
        fixedOutcomeTotal,
        newTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
