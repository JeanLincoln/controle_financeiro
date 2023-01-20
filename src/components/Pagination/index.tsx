import * as S from '../../styles/components/Pagination';

type PaginationProps = {
  currentPage: number;
  itensPerPage: number;
  totalItens: number;
  paginate: (number: number) => void;
};

export const Pagination = ({
  currentPage,
  itensPerPage,
  totalItens,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItens / itensPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <S.PaginationContainer>
      <S.PaginationList>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={currentPage === number ? 'active' : ''}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </S.PaginationList>
    </S.PaginationContainer>
  );
};
