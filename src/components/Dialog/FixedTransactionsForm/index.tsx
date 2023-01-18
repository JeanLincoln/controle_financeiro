import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../../hooks/useTransaction';
import * as S from '../../../styles/components/Dialog';
import { formatValue } from '../../../utils/FormatNumberValue';

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed';
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type FixedTransactionProps = {
  description: string;
  type: string;
  value: string;
};

export const FixedTransactionsForm = ({ type, setOpen }: TriggerProps) => {
  const { register, handleSubmit, reset } = useForm<FixedTransactionProps>();
  const { newTransaction } = useTransaction();

  const handleCreateIncomeTransaction = async (data: FixedTransactionProps) => {
    const formattedValue = formatValue(data.value);

    newTransaction(type, {
      ...data,
      value: formattedValue,
    });

    reset();
    setOpen(false);
  };

  return (
    <S.Content>
      <S.Title>Novo Valor Fixo</S.Title>
      <S.CloseButton asChild>
        <button aria-label="Close">X</button>
      </S.CloseButton>
      <form onSubmit={handleSubmit(handleCreateIncomeTransaction)}>
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
          <span>Tipo:</span>
          <select {...register('type')} id="type">
            <option value="">Entrada ou saída?</option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
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
        <S.TypeButton transactionType="fixed" type="submit">
          Inserir Entrada
        </S.TypeButton>
      </form>
    </S.Content>
  );
};
