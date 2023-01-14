import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import * as S from '../../styles/components/Dialog';

type TriggerProps = {
  type: 'income' | 'outcome';
  triggerText: string;
};

type IncomeTransactionProps = {
  date: Date;
  description: string;
  origin: string;
  value: number;
};

type OutcomeTransaction = {
  date: Date;
  description: string;
  method: string;
  type: string;
  paymentForm: string;
  installment: number;
  value: number;
};

export function DialogComponent({ type, triggerText }: TriggerProps) {
  const { register, handleSubmit, reset } = useForm<IncomeTransactionProps | OutcomeTransaction>();
  const { newTransaction } = useContext(TransactionsContext);
  const [open, setOpen] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [installmentPurchase, isInstallmentPurchase] = useState(false);

  const handleCreateTransaction = async (data: IncomeTransactionProps | OutcomeTransaction) => {
    const formattedDate = new Date(data.date);
    newTransaction(type, {
      ...data,
      date: new Date(
        new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate() + 1)
      ),
    });
    reset();
    setOpen(false);
  };

  const handleMethod = (e) => {
    e.target.value === 'Cartão de crédito' ? setIsCard(true) : setIsCard(false);
  };

  const handlePaymentForm = (e) => {
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
            <Dialog.Title>Novo Valor De Entrada</Dialog.Title>
            <S.CloseButton asChild>
              <button aria-label="Close">X</button>
            </S.CloseButton>
            <form onSubmit={handleSubmit(handleCreateTransaction)}>
              <input {...register('date')} type="date" id="date" placeholder="Digite a data" />
              <input
                {...register('description')}
                type="text"
                id="description"
                placeholder="Digite a descrição"
              />
              <input
                {...register('origin')}
                type="text"
                id="origin"
                placeholder="Digite a procedência"
              />
              <input
                {...register('value', { valueAsNumber: true })}
                type="text"
                id="value"
                placeholder="R$000,00"
              />
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
              <input {...register('date')} type="date" id="date" placeholder="Digite a data" />
              <input
                {...register('description')}
                type="text"
                id="description"
                placeholder="Digite a descrição"
                autoComplete="off"
              />
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

              <select
                {...register('paymentForm')}
                id="paymentForm"
                placeholder="Qual foi o método de pagamento?"
                onChange={handlePaymentForm}
                style={!isCard ? { display: 'none' } : { display: 'block' }}
              >
                <option value="Débito">Qual foi o método de pagamento?</option>
                <option value="Crédito à vista">Crédito à vista</option>
                <option value="Crédito parcelado">Crédito parcelado</option>
                <option value="Débito">Débito</option>
              </select>
              <input
                {...register('installment', { valueAsNumber: true })}
                type="number"
                id="installment"
                placeholder="Digite o número de parcelas"
                defaultValue={1}
                style={!installmentPurchase ? { display: 'none' } : { display: 'block' }}
              />
              <input
                {...register('value', { valueAsNumber: true })}
                type="text"
                id="value"
                placeholder="R$000,00"
              />
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
