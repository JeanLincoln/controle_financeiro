import { Dispatch, SetStateAction } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../../hooks/useTransaction';
import * as S from '../../../styles/components/Dialog';
import { formatValue } from '../../../utils/FormatNumberValue';

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed';
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type IncomeTransactionProps = {
  date: Date;
  description: string;
  origin: string;
  value: string;
};

export const IncomeTransactionsForm = ({ type, setOpen }: TriggerProps) => {
  const { register, handleSubmit, reset } = useForm<IncomeTransactionProps>();
  const { newTransaction } = useTransaction();

  const handleCreateIncomeTransaction = async (data: IncomeTransactionProps) => {
    const formattedDate = new Date(data.date);
    const formattedValue = formatValue(data.value);

    console.log({
      ...data,
      value: formattedValue,
      date: new Date(
        new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate() + 1)
      ),
    });

    // newTransaction(type, {
    //   ...data,
    //   value: formattedValue,
    //   date: new Date(
    //     new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate() + 1)
    //   ),
    // });

    reset();
    setOpen(false);
  };

  return (
    <S.Content>
      <S.Title>Novo Valor De Entrada</S.Title>
      <S.CloseButton asChild>
        <button aria-label="Close">X</button>
      </S.CloseButton>
      <form onSubmit={handleSubmit(handleCreateIncomeTransaction)}>
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
      </form>
    </S.Content>
  );
};
