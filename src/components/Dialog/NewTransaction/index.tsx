import * as Dialog from '@radix-ui/react-dialog';
import * as S from '../../../styles/components/NewTransactionDialog';
import { useState } from 'react';
import { IncomeTransactionsForm } from '../IncomeTransactionsForm';
import { OutcomeTransactionsForm } from '../OutcomeTransactionsForm';
import { FixedTransactionsForm } from '../FixedTransactionsForm';

type TriggerProps = {
  method: 'post' | 'put';
  type: 'income' | 'outcome' | 'fixed';
  triggerText: string;
};

export function NewTransactionForm({ type, triggerText, method }: TriggerProps) {
  const [open, setOpen] = useState(false);

  const HandleTransactionType = (type: string) => {
    if (type === 'income' && method === 'post') {
      return <IncomeTransactionsForm type={type} setOpen={setOpen} />;
    }
    if (type === 'outcome' && method === 'post') {
      return <OutcomeTransactionsForm type={type} setOpen={setOpen} />;
    }
    if (type === 'fixed' && method === 'post') {
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
