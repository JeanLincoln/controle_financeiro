import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../../hooks/useTransaction';
import * as S from '../../../styles/components/Dialog';
import { CreateOutcomeTransaction } from '../../../types/TransactionTypes';
import { formatValue } from '../../../utils/FormatNumberValue';
import { OutcomeTransaction } from '../../../types/TransactionTypes';
import { formatISO } from 'date-fns';

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed';
  setOpen: Dispatch<SetStateAction<boolean>>;
  transaction?: OutcomeTransaction;
};

export const OutcomeTransactionsForm = ({ type, setOpen, transaction }: TriggerProps) => {
  const { register, handleSubmit, reset } = useForm<CreateOutcomeTransaction>();
  const [isCard, setIsCard] = useState(false);
  const [installmentPurchase, isInstallmentPurchase] = useState(false);
  const { newTransaction, updateTransaction } = useTransaction();

  const handleMethod = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'Cartão de crédito' ? setIsCard(true) : setIsCard(false);
  };

  const handlePaymentForm = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'Crédito parcelado'
      ? isInstallmentPurchase(true)
      : isInstallmentPurchase(false);
  };

  const handleCreateOutcomeTransaction = async (data: CreateOutcomeTransaction) => {
    const formattedDate = new Date(data.date);
    const formattedValue = formatValue(data.value.toString());

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
      });
      reset();
      setOpen(false);
      return;
    }

    updateTransaction(transaction.id, type, {
      ...data,
      value: formattedValue,
      date: new Date(
        new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate() + 1)
      ),
    });

    reset();
    setOpen(false);
  };

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
              <span>Data:</span>
              <input
                defaultValue={formatISO(new Date(transaction!.date), { representation: 'date' })}
                {...register('date')}
                type="date"
                id="date"
                placeholder="Digite a data"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Descrição:</span>
              <input
                defaultValue={transaction?.description}
                {...register('description')}
                type="text"
                id="description"
                placeholder="Digite a descrição"
                autoComplete="off"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Tipo:</span>
              <select
                {...register('type')}
                id="type"
                placeholder="Qual foi o tipo da compra/gasto?"
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
              <span>Método:</span>
              <select
                {...register('method')}
                onChange={handleMethod}
                id="method"
                placeholder="Selecione o método"
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
              <span>Forma de Pagamento:</span>
              <select
                {...register('paymentForm')}
                id="paymentForm"
                placeholder="Qual foi o método de pagamento?"
                onChange={handlePaymentForm}
              >
                <option value="Débito">Qual foi o método de pagamento?</option>
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
              <span>Número de parcelas:</span>
              <input
                {...register('installment', { valueAsNumber: true })}
                type="number"
                id="installment"
                placeholder="Digite o número de parcelas"
                defaultValue={transaction.installment}
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Valor:</span>
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
            <S.TypeButton transactionType="outcome" type="submit">
              Atualizar Saída
            </S.TypeButton>
          </>
        ) : (
          <>
            <S.InputGroup>
              <span>Data:</span>
              <input {...register('date')} type="date" id="date" placeholder="Digite a data" />
            </S.InputGroup>
            <S.InputGroup>
              <span>Descrição:</span>
              <input
                {...register('description')}
                type="text"
                id="description"
                placeholder="Digite a descrição"
                autoComplete="off"
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Tipo:</span>
              <select
                {...register('type')}
                id="type"
                placeholder="Qual foi o tipo da compra/gasto?"
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
              <span>Método:</span>
              <select
                {...register('method')}
                onChange={handleMethod}
                id="method"
                placeholder="Selecione o método"
              >
                <option value="">Qual foi o método?</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Pix">Pix</option>
                <option value="Boleto">Boleto</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </S.InputGroup>
            <S.InputGroup style={!isCard ? { display: 'none' } : { display: 'flex' }}>
              <span>Forma de Pagamento:</span>
              <select
                {...register('paymentForm')}
                id="paymentForm"
                placeholder="Qual foi o método de pagamento?"
                onChange={handlePaymentForm}
              >
                <option value="Débito">Qual foi o método de pagamento?</option>
                <option value="Crédito à vista">Crédito à vista</option>
                <option value="Crédito parcelado">Crédito parcelado</option>
                <option value="Débito">Débito</option>
              </select>
            </S.InputGroup>
            <S.InputGroup style={!installmentPurchase ? { display: 'none' } : { display: 'flex' }}>
              <span>Número de parcelas:</span>
              <input
                {...register('installment', { valueAsNumber: true })}
                type="number"
                id="installment"
                placeholder="Digite o número de parcelas"
                defaultValue={1}
              />
            </S.InputGroup>
            <S.InputGroup>
              <span>Valor:</span>
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
            <S.TypeButton transactionType="outcome" type="submit">
              Inserir Saída
            </S.TypeButton>
          </>
        )}
      </form>
    </S.Content>
  );
};
