import { format, formatISO } from 'date-fns'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useForm } from 'react-hook-form'
import { useTransaction } from '../../../hooks/useTransaction'
import * as S from '../../../styles/components/Dialog'
import { CreateFixedValues } from '../../../types/TransactionTypes'
import { formatValue } from '../../../utils/FormatNumberValue'
import { FixedValues, IncomeTransaction, OutcomeTransaction } from '../../../types/TransactionTypes'

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed'
  setOpen: Dispatch<SetStateAction<boolean>>
  transaction?: FixedValues
}

export const FixedTransactionsForm = ({ type, setOpen, transaction }: TriggerProps) => {
  const { register, handleSubmit, reset } = useForm<CreateFixedValues>()
  const { newTransaction, updateTransaction } = useTransaction()

  const handleCreateFixedTransaction = async (data: CreateFixedValues) => {
    const formattedValue = formatValue(data.value.toString())

    if (!transaction) {
      newTransaction(type, {
        ...data,
        value: formattedValue,
        finalDate: data.finalDate ? data.finalDate : undefined,
      })

      reset()
      setOpen(false)
      return
    }

    updateTransaction(transaction.id, type, {
      ...data,
      value: formattedValue,
      finalDate: data.finalDate ? data.finalDate : undefined,
    })

    reset()
    setOpen(false)
  }

  return (
    <S.Content>
      <S.Title>Novo Valor Fixo</S.Title>
      <S.CloseButton asChild>
        <button aria-label="Close">X</button>
      </S.CloseButton>
      <form onSubmit={handleSubmit(handleCreateFixedTransaction)}>
        {transaction ? (
          <>
            {' '}
            <S.InputGroup>
              <span>Data de inicio:</span>
              <input
                {...register('initialDate')}
                defaultValue={formatISO(new Date(transaction!.initialDate), {
                  representation: 'date',
                })}
                required
                type="date"
                id="initialDate"
                placeholder="Digite a data de inicio"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Data de fim:</span>
              <input
                defaultValue={
                  transaction.finalDate &&
                  formatISO(new Date(transaction.finalDate), {
                    representation: 'date',
                  })
                }
                {...register('finalDate')}
                type="date"
                id="finalDate"
                placeholder="Digite a data final"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Descrição:</span>
              <input
                defaultValue={transaction.description}
                {...register('description')}
                required
                type="text"
                id="description"
                placeholder="Digite a descrição"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Tipo:</span>
              <select {...register('type')} id="type" required>
                <option value="">Entrada ou saída?</option>
                <option selected={transaction?.type === 'Entrada' ? true : false} value="Entrada">
                  Entrada
                </option>
                <option selected={transaction?.type === 'Saída' ? true : false} value="Saída">
                  Saída
                </option>
              </select>
            </S.InputGroup>
            <S.InputGroup>
              <span>Valor:</span>
              <CurrencyInput
                {...register('value')}
                required
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                defaultValue={transaction.value}
                decimalsLimit={2}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="fixed" type="submit">
              Inserir transação fixa
            </S.TypeButton>
          </>
        ) : (
          <>
            <S.InputGroup>
              <span>Data de inicio:</span>
              <input
                {...register('initialDate')}
                defaultValue={format(
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                  'yyyy-MM-dd'
                )}
                required
                type="date"
                id="initialDate"
                placeholder="Digite a data de inicio"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Data de fim:</span>
              <input
                {...register('finalDate')}
                type="date"
                id="finalDate"
                placeholder="Digite a data final"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Descrição:</span>
              <input
                {...register('description')}
                required
                type="text"
                id="description"
                placeholder="Digite a descrição"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Tipo:</span>
              <select {...register('type')} id="type" required>
                <option value="">Entrada ou saída?</option>
                <option value="Entrada">Entrada</option>
                <option value="Saída">Saída</option>
              </select>
            </S.InputGroup>
            <S.InputGroup>
              <span>Valor:</span>
              <CurrencyInput
                {...register('value')}
                required
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                defaultValue={0}
                decimalsLimit={2}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="fixed" type="submit">
              Inserir transação fixa
            </S.TypeButton>
          </>
        )}
      </form>
    </S.Content>
  )
}
