import { Card } from '../components/Card';
import * as S from '../styles/pages/Saidas';
import * as P from 'phosphor-react';
import { MonthSelector } from '../components/MonthSelector';
import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { NewTransactionForm } from '../components/Dialog/NewTransaction';
import { format, differenceInMonths, addMonths } from 'date-fns';
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation';
import { formatMonetary } from '../utils/FormatMonetaryValues';
import { Pagination } from '../components/Pagination';
import { UpdateTransactionForm } from '../components/Dialog/UpdateTransaction';
import { OutcomeTransaction } from '../types/TransactionTypes';

export default function ValoresDeSaida() {
  const { outcomeValues, fixedOutcomeTotal, monthlyOutcomeTotal, deleteTransaction, filterMonth } =
    useContext(TransactionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(8);
  const [activeFilter, setActiveFilter] = useState('description');
  const [search, setSearch] = useState('');
  const [searchedTransactions, setSearchedTransanctions] = useState<OutcomeTransaction[]>([]);

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens =
    search.length > 0
      ? searchedTransactions.slice(indexOfFirstItem, indexOfLastItem)
      : outcomeValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    if (search.length >= 1) {
      const transactions = outcomeValues.filter((transaction) =>
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

  const CalculateActualInstallment = (date: Date) => {
    const datesDifference = differenceInMonths(FilterMonthDate(filterMonth), TransactionDate(date));

    return datesDifference + 1;
  };

  return (
    <S.Container>
      <S.ElementsContainer>
        <MonthSelector setCurrentPage={setCurrentPage} />
        <Card>
          <div>
            <span>Saídas Fixas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{formatMonetary(fixedOutcomeTotal())}</h2>
        </Card>
        <P.PlusCircle size={32} />
        <Card>
          <div>
            <span>Saídas Mensais</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{formatMonetary(monthlyOutcomeTotal())}</h2>
        </Card>
        <P.Equals size={32} />
        <Card>
          <div>
            <span>Total de Saídas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>{formatMonetary(fixedOutcomeTotal() + monthlyOutcomeTotal())}</h2>
        </Card>
        <NewTransactionForm method="post" type="outcome" triggerText="Novo Valor de Saída" />
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
          value="method"
          className={activeFilter === 'method' ? 'activeFilter' : ''}
        >
          Método
        </S.FilterItem>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="type"
          className={activeFilter === 'type' ? 'activeFilter' : ''}
        >
          Tipo
        </S.FilterItem>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="paymentForm"
          className={activeFilter === 'paymentForm' ? 'activeFilter' : ''}
        >
          Forma de pagamento
        </S.FilterItem>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="installment"
          className={activeFilter === 'installment' ? 'activeFilter' : ''}
        >
          Parcelas
        </S.FilterItem>
        <S.FilterItem
          onClick={(e) => setActiveFilter((e.target as HTMLInputElement).value)}
          value="value"
          className={activeFilter === 'value' ? 'activeFilter' : ''}
        >
          Valor da compra
        </S.FilterItem>
      </S.FiltersContainers>
      <S.SearchTransactionForm>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Digite sua pesquisa aqui!"
        />
      </S.SearchTransactionForm>
      <S.OutputValuesTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Finaliza em</th>
            <th>Descrição</th>
            <th>Método</th>
            <th>Tipo</th>
            <th>Forma de pagamento</th>
            <th>Parcelas</th>
            <th>Parcela Atual</th>
            <th>Valor da parcela</th>
            <th>Valor da compra</th>
            <th>Valor restante da compra</th>
          </tr>
        </thead>
        <tbody>
          {currentItens.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{format(new Date(transaction.date), 'dd/MM/yyyy')}</td>
                <td>
                  {transaction.installment !== 1
                    ? format(
                        addMonths(new Date(transaction.date), transaction.installment),
                        'dd/MM/yyyy'
                      )
                    : format(new Date(transaction.date), 'dd/MM/yyyy')}
                </td>
                <td>{transaction.description}</td>
                <td>{transaction.method}</td>
                <td>{transaction.type}</td>
                <td>{transaction.paymentForm}</td>
                <td>{transaction.installment}</td>
                <td>{CalculateActualInstallment(transaction.date)}</td>
                <td>{formatMonetary(transaction.value / transaction.installment)}</td>
                <td>{formatMonetary(transaction.value)}</td>
                <td>
                  {formatMonetary(
                    transaction.value -
                      (transaction.value / transaction.installment) *
                        CalculateActualInstallment(transaction.date)
                  )}
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => {
                      deleteTransaction('outcome', transaction.id);
                    }}
                  >
                    <P.Trash size={25} />
                  </button>
                </td>
                <td>
                  <UpdateTransactionForm method="put" type="outcome" transaction={transaction} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.OutputValuesTable>
      <Pagination
        currentPage={currentPage}
        itensPerPage={itensPerPage}
        totalItens={
          searchedTransactions.length === 0 ? outcomeValues.length : searchedTransactions.length
        }
        paginate={paginate}
      />
    </S.Container>
  );
}
