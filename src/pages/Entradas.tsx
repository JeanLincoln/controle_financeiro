import { Card } from '../components/Card';
import * as S from '../styles/pages/Entradas';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext, useEffect, useState } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { NewTransactionForm } from '../components/Dialog/NewTransaction';
import { format } from 'date-fns';
import { formatMonetary } from '../utils/FormatMonetaryValues';
import { Pagination } from '../components/Pagination';
import { UpdateTransactionForm } from '../components/Dialog/UpdateTransaction';
import { IncomeTransacion } from '../types/TransactionTypes';

export default function ValoresDeEntrada() {
  const { incomeValues, fixedIncomeTotal, monthlyIncomeTotal, deleteTransaction } =
    useContext(TransactionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(8);
  const [activeFilter, setActiveFilter] = useState('description');
  const [search, setSearch] = useState('');
  const [searchedTransactions, setSearchedTransanctions] = useState<IncomeTransacion[]>([]);

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens =
    search.length > 0
      ? searchedTransactions.slice(indexOfFirstItem, indexOfLastItem)
      : incomeValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    if (search.length >= 1) {
      const transactions = incomeValues.filter((transaction) =>
        String(transaction[activeFilter]).toUpperCase().includes(search.toUpperCase())
      );
      setSearchedTransanctions(transactions);
      setCurrentPage(1);
      return;
    }
    setCurrentPage(1);
    setSearchedTransanctions([]);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

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
        <NewTransactionForm method="post" type="income" triggerText="Novo Valor de Entrada" />
      </S.ElementsContainer>
      <S.FiltersContainers>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="date"
          className={activeFilter === 'date' ? 'activeFilter' : ''}
        >
          Data
        </S.FilterItem>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="description"
          className={activeFilter === 'description' ? 'activeFilter' : ''}
        >
          Descrição
        </S.FilterItem>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="origin"
          className={activeFilter === 'origin' ? 'activeFilter' : ''}
        >
          Procedência
        </S.FilterItem>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="value"
          className={activeFilter === 'value' ? 'activeFilter' : ''}
        >
          Valor
        </S.FilterItem>
      </S.FiltersContainers>
      <S.SearchTransactionForm>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Digite sua pesquisa aqui!"
        />
      </S.SearchTransactionForm>
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
          {currentItens.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{format(new Date(transaction.date), 'dd/MM/yyyy')}</td>
                <td>{transaction.description}</td>
                <td>{transaction.origin}</td>
                <td>{formatMonetary(transaction.value)}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => {
                      deleteTransaction('income', transaction.id);
                    }}
                  >
                    <P.Trash size={32} />
                  </button>
                </td>
                <td>
                  <UpdateTransactionForm method="put" type="income" transaction={transaction} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.IncomeValuesTable>
      <Pagination
        currentPage={currentPage}
        itensPerPage={itensPerPage}
        totalItens={
          searchedTransactions.length === 0 ? incomeValues.length : searchedTransactions.length
        }
        paginate={paginate}
      />
    </S.Container>
  );
}
