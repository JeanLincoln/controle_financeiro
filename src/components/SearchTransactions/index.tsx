import { Dispatch, SetStateAction, useState } from 'react'
import * as S from '../../styles/components/SearchTransactions'

type SearchProps = {
  dateFilter: string
  descriptionFilter: string
  methodFilter: string
  typeFilter: string
  paymentFormFilter: string
  installmentFilter: number
  valueFilter: number
}

type SearchTransactionsProps = {
  setSearch: Dispatch<SetStateAction<SearchProps>>
}

export const SearchTransactions = ({ setSearch }: SearchTransactionsProps) => {
  return (
    <>
      <S.FiltersContainers>
        <S.ItemGroup>
          <label htmlFor="">Data</label>
          <input
            onChange={(e) => setSearch((state) => ({ ...state, dateFilter: e.target.value }))}
            type="date"
          />
        </S.ItemGroup>
        <S.ItemGroup>
          <label htmlFor="">Descricão</label>
          <input
            onChange={(e) =>
              setSearch((state) => ({ ...state, descriptionFilter: e.target.value }))
            }
            type="text"
          />
        </S.ItemGroup>
        <S.ItemGroup>
          <label htmlFor="">Método</label>
          <select
            onChange={(e) => setSearch((state) => ({ ...state, methodFilter: e.target.value }))}
          >
            <option value=""></option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Pix">Pix</option>
            <option value="Boleto">Boleto</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </S.ItemGroup>
        <S.ItemGroup>
          <label htmlFor="">Tipo</label>
          <select
            onChange={(e) => setSearch((state) => ({ ...state, typeFilter: e.target.value }))}
          >
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
          <select
            onChange={(e) =>
              setSearch((state) => ({ ...state, paymentFormFilter: e.target.value }))
            }
          >
            <option value=""></option>
            <option value="Crédito à vista">Crédito à vista</option>
            <option value="Crédito parcelado">Crédito parcelado</option>
            <option value="Débito">Débito</option>
          </select>
        </S.ItemGroup>
        <S.ItemGroup>
          <label htmlFor="">Parcelas</label>
          <input
            onChange={(e) =>
              setSearch((state) => ({ ...state, installmentFilter: Number(e.target.value) }))
            }
            type="number"
          />
        </S.ItemGroup>
        <S.ItemGroup>
          <label htmlFor="">Valor da compra</label>
          <input
            onChange={(e) =>
              setSearch((state) => ({ ...state, valueFilter: Number(e.target.value) }))
            }
            type="number"
          />
        </S.ItemGroup>
      </S.FiltersContainers>
    </>
  )
}
