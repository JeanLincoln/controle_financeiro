import { Card } from '../components/Card'
import * as S from '../styles/pages/Fixos'
import * as P from 'phosphor-react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { NewTransactionForm } from '../components/Dialog/NewTransaction'
import { format } from 'date-fns'
import { formatMonetary } from '../utils/FormatMonetaryValues'
import { Pagination } from '../components/Pagination'
import { UpdateTransactionForm } from '../components/Dialog/UpdateTransaction'
import { FixedSearchProps, FixedValues } from '../types/TransactionTypes'
import { handlefixedSearch } from '../utils/HandleSearch'
import { SearchTransactions } from '../components/SearchTransactions'

export default function ValoresDeEntrada() {
  const { fixedValues, deleteTransaction } = useContext(TransactionsContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [itensPerPage] = useState(6)
  const [search, setSearch] = useState<FixedSearchProps>({})
  const [searchedTransactions, setSearchedTransanctions] = useState<FixedValues[]>([])

  const FixedSubTotal = (type: string) => {
    if (type === 'incomes') {
      const fixedIncomeSubTotal = fixedValues.reduce((acc, fixedValue) => {
        acc = fixedValue.type === 'Entrada' ? (acc += fixedValue.value) : (acc += 0)
        return acc
      }, 0)
      return formatMonetary(fixedIncomeSubTotal)
    } else {
      const fixedOutcomeSubTotal = fixedValues.reduce((acc, fixedValue) => {
        acc = fixedValue.type === 'Saída' ? (acc += fixedValue.value) : (acc += 0)
        return acc
      }, 0)
      return formatMonetary(fixedOutcomeSubTotal)
    }
  }

  const indexOfLastItem = currentPage * itensPerPage
  const indexOfFirstItem = indexOfLastItem - itensPerPage
  const currentItens = search
    ? searchedTransactions.slice(indexOfFirstItem, indexOfLastItem)
    : fixedValues.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const clearSearchedTransanctions = () => setSearchedTransanctions([])
  const insertSearchedTransanctions = (transactions: FixedValues[]) =>
    setSearchedTransanctions(transactions)
  const insertSearch = (
    filter: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => setSearch((state) => ({ ...state, [filter]: event.target.value }))

  const handleTransactions = () => {
    if (search && currentItens.length > 0) {
      return (
        <S.FixedValuesTable>
          <thead>
            <tr>
              <th>Data de inicio</th>
              <th>Data de fim</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {currentItens.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>{format(new Date(transaction.initialDate), 'dd/MM/yyyy')}</td>
                  <td>
                    {transaction.finalDate
                      ? format(new Date(transaction.finalDate), 'dd/MM/yyyy')
                      : 'Não determinado'}
                  </td>
                  <td>{transaction.description}</td>
                  <td>
                    <S.TransactionType
                      transactionType={transaction.type === 'Entrada' ? 'income' : 'outcome'}
                    >
                      {transaction.type}
                    </S.TransactionType>
                  </td>
                  <td>
                    <S.TransactionValue
                      transactionType={transaction.type === 'Entrada' ? 'income' : 'outcome'}
                    >
                      {formatMonetary(transaction.value)}
                    </S.TransactionValue>
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => {
                        deleteTransaction('fixed', transaction.id)
                      }}
                    >
                      <P.Trash size={32} />
                    </button>
                  </td>
                  <td>
                    <UpdateTransactionForm method="put" type="fixed" transaction={transaction} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </S.FixedValuesTable>
      )
    }

    if (!search && currentItens.length === 0) {
      return (
        <S.FixedValuesTable>
          <thead>
            <tr>
              <th>Data de inicio</th>
              <th>Data de fim</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {currentItens.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>{format(new Date(transaction.initialDate), 'dd/MM/yyyy')}</td>
                  <td>
                    {transaction.finalDate
                      ? format(new Date(transaction.finalDate), 'dd/MM/yyyy')
                      : 'Não determinado'}
                  </td>
                  <td>{transaction.description}</td>
                  <td>
                    <S.TransactionType
                      transactionType={transaction.type === 'Entrada' ? 'income' : 'outcome'}
                    >
                      {transaction.type}
                    </S.TransactionType>
                  </td>
                  <td>
                    <S.TransactionValue
                      transactionType={transaction.type === 'Entrada' ? 'income' : 'outcome'}
                    >
                      {formatMonetary(transaction.value)}
                    </S.TransactionValue>
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => {
                        deleteTransaction('fixed', transaction.id)
                      }}
                    >
                      <P.Trash size={32} />
                    </button>
                  </td>
                  <td>
                    <UpdateTransactionForm method="put" type="fixed" transaction={transaction} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </S.FixedValuesTable>
      )
    }

    return <div>Nenhum lancamento encontrado!</div>
  }

  useEffect(() => {
    setCurrentPage(1)
    handlefixedSearch({
      searchFilters: search,
      clearSearchedTransanctions: clearSearchedTransanctions,
      insertSearchedTransanctions: insertSearchedTransanctions,
      transactionValues: fixedValues,
    })
  }, [search, fixedValues])

  return (
    <S.Container>
      <S.ElementsContainer>
        <S.CardsContainer>
          <Card>
            <div>
              <span>Entradas Fixas</span>
              <P.Infinity size={32} color="#00b37e" />
            </div>
            <S.VariantSubTotal subTotalType="positive">
              {FixedSubTotal('incomes')}
            </S.VariantSubTotal>
          </Card>
          <Card>
            <div>
              <span>Saídas Fixas</span>
              <P.Infinity size={32} color="#f75a68" />
            </div>
            <S.VariantSubTotal subTotalType="negative">
              - {FixedSubTotal('outcomes')}
            </S.VariantSubTotal>
          </Card>
        </S.CardsContainer>
        <NewTransactionForm method="post" type="fixed" triggerText="Novo Valor Fixo" />
      </S.ElementsContainer>
      <SearchTransactions transactionType="fixed" insertSearch={insertSearch} />
      {handleTransactions()}
      <Pagination
        currentPage={currentPage}
        itensPerPage={itensPerPage}
        totalItens={
          searchedTransactions.length === 0 ? fixedValues.length : searchedTransactions.length
        }
        paginate={paginate}
      />
    </S.Container>
  )
}
