import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';

export const useTransaction = () => {
  const context = useContext(TransactionsContext);
  return context;
};
