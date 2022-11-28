import * as Dialog from '@radix-ui/react-dialog';
import { type } from 'os';
import * as S from '../../styles/components/Dialog';

type TriggerProps = {
  type: string;
  triggerText: string;
};

export function DialogComponent({ type, triggerText }: TriggerProps) {
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
            <form>
              <input type="date" id="date" placeholder="Digite a data" />
              <input type="text" id="description" placeholder="Digite a descrição" />
              <input type="text" id="origin" placeholder="Digite a procedência" />
              <input type="number" id="value" placeholder="Digite o valor" />
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
            <form>
              <input type="date" id="date" placeholder="Digite a data" />
              <input type="text" id="description" placeholder="Digite a descrição" />
              <input type="text" id="method" placeholder="Digite a método" />
              <select id="type" placeholder="Selecione o tipo">
                <option value="">Escolha um tipo</option>
                <option value="dog">Comida</option>
                <option value="cat">Lazer</option>
                <option value="hamster">Alcool</option>
                <option value="parrot">Vestimenta</option>
                <option value="spider">Jogos</option>
                <option value="goldfish">Locomoção</option>
              </select>
              <input type="number" id="value" placeholder="Digite o valor" />
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
