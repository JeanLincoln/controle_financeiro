import { Card } from '../components/Card'
import * as S from '../styles/pages/Saidas'
import * as P from 'phosphor-react'
import { MonthSelector } from '../components/MonthSelector'
import { useContext, useState, ChangeEvent, useEffect } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { NewTransactionForm } from '../components/Dialog/NewTransaction'
import { format, differenceInMonths, addMonths } from 'date-fns'
import { FilterMonthDate, TransactionDate } from '../utils/DatesValidation'
import { formatMonetary } from '../utils/FormatMonetaryValues'
import { Pagination } from '../components/Pagination'
import { UpdateTransactionForm } from '../components/Dialog/UpdateTransaction'
import { OutcomeTransaction, OutcomeSearchProps } from '../types/TransactionTypes'
import { SearchTransactions } from '../components/SearchTransactions'
import { handleOutcomeSearch } from '../utils/HandleSearch'
import { Loading } from '../components/Loading'

export default function ValoresDeSaida() {
  const {
    loading,
    outcomeValues,
    fixedOutcomeTotal,
    monthlyOutcomeTotal,
    deleteTransaction,
    filterMonth,
  } = useContext(TransactionsContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [itensPerPage] = useState(8)
  const [search, setSearch] = useState<OutcomeSearchProps>({})
  const [searchedTransactions, setSearchedTransanctions] = useState<OutcomeTransaction[]>([])

  const indexOfLastItem = currentPage * itensPerPage
  const indexOfFirstItem = indexOfLastItem - itensPerPage
  const currentItens = search
    ? searchedTransactions.slice(indexOfFirstItem, indexOfLastItem)
    : outcomeValues.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const clearSearchedTransanctions = () => setSearchedTransanctions([])
  const insertSearchedTransanctions = (transactions: OutcomeTransaction[]) =>
    setSearchedTransanctions(transactions)
  const insertSearch = (
    filter: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => setSearch((state) => ({ ...state, [filter]: event.target.value }))

  const handleTransactions = () => {
    const searchIsEmpty = Object.values(search).every((value) => value === '')

    if (!searchIsEmpty && currentItens.length > 0) {
      return (
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
                        deleteTransaction('outcome', transaction.id)
                      }}
                    >
                      <P.Trash size={25} />
                    </button>
                  </td>
                  <td>
                    <UpdateTransactionForm method="put" type="outcome" transaction={transaction} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </S.OutputValuesTable>
      )
    }

    if (searchIsEmpty) {
      return (
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
                        deleteTransaction('outcome', transaction.id)
                      }}
                    >
                      <P.Trash size={25} />
                    </button>
                  </td>
                  <td>
                    <UpdateTransactionForm method="put" type="outcome" transaction={transaction} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </S.OutputValuesTable>
      )
    }

    return <div>Nenhum lancamento encontrado!</div>
  }

  useEffect(() => {
    setCurrentPage(1)
    handleOutcomeSearch({
      searchFilters: search,
      clearSearchedTransanctions: clearSearchedTransanctions,
      insertSearchedTransanctions: insertSearchedTransanctions,
      transactionValues: outcomeValues,
    })
  }, [search, outcomeValues])

  const CalculateActualInstallment = (date: Date) => {
    const datesDifference = differenceInMonths(FilterMonthDate(filterMonth), TransactionDate(date))

    return datesDifference + 1
  }

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
          <h2>{loading ? <Loading /> : formatMonetary(monthlyOutcomeTotal())}</h2>
        </Card>
        <P.Equals size={32} />
        <Card>
          <div>
            <span>Total de Saídas</span>
            <P.ArrowCircleDown size={32} color="#f75a68" />
          </div>
          <h2>
            {loading ? <Loading /> : formatMonetary(fixedOutcomeTotal() + monthlyOutcomeTotal())}
          </h2>
        </Card>
        <NewTransactionForm method="post" type="outcome" triggerText="Novo Valor de Saída" />
      </S.ElementsContainer>
      <SearchTransactions transactionType="outcome" insertSearch={insertSearch} />
      {loading ? <Loading /> : handleTransactions()}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          itensPerPage={itensPerPage}
          totalItens={
            searchedTransactions.length === 0 ? outcomeValues.length : searchedTransactions.length
          }
          paginate={paginate}
        />
      )}
    </S.Container>
  )
}
