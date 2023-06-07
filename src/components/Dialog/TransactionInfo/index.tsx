import * as Dialog from "@radix-ui/react-dialog";
import * as P from "phosphor-react";
import * as S from "../../../styles/components/TransactionsInfoDialog";
import { useState } from "react";
import { CreateOutcomeTransaction } from "../../../types/TransactionTypes";
import { OutcomeTransactionsInfo } from "../OutcomeTransactionInfo";

type TriggerProps = {
  type: "outcome";
  transaction?: CreateOutcomeTransaction;
};

export function TransactionInfo({ type, transaction }: TriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <S.TransactionInfoButton>
          <P.Info size={32} />
        </S.TransactionInfoButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <S.Overlay className="DialogOverlay" />
        <OutcomeTransactionsInfo
          type={type}
          setOpen={setOpen}
          transaction={transaction as CreateOutcomeTransaction}
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
}
