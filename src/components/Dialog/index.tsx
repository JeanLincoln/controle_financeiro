import * as Dialog from '@radix-ui/react-dialog';
import * as S from '../../styles/components/Dialog';
import { useState } from 'react';
import { useTransaction } from '../../hooks/useTransaction';
import { IncomeTransactionsForm } from './IncomeTransactionsForm';
import { OutcomeTransactionsForm } from './OutcomeTransactionsForm';
import { FixedTransactionsForm } from './FixedTransactionsForm';

type TriggerProps = {
  type: 'income' | 'outcome' | 'fixed';
  triggerText: string;
};

export function DialogComponent({ type, triggerText }: TriggerProps) {
  const { newTransaction } = useTransaction();
  const [open, setOpen] = useState(false);

  const HandleTransactionType = (type: string) => {
    if (type === 'income') {
      return <IncomeTransactionsForm type={type} setOpen={setOpen} />;
    }
    if (type === 'outcome') {
      return <OutcomeTransactionsForm type={type} setOpen={setOpen} />;
    }
    if (type === 'fixed') {
      return <FixedTransactionsForm type={type} setOpen={setOpen} />;
    }
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
        {HandleTransactionType(type)}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
