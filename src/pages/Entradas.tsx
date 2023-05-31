import { Card } from "../components/Card";
import * as S from "../styles/pages/Entradas";
import * as P from "phosphor-react";
import { MonthSelector } from "../components/MonthSelector";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { NewTransactionForm } from "../components/Dialog/NewTransaction";
import { format } from "date-fns";
import { formatMonetary } from "../utils/FormatMonetaryValues";
import { Pagination } from "../components/Pagination";
import { UpdateTransactionForm } from "../components/Dialog/UpdateTransaction";
import {
  IncomeSearchProps,
  CreateIncomeTransaction,
} from "../types/TransactionTypes";
import { SearchTransactions } from "../components/SearchTransactions";
import { handleIncomeSearch } from "../utils/HandleSearch";
import { Loading } from "../components/Loading";

export default function ValoresDeEntrada() {
  const {
    loading,
    incomeValues,
    fixedIncomeTotal,
    monthlyIncomeTotal,
    deleteTransaction,
  } = useContext(TransactionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(8);
  const [search, setSearch] = useState<IncomeSearchProps>({
    dateFilter: "",
    descriptionFilter: "",
    originFilter: "",
    valueFilter: "",
  });
  const [searchedTransactions, setSearchedTransanctions] = useState<
    CreateIncomeTransaction[]
  >([]);

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens = search
    ? searchedTransactions.slice(indexOfFirstItem, indexOfLastItem)
    : incomeValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const clearSearchedTransanctions = () => setSearchedTransanctions([]);
  const insertSearchedTransanctions = (
    transactions: CreateIncomeTransaction[]
  ) => setSearchedTransanctions(transactions);
  const insertSearch = (
    filter: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => setSearch((state) => ({ ...state, [filter]: event.target.value }));

  const handleTransactions = () => {
    const searchIsEmpty = Object.values(search).every((value) => value === "");

    console.log(searchIsEmpty, currentItens.length);

    if (!searchIsEmpty && currentItens.length > 0) {
      return (
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
                  <td>{format(new Date(transaction.date), "dd/MM/yyyy")}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.origin}</td>
                  <td>{formatMonetary(transaction.value)}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => {
                        deleteTransaction("income", transaction.id);
                      }}
                    >
                      <P.Trash size={32} />
                    </button>
                  </td>
                  <td>
                    <UpdateTransactionForm
                      method="put"
                      type="income"
                      transaction={transaction}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </S.IncomeValuesTable>
      );
    }

    if (searchIsEmpty && currentItens.length > 0) {
      return (
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
                  <td>{format(new Date(transaction.date), "dd/MM/yyyy")}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.origin}</td>
                  <td>{formatMonetary(transaction.value)}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => {
                        deleteTransaction("income", transaction.id);
                      }}
                    >
                      <P.Trash size={32} />
                    </button>
                  </td>
                  <td>
                    <UpdateTransactionForm
                      method="put"
                      type="income"
                      transaction={transaction}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </S.IncomeValuesTable>
      );
    }

    return (
      <div>
        <P.MaskSad className="noTransactions" size={180} />
        <h3>
          Não foi encontrada nenhuma transação, cadastre uma nova transação ou
          verifique sua pesquisa!
        </h3>
      </div>
    );
  };

  useEffect(() => {
    setCurrentPage(1);
    handleIncomeSearch({
      searchFilters: search,
      clearSearchedTransanctions: clearSearchedTransanctions,
      insertSearchedTransanctions: insertSearchedTransanctions,
      transactionValues: incomeValues,
    });
  }, [search, incomeValues]);

  return (
    <S.Container>
      <S.ElementsContainer>
        <MonthSelector setCurrentPage={setCurrentPage} />
        <Card>
          <div>
            <span>Entradas Fixas</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>{loading ? <Loading /> : formatMonetary(fixedIncomeTotal())}</h2>
        </Card>
        <P.PlusCircle size={32} />
        <Card>
          <div>
            <span>Entradas Mensais</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>
            {loading ? <Loading /> : formatMonetary(monthlyIncomeTotal())}
          </h2>
        </Card>
        <P.Equals size={32} />
        <Card>
          <div>
            <span>Total de entradas</span>
            <P.ArrowCircleUp size={32} color="#00b37e" />
          </div>
          <h2>
            {loading ? (
              <Loading />
            ) : (
              formatMonetary(fixedIncomeTotal() + monthlyIncomeTotal())
            )}
          </h2>
        </Card>
        <NewTransactionForm
          method="post"
          type="income"
          triggerText="Novo Valor de Entrada"
        />
      </S.ElementsContainer>
      <SearchTransactions
        transactionType="income"
        insertSearch={insertSearch}
      />
      <S.Content>{loading ? <Loading /> : handleTransactions()}</S.Content>
      {!loading && currentItens.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itensPerPage={itensPerPage}
          totalItens={
            searchedTransactions.length === 0
              ? incomeValues.length
              : searchedTransactions.length
          }
          paginate={paginate}
        />
      )}
    </S.Container>
  );
}
