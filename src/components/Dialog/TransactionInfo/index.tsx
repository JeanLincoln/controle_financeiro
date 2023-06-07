import * as Dialog from "@radix-ui/react-dialog";
import * as P from "phosphor-react";
import * as S from "../../../styles/components/UpdateTransactionDialog";
import { useState } from "react";
import { IncomeTransactionsForm } from "../IncomeTransactionsForm";
import { OutcomeTransactionsForm } from "../OutcomeTransactionsForm";
import { FixedTransactionsForm } from "../FixedTransactionsForm";
import {
  CreateFixedValues,
  CreateIncomeTransaction,
  CreateOutcomeTransaction,
} from "../../../types/TransactionTypes";
import { Pencil } from "../../Icons/Pencil";
import { OutcomeTransactionsInfo } from "../OutcomeTransactionInfo";

type TriggerProps = {
  type: "income" | "outcome" | "fixed";
  transaction?:
    | CreateIncomeTransaction
    | CreateOutcomeTransaction
    | CreateFixedValues;
};

export function TransactionInfo({ type, transaction }: TriggerProps) {
  const [open, setOpen] = useState(false);

  const HandleTransactionType = (type: string) => {
    if (type === "income") {
      return (
        <IncomeTransactionsForm
          type={type}
          setOpen={setOpen}
          transaction={transaction as CreateIncomeTransaction}
        />
      );
    }
    if (type === "outcome") {
      return (
        <OutcomeTransactionsInfo
          type={type}
          setOpen={setOpen}
          transaction={transaction as CreateOutcomeTransaction}
        />
      );
    }
    if (type === "fixed") {
      return (
        <FixedTransactionsForm
          type={type}
          setOpen={setOpen}
          transaction={transaction as CreateFixedValues}
        />
      );
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <S.UpdateTransactionButton>
          <P.Info size={32} />
        </S.UpdateTransactionButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <S.Overlay className="DialogOverlay" />
        {HandleTransactionType(type)}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
