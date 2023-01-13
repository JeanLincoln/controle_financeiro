import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
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
  value: number;
};

export function DialogComponent({ type, triggerText }: TriggerProps) {
  const { register, handleSubmit } = useForm<IncomeTransactionProps | OutcomeTransaction>();
  const { newTransaction } = useContext(TransactionsContext);

  const handleCreateTransaction = async (data: IncomeTransactionProps | OutcomeTransaction) => {
    const formattedDate = new Date(data.date);
    newTransaction(type, {
      ...data,
      date: new Date(
        new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate() + 1)
      ),
    });
  };

  return (
    <Dialog.Root>
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
                type="number"
                id="value"
                placeholder="Digite o valor"
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
              />
              <select {...register('method')} id="type" placeholder="Selecione o método">
                <option value="">Escolha um tipo</option>
                <option value="Crédito à vista">Cartão de crédito</option>
                <option value="Crédito parcelado">Pix</option>
                <option value="Débito">Boleto</option>
                <option value="Boleto">Transferencia</option>
              </select>
              <select {...register('type')} id="type" placeholder="Selecione o tipo">
                <option value="">Escolha um tipo</option>
                <option value="Comida">Comida</option>
                <option value="Lazer">Lazer</option>
                <option value="Alcool">Alcool</option>
                <option value="Vestimenta">Vestimenta</option>
                <option value="Jogos">Jogos</option>
                <option value="Locomoção">Locomoção</option>
              </select>
              <select {...register('paymentForm')} id="type" placeholder="Selecione o tipo">
                <option value="">Escolha um tipo</option>
                <option value="Crédito à vista">Crédito à vista</option>
                <option value="Crédito parcelado">Crédito parcelado</option>
                <option value="Débito">Débito</option>
              </select>
              <input
                {...register('installment', { valueAsNumber: true })}
                type="number"
                id="installment"
                placeholder="Digite o número de parcelas"
              />
              <input
                {...register('value', { valueAsNumber: true })}
                type="number"
                id="value"
                placeholder="Digite o valor"
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
