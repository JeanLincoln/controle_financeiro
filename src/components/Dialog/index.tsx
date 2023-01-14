import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useTransaction } from '../../hooks/useTransaction';
import * as S from '../../styles/components/Dialog';

type TriggerProps = {
  type: 'income' | 'outcome';
  triggerText: string;
};

type IncomeTransactionProps = {
  date: Date;
  description: string;
  origin: string;
  value: string;
};

type OutcomeTransaction = {
  date: Date;
  description: string;
  method: string;
  type: string;
  paymentForm: string;
  installment: number;
  value: string;
};

export function DialogComponent({ type, triggerText }: TriggerProps) {
  const { register, handleSubmit, reset } = useForm<IncomeTransactionProps | OutcomeTransaction>();
  const { newTransaction } = useTransaction();
  const [open, setOpen] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [installmentPurchase, isInstallmentPurchase] = useState(false);

  const handleCreateTransaction = async (data: IncomeTransactionProps | OutcomeTransaction) => {
    const formattedDate = new Date(data.date);

    const transactionValue = data.value;
    const dotOff = transactionValue.replace('.', '');
    const formattedValue = Number(dotOff.replace(',', '.'));

    newTransaction(type, {
      ...data,
      value: formattedValue,
      date: new Date(
        new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate() + 1)
      ),
    });

    reset();
    setOpen(false);
  };

  const handleMethod = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'Cartão de crédito' ? setIsCard(true) : setIsCard(false);
  };

  const handlePaymentForm = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === 'Crédito parcelado'
      ? isInstallmentPurchase(true)
      : isInstallmentPurchase(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <S.SetIncomeTransactionButton transactionType={type}>
          {triggerText}
        </S.SetIncomeTransactionButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <S.Overlay className="DialogOverlay" />
        {type === 'income' ? (
          <S.Content>
            <S.Title>Novo Valor De Entrada</S.Title>
            <S.CloseButton asChild>
              <button aria-label="Close">X</button>
            </S.CloseButton>
            <form onSubmit={handleSubmit(handleCreateTransaction)}>
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
                />
              </S.InputGroup>
              <S.InputGroup>
                <span>Origem:</span>
                <input
                  {...register('origin')}
                  type="text"
                  id="origin"
                  placeholder="Digite a procedência"
                />
              </S.InputGroup>
              <S.InputGroup>
                <span>Valor:</span>
                <CurrencyInput
                  {...register('value')}
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
            </form>
          </S.Content>
        ) : (
          <S.Content>
            <Dialog.Title>Novo Valor De Saída</Dialog.Title>
            <S.CloseButton asChild>
              <button aria-label="Close">X</button>
            </S.CloseButton>
            <form onSubmit={handleSubmit(handleCreateTransaction)}>
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
                  <option value="Comida">Comida</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Alcool">Alcool</option>
                  <option value="Vestimenta">Vestimenta</option>
                  <option value="Jogos">Jogos</option>
                  <option value="Locomoção">Locomoção</option>
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
              <S.InputGroup
                style={!installmentPurchase ? { display: 'none' } : { display: 'flex' }}
              >
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
            </form>
          </S.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
