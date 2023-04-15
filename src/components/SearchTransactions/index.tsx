import { ChangeEvent } from 'react'
import * as S from '../../styles/components/SearchTransactions'

type SearchTransactionsProps = {
  transactionType: 'income' | 'outcome' | 'fixed'
  insertSearch: (
    filter: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void
}

export const SearchTransactions = ({ insertSearch, transactionType }: SearchTransactionsProps) => {
  const handleTransactionType = () => {
    if (transactionType === 'outcome') {
      return (
        <>
          <S.ItemGroup>
            <label htmlFor="">Data</label>
            <input onChange={(e) => insertSearch('dateFilter', e)} type="date" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Descricão</label>
            <input onChange={(e) => insertSearch('descriptionFilter', e)} type="text" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Método</label>
            <select onChange={(e) => insertSearch('methodFilter', e)}>
              <option value=""></option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Pix">Pix</option>
              <option value="Boleto">Boleto</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Tipo</label>
            <select onChange={(e) => insertSearch('typeFilter', e)}>
              <option value=""></option>
              <option value="Alcool">Alcool</option>
              <option value="Casa">Casa</option>
              <option value="Vestimenta">Curso/Estudo</option>
              <option value="Comida">Comida</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Jogos">Jogos</option>
              <option value="Lazer">Lazer</option>
              <option value="Locomoção">Locomoção</option>
              <option value="Musculação">Musculação</option>
              <option value="Presente">Presente</option>
              <option value="Saúde/Remedios">Saúde/Remedios</option>
              <option value="Vestimenta">Vestimenta</option>
            </select>
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Forma de pagamento</label>
            <select onChange={(e) => insertSearch('paymentFormFilter', e)}>
              <option value=""></option>
              <option value="Crédito à vista">Crédito à vista</option>
              <option value="Crédito parcelado">Crédito parcelado</option>
              <option value="Débito">Débito</option>
            </select>
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Parcelas</label>
            <input onChange={(e) => insertSearch('installmentFilter', e)} type="number" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Valor da compra</label>
            <input onChange={(e) => insertSearch('valueFilter', e)} type="number" />
          </S.ItemGroup>
        </>
      )
    }

    if (transactionType === 'income') {
      return (
        <>
          <S.ItemGroup>
            <label htmlFor="">Data</label>
            <input onChange={(e) => insertSearch('dateFilter', e)} type="date" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Descricão</label>
            <input onChange={(e) => insertSearch('descriptionFilter', e)} type="text" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Procedência</label>
            <input onChange={(e) => insertSearch('originFilter', e)} type="text" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Valor</label>
            <input onChange={(e) => insertSearch('valueFilter', e)} type="number" />
          </S.ItemGroup>
        </>
      )
    }

    if (transactionType === 'fixed') {
      return (
        <>
          <S.ItemGroup>
            <label htmlFor="">Data de inicio</label>
            <input onChange={(e) => insertSearch('initialDateFilter', e)} type="date" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Descricão</label>
            <input onChange={(e) => insertSearch('descriptionFilter', e)} type="text" />
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Tipo</label>
            <select onChange={(e) => insertSearch('typeFilter', e)}>
              <option value=""></option>
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </S.ItemGroup>
          <S.ItemGroup>
            <label htmlFor="">Valor</label>
            <input onChange={(e) => insertSearch('valueFilter', e)} type="number" />
          </S.ItemGroup>
        </>
      )
    }

    return <h1>FILTRO NÃO DESENVOLVIDO.</h1>
  }

  return (
    <>
      <S.FiltersContainers>{handleTransactionType()}</S.FiltersContainers>
    </>
  )
}
