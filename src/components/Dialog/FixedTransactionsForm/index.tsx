import * as S from "../../../styles/components/Dialog";
import * as P from "phosphor-react";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm, Controller } from "react-hook-form";
import { useTransaction } from "../../../hooks/useTransaction";
import { CreateFixedValues } from "../../../types/TransactionTypes";
import { formatValue } from "../../../utils/FormatNumberValue";

type TriggerProps = {
  type: "income" | "outcome" | "fixed";
  setOpen: Dispatch<SetStateAction<boolean>>;
  transaction?: CreateFixedValues;
};

const newFixedFormValidationSchema = Z.object({
  initialDate: Z.string().min(10, { message: "Informe a data inicial" }),
  finalDate: Z.coerce.string(),
  description: Z.coerce.string().min(1, { message: "Informe a descrição" }),
  type: Z.string().min(1, { message: "Informe se é uma entrada ou saída" }),
  value: Z.string().min(1, { message: "Informe o valor" }),
});

export const FixedTransactionsForm = ({
  type,
  setOpen,
  transaction,
}: TriggerProps) => {
  const { createNewTransaction, updateTransaction } = useTransaction();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateFixedValues>({
    resolver: zodResolver(newFixedFormValidationSchema),
  });

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  const handleCreateFixedTransaction = async (data: CreateFixedValues) => {
    const generateId = generateUniqueId();
    const formattedValue = formatValue(data.value.toString());
    const formattedInitialDate = new Date(data.initialDate);
    const formattedFinalDate = data.finalDate
      ? new Date(data.finalDate)
      : new Date(9999, 0, 1);

    if (!transaction) {
      createNewTransaction(type, {
        ...data,
        id: generateId,
        value: formattedValue,
        initialDate: new Date(
          new Date(
            formattedInitialDate.getFullYear(),
            formattedInitialDate.getMonth(),
            formattedInitialDate.getDate() + 1
          )
        ),
        finalDate: formattedFinalDate,
      });

      reset();
      setOpen(false);
      return;
    }

    updateTransaction(transaction.id, type, {
      ...data,
      value: formattedValue,
      initialDate: new Date(
        new Date(
          formattedInitialDate.getFullYear(),
          formattedInitialDate.getMonth(),
          formattedInitialDate.getDate() + 1
        )
      ),
      finalDate: formattedFinalDate,
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
      <form onSubmit={handleSubmit(handleCreateFixedTransaction)}>
        {transaction ? (
          <>
            {" "}
            <S.InputGroup>
              <label htmlFor="initialDate">
                Data de inicio:
                {errors.initialDate && (
                  <S.ErrorMessage>{errors.initialDate.message}</S.ErrorMessage>
                )}
              </label>
              <input
                {...register("initialDate")}
                defaultValue={formatISO(new Date(transaction!.initialDate), {
                  representation: "date",
                })}
                type="date"
                name="initialDate"
                id="initialDate"
                placeholder="Digite a data de inicio"
                style={{
                  border: errors.initialDate ? "2px solid red" : "initial",
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="finalDate">Data de fim:</label>
              <input
                defaultValue={
                  new Date(transaction.finalDate).getFullYear() !== 9999
                    ? formatISO(new Date(transaction!.finalDate), {
                        representation: "date",
                      })
                    : undefined
                }
                {...register("finalDate")}
                type="date"
                name="finalDate"
                id="finalDate"
                placeholder="Digite a data final"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">
                Descrição:
                {errors.description && (
                  <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
                )}
              </label>
              <input
                {...register("description")}
                type="text"
                defaultValue={transaction.description}
                name="description"
                id="description"
                placeholder="Digite a descrição"
                style={{
                  border: errors.description ? "2px solid red" : "initial",
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label>
                Tipo:{" "}
                {errors.type && (
                  <S.ErrorMessage>
                    Informe se é uma entrada ou saída
                  </S.ErrorMessage>
                )}
              </label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  return (
                    <S.RadioGroupRoot
                      style={{
                        border: errors.type ? "2px solid red" : "initial",
                      }}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={transaction.type}
                    >
                      <S.RadioGroupItem
                        transactionType="Entrada"
                        value="Entrada"
                        id="Entrada"
                      >
                        <P.ArrowCircleUp size={24} />
                        Entrada
                      </S.RadioGroupItem>

                      <S.RadioGroupItem
                        transactionType="Saída"
                        value="Saída"
                        id="Saída"
                      >
                        <P.ArrowCircleDown size={24} />
                        Saída
                      </S.RadioGroupItem>
                    </S.RadioGroupRoot>
                  );
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">
                Valor:
                {errors.value && (
                  <S.ErrorMessage>{errors.value.message}</S.ErrorMessage>
                )}
              </label>
              <CurrencyInput
                {...register("value")}
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                defaultValue={transaction.value}
                style={{
                  border: errors.initialDate ? "2px solid red" : "initial",
                }}
                decimalsLimit={2}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="fixed" type="submit">
              Inserir transação fixa
            </S.TypeButton>
          </>
        ) : (
          <>
            <S.InputGroup>
              <label htmlFor="initialDate">
                Data de inicio:{" "}
                {errors.initialDate && (
                  <S.ErrorMessage>{errors.initialDate.message}</S.ErrorMessage>
                )}
              </label>
              <input
                {...register("initialDate")}
                defaultValue={format(
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                  "yyyy-MM-dd"
                )}
                type="date"
                name="initialDate"
                id="initialDate"
                placeholder="Digite a data de inicio"
                style={{
                  border: errors.initialDate ? "2px solid red" : "initial",
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="finalDate">Data de fim:</label>
              <input
                {...register("finalDate")}
                type="date"
                name="finalDate"
                id="finalDate"
                placeholder="Digite a data final"
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="description">
                Descrição:{" "}
                {errors.description && (
                  <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
                )}
              </label>
              <input
                {...register("description")}
                type="text"
                name="description"
                id="description"
                placeholder="Digite a descrição"
                style={{
                  border: errors.description ? "2px solid red" : "initial",
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label>
                Tipo:{" "}
                {errors.type && (
                  <S.ErrorMessage>
                    Informe se é uma entrada ou saída
                  </S.ErrorMessage>
                )}
              </label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  return (
                    <S.RadioGroupRoot
                      onValueChange={field.onChange}
                      value={field.value}
                      style={{
                        border: errors.type ? "2px solid red" : "initial",
                      }}
                    >
                      <S.RadioGroupItem
                        transactionType="Entrada"
                        value="Entrada"
                        id="Entrada"
                      >
                        <P.ArrowCircleUp size={24} />
                        Entrada
                      </S.RadioGroupItem>

                      <S.RadioGroupItem
                        transactionType="Saída"
                        value="Saída"
                        id="Saída"
                      >
                        <P.ArrowCircleDown size={24} />
                        Saída
                      </S.RadioGroupItem>
                    </S.RadioGroupRoot>
                  );
                }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="value">
                Valor:
                {errors.value && (
                  <S.ErrorMessage>{errors.value.message}</S.ErrorMessage>
                )}
              </label>
              <CurrencyInput
                {...register("value")}
                prefix="R$"
                id="value"
                name="value"
                fixedDecimalLength={2}
                placeholder="R$ 000,00"
                style={{ border: errors.value ? "2px solid red" : "initial" }}
                decimalsLimit={2}
              />
            </S.InputGroup>
            <S.TypeButton transactionType="fixed" type="submit">
              Inserir transação fixa
            </S.TypeButton>
          </>
        )}
      </form>
    </S.Content>
  );
};
