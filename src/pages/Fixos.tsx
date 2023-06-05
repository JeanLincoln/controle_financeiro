import { Card } from "../components/Card";
import * as S from "../styles/pages/Fixos";
import * as P from "phosphor-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { NewTransactionForm } from "../components/Dialog/NewTransaction";
import { formatMonetary } from "../utils/FormatMonetaryValues";
import { Pagination } from "../components/Pagination";
import { FixedSearchProps, CreateFixedValues } from "../types/TransactionTypes";
import { handlefixedSearch } from "../utils/HandleSearch";
import { SearchTransactions } from "../components/SearchTransactions";
import { Loading } from "../components/Loading";
import { MonthSelector } from "../components/MonthSelector";
import FixedValuesItem from "../components/TransactionsItems/FixedValuesItem";

export default function ValoresDeEntrada() {
  const {
    loading,
    fixedValues,
    fixedIncomeTotal,
    fixedOutcomeTotal,
    deleteTransaction,
  } = useContext(TransactionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage] = useState(7);
  const [search, setSearch] = useState<FixedSearchProps>({
    initialDateFilter: "",
    finalDateFilter: "",
    descriptionFilter: "",
    typeFilter: "",
    valueFilter: "",
  });
  const [searchedTransactions, setSearchedTransanctions] = useState<
    CreateFixedValues[]
  >([]);

  const indexOfLastItem = currentPage * itensPerPage;
  const indexOfFirstItem = indexOfLastItem - itensPerPage;
  const currentItens = search
    ? searchedTransactions.slice(indexOfFirstItem, indexOfLastItem)
    : fixedValues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const clearSearchedTransanctions = () => setSearchedTransanctions([]);
  const insertSearchedTransanctions = (transactions: CreateFixedValues[]) =>
    setSearchedTransanctions(transactions);
  const insertSearch = (
    filter: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => setSearch((state) => ({ ...state, [filter]: event.target.value }));

  const handleTransactions = () => {
    if (currentItens.length > 0) {
      return <FixedValuesItem currentItens={currentItens} />;
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
    handlefixedSearch({
      searchFilters: search,
      clearSearchedTransanctions: clearSearchedTransanctions,
      insertSearchedTransanctions: insertSearchedTransanctions,
      transactionValues: fixedValues,
    });
  }, [search, fixedValues]);

  return (
    <S.Container>
      <S.ElementsContainer>
        <MonthSelector setCurrentPage={setCurrentPage} />
        <S.CardsContainer>
          <Card>
            <div>
              <span>Entradas Fixas</span>
              <P.Infinity size={32} color="#00b37e" />
            </div>
            <S.VariantSubTotal subTotalType="positive">
              {loading ? <Loading /> : formatMonetary(fixedIncomeTotal())}
            </S.VariantSubTotal>
          </Card>
          <Card>
            <div>
              <span>Saídas Fixas</span>
              <P.Infinity size={32} color="#f75a68" />
            </div>
            <S.VariantSubTotal subTotalType="negative">
              {loading ? (
                <Loading />
              ) : (
                <> - {formatMonetary(fixedOutcomeTotal())}</>
              )}
            </S.VariantSubTotal>
          </Card>
        </S.CardsContainer>
        <NewTransactionForm
          method="post"
          type="fixed"
          triggerText="Novo Valor Fixo"
        />
      </S.ElementsContainer>
      <SearchTransactions transactionType="fixed" insertSearch={insertSearch} />
      {loading ? <Loading /> : handleTransactions()}
      {!loading && currentItens.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itensPerPage={itensPerPage}
          totalItens={
            searchedTransactions.length === 0
              ? fixedValues.length
              : searchedTransactions.length
          }
          paginate={paginate}
        />
      )}
    </S.Container>
  );
}
