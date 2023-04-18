import { Dispatch, SetStateAction } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useForm } from 'react-hook-form'
import { useTransaction } from '../../../hooks/useTransaction'
import * as S from '../../../styles/components/Dialog'
import { CreateIncomeTransaction } from '../../../types/TransactionTypes'
import { formatValue } from '../../../utils/FormatNumberValue'
import { IncomeTransaction } from '../../../types/TransactionTypes'
import { formatISO } from 'date-fns'

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed'
  setOpen: Dispatch<SetStateAction<boolean>>
  transaction?: IncomeTransaction
}

export const IncomeTransactionsForm = ({ type, setOpen, transaction }: TriggerProps) => {
  const { register, handleSubmit, reset } = useForm<CreateIncomeTransaction>()
  const { newTransaction, updateTransaction } = useTransaction()

  const handleCreateIncomeTransaction = async (data: CreateIncomeTransaction) => {
    const formattedDate = new Date(data.date)
    const formattedValue = formatValue(data.value.toString())

    if (!transaction) {
      newTransaction(type, {
        ...data,
        value: formattedValue,
        date: new Date(
          new Date(
            formattedDate.getFullYear(),
            formattedDate.getMonth(),
            formattedDate.getDate() + 1
          )
        ),
      })

      reset()
      setOpen(false)
      return
    }

    updateTransaction(transaction.id, type, {
      ...data,
      value: formattedValue,
      date: new Date(
        new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate() + 1)
      ),
    })

    reset()
    setOpen(false)
  }

  return (
    <S.Content>
      <S.Title>Novo Valor De Entrada</S.Title>
      <S.CloseButton asChild>
        <button aria-label="Close">X</button>
      </S.CloseButton>
      <form onSubmit={handleSubmit(handleCreateIncomeTransaction)}>
        {transaction ? (
          <>
            <S.InputGroup>
              <label htmlFor="date">Data:</label>
              <input
                defaultValue={formatISO(new Date(transaction!.date), { representation: 'date' })}
                {...register('date')}
                type="date"
                name="date"
                id="date"
                placeholder="Digite a data"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">Descrição:</label>
              <input
                defaultValue={transaction.description}
                {...register('description')}
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="origin">Origem:</label>
              <input
                defaultValue={transaction.origin}
                {...register('origin')}
                type="text"
                name="origin"
                id="origin"
                placeholder="Digite a procedência"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">Valor:</label>
              <CurrencyInput
                {...register('value')}
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                defaultValue={transaction.value}
                decimalsLimit={2}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="income" type="submit">
              Atualizar Entrada
            </S.TypeButton>
          </>
        ) : (
          <>
            <S.InputGroup>
              <label htmlFor="date">Data:</label>
              <input
                {...register('date')}
                type="date"
                name="date"
                id="date"
                placeholder="Digite a data"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">Descrição:</label>
              <input
                {...register('description')}
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="origin">Origem:</label>
              <input
                {...register('origin')}
                type="text"
                name="origin"
                id="origin"
                placeholder="Digite a procedência"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">Valor:</label>
              <CurrencyInput
                {...register('value')}
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                defaultValue={0}
                decimalsLimit={2}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="income" type="submit">
              Inserir Entrada
            </S.TypeButton>
          </>
        )}
      </form>
    </S.Content>
  )
}
