import { format, formatISO } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useForm, Controller } from 'react-hook-form'
import { useTransaction } from '../../../hooks/useTransaction'
import * as S from '../../../styles/components/Dialog'
import * as P from 'phosphor-react'
import { CreateFixedValues } from '../../../types/TransactionTypes'
import { formatValue } from '../../../utils/FormatNumberValue'
import { FixedValues } from '../../../types/TransactionTypes'

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed'
  setOpen: Dispatch<SetStateAction<boolean>>
  transaction?: FixedValues
}

export const FixedTransactionsForm = ({ type, setOpen, transaction }: TriggerProps) => {
  const { register, handleSubmit, reset, control } = useForm<CreateFixedValues>()
  const { newTransaction, updateTransaction } = useTransaction()

  const handleCreateFixedTransaction = async (data: CreateFixedValues) => {
    const formattedValue = formatValue(data.value.toString())
    const formattedInitialDate = new Date(data.initialDate)
    const formattedFinalDate = data.finalDate && new Date(data.finalDate)

    if (!transaction) {
      newTransaction(type, {
        ...data,
        value: formattedValue,
        initialDate: new Date(
          new Date(
            formattedInitialDate.getFullYear(),
            formattedInitialDate.getMonth(),
            formattedInitialDate.getDate() + 1
          )
        ),
        finalDate: formattedFinalDate
          ? new Date(
              new Date(
                formattedFinalDate.getFullYear(),
                formattedFinalDate.getMonth(),
                formattedFinalDate.getDate() + 1
              )
            )
          : undefined,
      })

      reset()
      setOpen(false)
      return
    }

    updateTransaction(transaction.id, type, {
      ...data,
      value: formattedValue,
      initialDate: new Date(
        new Date(
          formattedInitialDate.getFullYear(),
          formattedInitialDate.getMonth(),
          formattedInitialDate.getDate() + 1
        )
      ),
      finalDate: formattedFinalDate
        ? new Date(
            new Date(
              formattedFinalDate.getFullYear(),
              formattedFinalDate.getMonth(),
              formattedFinalDate.getDate() + 1
            )
          )
        : undefined,
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
              <label htmlFor="initialDate">Data de inicio:</label>
              <input
                {...register('initialDate')}
                defaultValue={formatISO(new Date(transaction!.initialDate), {
                  representation: 'date',
                })}
                required
                type="date"
                name="initialDate"
                id="initialDate"
                placeholder="Digite a data de inicio"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="finalDate">Data de fim:</label>
              <input
                defaultValue={
                  transaction.finalDate &&
                  formatISO(new Date(transaction!.finalDate), { representation: 'date' })
                }
                {...register('finalDate')}
                type="date"
                name="finalDate"
                id="finalDate"
                placeholder="Digite a data final"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">Descrição:</label>
              <input
                defaultValue={transaction.description}
                {...register('description')}
                required
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label>Tipo:</label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  return (
                    <S.RadioGroupRoot
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={transaction.type}
                    >
                      <S.RadioGroupItem transactionType="Entrada" value="Entrada" id="Entrada">
                        <P.ArrowCircleUp size={24} />
                        Entrada
                      </S.RadioGroupItem>

                      <S.RadioGroupItem transactionType="Saída" value="Saída" id="Saída">
                        <P.ArrowCircleDown size={24} />
                        Saída
                      </S.RadioGroupItem>
                    </S.RadioGroupRoot>
                  )
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">Valor:</label>
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
              <label htmlFor="initialDate">Data de inicio:</label>
              <input
                {...register('initialDate')}
                defaultValue={format(
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                  'yyyy-MM-dd'
                )}
                required
                type="date"
                name="initialDate"
                id="initialDate"
                placeholder="Digite a data de inicio"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="finalDate">Data de fim:</label>
              <input
                {...register('finalDate')}
                type="date"
                name="finalDate"
                id="finalDate"
                placeholder="Digite a data final"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">Descrição:</label>
              <input
                {...register('description')}
                required
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label>Tipo:</label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  return (
                    <S.RadioGroupRoot onValueChange={field.onChange} value={field.value}>
                      <S.RadioGroupItem transactionType="Entrada" value="Entrada" id="Entrada">
                        <P.ArrowCircleUp size={24} />
                        Entrada
                      </S.RadioGroupItem>

                      <S.RadioGroupItem transactionType="Saída" value="Saída" id="Saída">
                        <P.ArrowCircleDown size={24} />
                        Saída
                      </S.RadioGroupItem>
                    </S.RadioGroupRoot>
                  )
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">Valor:</label>
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
