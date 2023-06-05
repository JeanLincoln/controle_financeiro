import { Card } from "../components/Card";
import * as S from "../styles/pages/Saidas";
import * as P from "phosphor-react";
import { MonthSelector } from "../components/MonthSelector";
import { useContext, useState, ChangeEvent, useEffect } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { NewTransactionForm } from "../components/Dialog/NewTransaction";
import { format, differenceInMonths, addMonths } from "date-fns";
import { FilterMonthDate, TransactionDate } from "../utils/DatesValidation";
import { formatMonetary } from "../utils/FormatMonetaryValues";
import { Pagination } from "../components/Pagination";
import { UpdateTransactionForm } from "../components/Dialog/UpdateTransaction";
import {
  CreateOutcomeTransaction,
  OutcomeSearchProps,
} from "../types/TransactionTypes";
import { SearchTransactions } from "../components/SearchTransactions";
import { handleOutcomeSearch } from "../utils/HandleSearch";
import { Loading } from "../components/Loading";
import OutcomeTransactionItem from "../components/TransactionsItems/OutcomeTransactionItem";

export default function ValoresDeSaida() {
  const {
    loading,
    outcomeValues,
    fixedOutcomeTotal,
    monthlyOutcomeTotal,
    deleteTransaction,
    filterMonth,
  } = useContext(TransactionsContext);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(8);
  const [search, setSearch] = useState<OutcomeSearchProps>({
    dateFilter: "",
    descriptionFilter: "",
    methodFilter: "",
    typeFilter: "",
    paymentFormFilter: "",
    installmentFilter: "",
    valueFilter: "",
  });
  const [searchedTransactions, setSearchedTransanctions] = useState<
    CreateOutcomeTransaction[]
  >([]);

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens = search
    ? searchedTransactions.slice(indexOfFirstItem, indexOfLastItem)
    : outcomeValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const clearSearchedTransanctions = () => setSearchedTransanctions([]);
  const insertSearchedTransanctions = (
    transactions: CreateOutcomeTransaction[]
  ) => setSearchedTransanctions(transactions);
  const insertSearch = (
    filter: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => setSearch((state) => ({ ...state, [filter]: event.target.value }));

  const handleTransactions = () => {
    if (currentItens.length > 0) {
      return <OutcomeTransactionItem currentItens={currentItens} />;
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
    handleOutcomeSearch({
      searchFilters: search,
      clearSearchedTransanctions: clearSearchedTransanctions,
      insertSearchedTransanctions: insertSearchedTransanctions,
      transactionValues: outcomeValues,
    });
  }, [search, outcomeValues]);

  const CalculateActualInstallment = (date: Date) => {
    const datesDifference = differenceInMonths(
      FilterMonthDate(filterMonth),
      TransactionDate(date)
    );

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
          <h2>{loading ? <Loading /> : formatMonetary(fixedOutcomeTotal())}</h2>
        </Card>
        <P.PlusCircle size={32} />
        <Card>
          <div>
            <span>Saídas Mensais</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>
            {loading ? <Loading /> : formatMonetary(monthlyOutcomeTotal())}
          </h2>
        </Card>
        <P.Equals size={32} />
        <Card>
          <div>
            <span>Total de Saídas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>
            {loading ? (
              <Loading />
            ) : (
              formatMonetary(fixedOutcomeTotal() + monthlyOutcomeTotal())
            )}
          </h2>
        </Card>
        <NewTransactionForm
          method="post"
          type="outcome"
          triggerText="Novo Valor de Saída"
        />
      </S.ElementsContainer>
      <SearchTransactions
        transactionType="outcome"
        insertSearch={insertSearch}
      />
      <>{loading ? <Loading /> : handleTransactions()}</>
      {!loading && currentItens.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itensPerPage={itensPerPage}
          totalItens={
            searchedTransactions.length === 0
              ? outcomeValues.length
              : searchedTransactions.length
          }
          paginate={paginate}
        />
      )}
    </S.Container>
  );
}
