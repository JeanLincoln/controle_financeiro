import * as S from '../../../styles/components/Dialog'
import * as Z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useForm } from 'react-hook-form'
import { useTransaction } from '../../../hooks/useTransaction'
import { CreateIncomeTransaction } from '../../../types/TransactionTypes'
import { formatValue } from '../../../utils/FormatNumberValue'
import { IncomeTransaction } from '../../../types/TransactionTypes'
import { formatISO } from 'date-fns'

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed'
  setOpen: Dispatch<SetStateAction<boolean>>
  transaction?: IncomeTransaction
}

const newIncomeFormValidationSchema = Z.object({
  date: Z.string().min(10, { message: 'Informe a data da transação' }),
  description: Z.string().min(1, { message: 'Informe a descrição' }),
  origin: Z.coerce.string().min(1, { message: 'Informe a procedência' }),
  value: Z.string().min(1, { message: 'Informe o valor' }),
})

export const IncomeTransactionsForm = ({ type, setOpen, transaction }: TriggerProps) => {
  const { newTransaction, updateTransaction } = useTransaction()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIncomeTransaction>({
    resolver: zodResolver(newIncomeFormValidationSchema),
  })

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
              <label htmlFor="date">
                Data:{errors.date && <S.ErrorMessage>{errors.date.message}</S.ErrorMessage>}
              </label>
              <input
                defaultValue={formatISO(new Date(transaction!.date), { representation: 'date' })}
                {...register('date')}
                type="date"
                name="date"
                id="date"
                placeholder="Digite a data"
                style={{ border: errors.date ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">
                Descrição:
                {errors.description && (
                  <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
                )}
              </label>
              <input
                defaultValue={transaction.description}
                {...register('description')}
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
                style={{ border: errors.description ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="origin">
                Origem:{errors.origin && <S.ErrorMessage>{errors.origin.message}</S.ErrorMessage>}
              </label>
              <input
                defaultValue={transaction.origin}
                {...register('origin')}
                type="text"
                name="origin"
                id="origin"
                placeholder="Digite a procedência"
                style={{ border: errors.origin ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">
                Valor:{errors.value && <S.ErrorMessage>{errors.value.message}</S.ErrorMessage>}
              </label>
              <CurrencyInput
                {...register('value')}
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                style={{ border: errors.value ? '2px solid red' : 'initial' }}
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
              <label htmlFor="date">
                Data:{errors.date && <S.ErrorMessage>{errors.date.message}</S.ErrorMessage>}
              </label>
              <input
                {...register('date')}
                type="date"
                name="date"
                id="date"
                placeholder="Digite a data"
                style={{ border: errors.date ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">
                Descrição:
                {errors.description && (
                  <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
                )}
              </label>
              <input
                {...register('description')}
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
                style={{ border: errors.description ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="origin">
                Origem:{errors.origin && <S.ErrorMessage>{errors.origin.message}</S.ErrorMessage>}
              </label>
              <input
                {...register('origin')}
                type="text"
                name="origin"
                id="origin"
                placeholder="Digite a procedência"
                style={{ border: errors.origin ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">
                Valor:{errors.value && <S.ErrorMessage>{errors.value.message}</S.ErrorMessage>}
              </label>
              <CurrencyInput
                {...register('value')}
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                style={{ border: errors.value ? '2px solid red' : 'initial' }}
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
