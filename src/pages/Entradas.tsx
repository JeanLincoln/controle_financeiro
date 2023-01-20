import { Card } from '../components/Card';
import * as S from '../styles/pages/Entradas';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext, useState } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { DialogComponent } from '../components/Dialog';
import { format } from 'date-fns';
import { formatMonetary } from '../utils/FormatMonetaryValues';
import { Pagination } from '../components/Pagination';

export default function ValoresDeEntrada() {
  const { incomeValues, fixedIncomeTotal, monthlyIncomeTotal, deleteTransaction } =
    useContext(TransactionsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(8);

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens = incomeValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <S.Container>
      <S.ElementsContainer>
        <MonthSelector setCurrentPage={setCurrentPage} />
        <Card>
          <div>
            <span>Entradas Fixas</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>{formatMonetary(fixedIncomeTotal())}</h2>
        </Card>
        <P.PlusCircle size={32} />
        <Card>
          <div>
            <span>Entradas Mensais</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>{formatMonetary(monthlyIncomeTotal())}</h2>
        </Card>
        <P.Equals size={32} />
        <Card>
          <div>
            <span>Total de entradas</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>{formatMonetary(fixedIncomeTotal() + monthlyIncomeTotal())}</h2>
        </Card>
        <DialogComponent type="income" triggerText="Novo Valor de Entrada" />
      </S.ElementsContainer>
      <S.IncomeValuesTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Procedência</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {currentItens.map(({ id, date, description, origin, value }) => {
            return (
              <tr key={id}>
                <td>{format(new Date(date), 'dd/MM/yyyy')}</td>
                <td>{description}</td>
                <td>{origin}</td>
                <td>{formatMonetary(value)}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteTransaction('income', id);
                    }}
                  >
                    <P.Trash size={32} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.IncomeValuesTable>
      <Pagination
        currentPage={currentPage}
        itensPerPage={itensPerPage}
        totalItens={incomeValues.length}
        paginate={paginate}
      />
    </S.Container>
  );
}
