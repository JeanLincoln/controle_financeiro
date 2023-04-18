import * as S from '../../../styles/components/Dialog'
import * as Z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useForm } from 'react-hook-form'
import { useTransaction } from '../../../hooks/useTransaction'
import { CreateOutcomeTransaction } from '../../../types/TransactionTypes'
import { formatValue } from '../../../utils/FormatNumberValue'
import { OutcomeTransaction } from '../../../types/TransactionTypes'
import { formatISO } from 'date-fns'

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed'
  setOpen: Dispatch<SetStateAction<boolean>>
  transaction?: OutcomeTransaction
}

const newOutcomeFormValidationSchema = Z.object({
  date: Z.string().min(10, { message: 'Informe a data da transação' }),
  description: Z.string().min(1, { message: 'Informe a descrição' }),
  type: Z.string().min(1, { message: 'Informe o tipo' }),
  method: Z.string().min(1, { message: 'Informe o método' }),
  paymentForm: Z.optional(Z.string().min(1, { message: 'Informe a forma de pagamento' })),
  installment: Z.optional(Z.number().min(1, { message: 'Informe o n° de parcelas' })),
  value: Z.string().min(1, { message: 'Informe o valor' }),
})

export const OutcomeTransactionsForm = ({ type, setOpen, transaction }: TriggerProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOutcomeTransaction>({ resolver: zodResolver(newOutcomeFormValidationSchema) })
  const [isCard, setIsCard] = useState(false)
  const [installmentPurchase, isInstallmentPurchase] = useState(false)
  const { newTransaction, updateTransaction } = useTransaction()

  console.log(errors)

  const handleMethod = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'Cartão de crédito' ? setIsCard(true) : setIsCard(false)
  }

  const handlePaymentForm = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'Crédito parcelado'
      ? isInstallmentPurchase(true)
      : isInstallmentPurchase(false)
  }

  const handleCreateOutcomeTransaction = async (data: CreateOutcomeTransaction) => {
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
      <S.Title>Novo Valor De Saída</S.Title>
      <S.CloseButton asChild>
        <button aria-label="Close">X</button>
      </S.CloseButton>
      <form onSubmit={handleSubmit(handleCreateOutcomeTransaction)}>
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
                defaultValue={transaction?.description}
                {...register('description')}
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
                autoComplete="off"
                style={{ border: errors.description ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="type">
                Tipo:{errors.type && <S.ErrorMessage>{errors.type.message}</S.ErrorMessage>}
              </label>
              <select
                {...register('type')}
                name="type"
                id="type"
                placeholder="Qual foi o tipo da compra/gasto?"
                style={{ border: errors.type ? '2px solid red' : 'initial' }}
              >
                <option value="">Qual foi o tipo da compra/gasto?</option>
                <option selected={transaction?.type === 'Alcool' ? true : false} value="Alcool">
                  Alcool
                </option>
                <option selected={transaction?.type === 'Casa' ? true : false} value="Casa">
                  Casa
                </option>
                <option
                  selected={transaction?.type === 'Vestimenta' ? true : false}
                  value="Vestimenta"
                >
                  Curso/Estudo
                </option>
                <option selected={transaction?.type === 'Comida' ? true : false} value="Comida">
                  Comida
                </option>
                <option
                  selected={transaction?.type === 'Eletrônicos' ? true : false}
                  value="Eletrônicos"
                >
                  Eletrônicos
                </option>
                <option selected={transaction?.type === 'Jogos' ? true : false} value="Jogos">
                  Jogos
                </option>
                <option selected={transaction?.type === 'Lazer' ? true : false} value="Lazer">
                  Lazer
                </option>
                <option
                  selected={transaction?.type === 'Locomoção' ? true : false}
                  value="Locomoção"
                >
                  Locomoção
                </option>
                <option
                  selected={transaction?.type === 'Musculação' ? true : false}
                  value="Musculação"
                >
                  Musculação
                </option>
                <option selected={transaction?.type === 'Presente' ? true : false} value="Presente">
                  Presente
                </option>
                <option
                  selected={transaction?.type === 'Saúde/Remedios' ? true : false}
                  value="Saúde/Remedios"
                >
                  Saúde/Remedios
                </option>
                <option
                  selected={transaction?.type === 'Vestimenta' ? true : false}
                  value="Vestimenta"
                >
                  Vestimenta
                </option>
              </select>
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="method">
                Método:{errors.method && <S.ErrorMessage>{errors.method.message}</S.ErrorMessage>}
              </label>
              <select
                {...register('method')}
                onChange={handleMethod}
                name="method"
                id="method"
                placeholder="Selecione o método"
                style={{ border: errors.method ? '2px solid red' : 'initial' }}
              >
                <option value="">Qual foi o método?</option>
                <option
                  selected={transaction?.method === 'Cartão de crédito' ? true : false}
                  value="Cartão de crédito"
                >
                  Cartão de crédito
                </option>
                <option selected={transaction?.method === 'Pix' ? true : false} value="Pix">
                  Pix
                </option>
                <option selected={transaction?.method === 'Boleto' ? true : false} value="Boleto">
                  Boleto
                </option>
                <option
                  selected={transaction?.method === 'Transferencia' ? true : false}
                  value="Transferencia"
                >
                  Transferencia
                </option>
              </select>
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="paymentForm">Forma de Pagamento:</label>
              <select
                {...register('paymentForm')}
                name="paymentForm"
                id="paymentForm"
                placeholder="Qual foi o método de pagamento?"
                onChange={handlePaymentForm}
              >
                <option value="">Qual foi o método de pagamento?</option>
                <option
                  selected={transaction?.paymentForm === 'Crédito à vista' ? true : false}
                  value="Crédito à vista"
                >
                  Crédito à vista
                </option>
                <option
                  selected={transaction?.paymentForm === 'Crédito parcelado' ? true : false}
                  value="Crédito parcelado"
                >
                  Crédito parcelado
                </option>
                <option
                  selected={transaction?.paymentForm === 'Débito' ? true : false}
                  value="Débito"
                >
                  Débito
                </option>
              </select>
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="installment">Número de parcelas:</label>
              <input
                {...register('installment', { valueAsNumber: true })}
                type="number"
                name="installment"
                id="installment"
                placeholder="Digite o número de parcelas"
                defaultValue={transaction.installment}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">
                Valor:
                {errors.paymentForm && (
                  <S.ErrorMessage>{errors.paymentForm.message}</S.ErrorMessage>
                )}
              </label>
              <CurrencyInput
                {...register('value')}
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                defaultValue={transaction.value}
                decimalsLimit={2}
                style={{ border: errors.paymentForm ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="outcome" type="submit">
              Atualizar Saída
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
                autoComplete="off"
                style={{ border: errors.description ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="type">
                Tipo:{errors.type && <S.ErrorMessage>{errors.type.message}</S.ErrorMessage>}
              </label>
              <select
                {...register('type')}
                name="type"
                id="type"
                placeholder="Qual foi o tipo da compra/gasto?"
                style={{ border: errors.type ? '2px solid red' : 'initial' }}
              >
                <option value="">Qual foi o tipo da compra/gasto?</option>
                <option value="Alcool">Alcool</option>
                <option value="Casa">Casa</option>
                <option value="Vestimenta">Curso/Estudo</option>
                <option value="Comida">Comida</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Jogos">Jogos</option>
                <option value="Lazer">Lazer</option>
                <option value="Locomoção">Locomoção</option>
                <option value="Musculação">Musculação</option>
                <option value="Presente">Presente</option>
                <option value="Saúde/Remedios">Saúde/Remedios</option>
                <option value="Vestimenta">Vestimenta</option>
              </select>
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="method">
                Método:{errors.method && <S.ErrorMessage>{errors.method.message}</S.ErrorMessage>}
              </label>
              <select
                {...register('method')}
                onChange={handleMethod}
                name="method"
                id="method"
                placeholder="Selecione o método"
                style={{ border: errors.method ? '2px solid red' : 'initial' }}
              >
                <option value="">Qual foi o método?</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Pix">Pix</option>
                <option value="Boleto">Boleto</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </S.InputGroup>
            <S.InputGroup style={!isCard ? { display: 'none' } : { display: 'flex' }}>
              <label htmlFor="paymentForm">Forma de Pagamento:</label>
              <select
                {...register('paymentForm')}
                name="paymentForm"
                id="paymentForm"
                placeholder="Qual foi o método de pagamento?"
                onChange={handlePaymentForm}
              >
                <option value="">Qual foi o método de pagamento?</option>
                <option value="Crédito à vista">Crédito à vista</option>
                <option value="Crédito parcelado">Crédito parcelado</option>
                <option value="Débito">Débito</option>
              </select>
            </S.InputGroup>
            <S.InputGroup style={!installmentPurchase ? { display: 'none' } : { display: 'flex' }}>
              <label htmlFor="installment">Número de parcelas:</label>
              <input
                {...register('installment', { valueAsNumber: true })}
                type="number"
                name="installment"
                min={1}
                id="installment"
                placeholder="Digite o número de parcelas"
                defaultValue={1}
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
                min={0}
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                decimalsLimit={2}
                style={{ border: errors.value ? '2px solid red' : 'initial' }}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="outcome" type="submit">
              Inserir Saída
            </S.TypeButton>
          </>
        )}
      </form>
    </S.Content>
  )
}
