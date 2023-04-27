import {
  CreateFixedValues,
  CreateIncomeTransaction,
  CreateOutcomeTransaction,
  FixedValues,
  IncomeTransaction,
  OutcomeTransaction,
} from '../types/TransactionTypes'
import { toast } from 'react-toastify'
import { api } from '../../axios'
import { Dispatch, SetStateAction } from 'react'

export const fetchIncomeTransactions = async () => {
  try {
    const incomeResponse = await api.get('incomeTransactions')
    return incomeResponse.data
  } catch ({ message, error }: any) {
    toast('Houve um erro ao carregar as transações de entrada:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const fetchOutcomeTransactions = async () => {
  try {
    const outcomeResponse = await api.get('outcomeTransactions')
    return outcomeResponse.data
  } catch ({ message, error }: any) {
    toast('Houve um erro ao carregar as transações de saida:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const fetchFixedTransactions = async () => {
  try {
    const fixedResponse = await api.get('fixedValues')
    return fixedResponse.data
  } catch ({ message, error }: any) {
    toast('Houve um erro ao carregar as transações fixas:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const createNewIncomeTransactions = async (data: CreateIncomeTransaction) => {
  try {
    const response = await api.post('incomeTransactions', data)
    toast('Transação de entrada inserida !', { className: 'success' })

    return response.data
  } catch ({ message, error }: any) {
    toast('Houve um erro ao criar a transação de entrada:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const createNewOutcomeTransactions = async (data: CreateOutcomeTransaction) => {
  try {
    const response = await api.post('outcomeTransactions', data)
    toast('Transação de saída inserida !', { className: 'success' })

    return response.data
  } catch ({ message, error }: any) {
    toast('Houve um erro ao criar a transação de saída:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const createNewFixedTransactions = async (data: CreateFixedValues) => {
  try {
    const response = await api.post('fixedValues', data)
    toast('Transação fixa inserida !', { className: 'success' })

    return response.data
  } catch ({ message, error }: any) {
    toast('Houve um erro ao criar a transação fixa:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const deleteIncomeTransactions = async (transactionId: string) => {
  try {
    await api.delete(`incomeTransactions/${transactionId}`)

    toast('Transação de entrada excluída !', { className: 'success' })
  } catch ({ message, error }: any) {
    toast('Houve um erro ao deletar a transação de entrada:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const deleteOutcomeTransactions = async (transactionId: string) => {
  try {
    await api.delete(`outcomeTransactions/${transactionId}`)

    toast('Transação de saída excluída !', { className: 'success' })
  } catch ({ message, error }: any) {
    toast('Houve um erro ao deletar a transação de saída:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const deleteFixedTransactions = async (transactionId: string) => {
  try {
    await api.delete(`fixedValues/${transactionId}`)

    toast('Transação fixa excluída !', { className: 'success' })
  } catch ({ message, error }: any) {
    toast('Houve um erro ao deletar a transação fixa:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const updateIncomeTransactions = async (
  transactionToUpdateId: string,
  Transactionupdate: CreateIncomeTransaction
) => {
  try {
    await api.put(`incomeTransactions/${transactionToUpdateId}`, Transactionupdate)

    toast('Transação de entrada atualizada !', { className: 'success' })
    return
  } catch ({ error, message }: any) {
    toast('Houve um erro ao atualizar a transação de entrada:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const updateOutcomeTransactions = async (
  transactionToUpdateId: string,
  Transactionupdate: CreateOutcomeTransaction
) => {
  try {
    await api.put(`outcomeTransactions/${transactionToUpdateId}`, Transactionupdate)
    toast('Transação de saída atualizada !', { className: 'success' })
    return
  } catch ({ error, message }: any) {
    toast('Houve um erro ao atualizar a transação de saída:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}

export const updateFixedTransactions = async (
  transactionToUpdateId: string,
  Transactionupdate: CreateFixedValues
) => {
  try {
    await api.put(`fixedValues/${transactionToUpdateId}`, Transactionupdate)
    toast('Transação fixa atualizada !', { className: 'success' })
    return
  } catch ({ error, message }: any) {
    toast('Houve um erro ao atualizar a transação fixa:\n' + `${message}:${error}`, {
      className: 'error',
    })
  }
}
