import { differenceInCalendarMonths, differenceInMonths } from "date-fns";
import { CreateOutcomeTransaction } from "../types/TransactionTypes";
import { fetchChartOutcomeTransactions } from "../services/firestoreDatabase";

type totalOutcomeTypesArrayProps = {
  name: string;
  value: number;
}[];

export const totalOutcomeTypes = (
  outcomeValues: CreateOutcomeTransaction[]
) => {
  const totalOutcomeTypesArray = outcomeValues.reduce(
    (acc: totalOutcomeTypesArrayProps, value: CreateOutcomeTransaction) => {
      const typeExists = acc.some(
        (element, index) => element.name === value.type
      );
      if (typeExists) {
        acc.forEach((element) => {
          if (element.name === value.type) {
            element.value += value.value / value.installment;
          }
        });
        return acc;
      }

      acc.push({ name: value.type, value: value.value / value.installment });

      return acc;
    },
    []
  );
  return totalOutcomeTypesArray.sort((a, b) => a.value - b.value);
};

export const totalOutcomePerMonth = async (userUid: string) => {
  const data = await fetchChartOutcomeTransactions(userUid);
  const thisYear = new Date().getFullYear();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const resultArray = [
    { name: "Janeiro", total: 0 },
    { name: "Fevereiro", total: 0 },
    { name: "Março", total: 0 },
    { name: "Abril", total: 0 },
    { name: "Maio", total: 0 },
    { name: "Junho", total: 0 },
    { name: "Julho", total: 0 },
    { name: "Agosto", total: 0 },
    { name: "Setembro", total: 0 },
    { name: "Outubro", total: 0 },
    { name: "Novembro", total: 0 },
    { name: "Dezembro", total: 0 },
  ];

  for (let i = 0; i <= monthNames.length; i++) {
    // if (resultArray[i].name === "Abril") {
    //   debugger;
    // }
    const filteredTransations = data.filter(
      (transaction: CreateOutcomeTransaction) => {
        const datesDifference = differenceInCalendarMonths(
          new Date(thisYear, i, 1),
          new Date(
            new Date(transaction.date).getFullYear(),
            new Date(transaction.date).getMonth(),
            new Date(transaction.date).getDate()
          )
        );

        const ocorringPurchase =
          datesDifference >= 0 && datesDifference <= transaction.installment;
        const paidPurchase = datesDifference > transaction.installment - 1;
        const beyondThisYear = i <= 11;
        return ocorringPurchase && !paidPurchase && beyondThisYear;
      }
    );

    if (filteredTransations.length > 0) {
      const monthTotal = filteredTransations.reduce(
        (acc: number, transaction: CreateOutcomeTransaction) => {
          acc += transaction.value / transaction.installment;
          return acc;
        },
        0
      );

      resultArray[i].total = monthTotal;
    }
  }

  return resultArray;
};

export const fillCells = (
  index: number,
  array: { name: string; value: number }[]
) => {
  const red = (index / array.length) * 100 >= 75;
  const yellow =
    (index / array.length) * 100 < 75 && (index / array.length) * 100 > 25;
  const green = (index / array.length) * 100 <= 25;

  if (red) {
    return "#DB5461";
  }

  if (yellow) {
    return "#F7DC6F";
  }

  if (green) {
    return "#82E0AA";
  }
};

// export const getColors = (outcomeValues: CreateOutcomeTransaction[]) => {
//   // const colors = [] as string[]
//   // const totalOutcomeTypesArray = totalOutcomeTypes(outcomeValues)
//   // totalOutcomeTypesArray.forEach(() => {
//   //   colors.push(`#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`)
//   // })

//   const colors = ['#DB5461', '#F7DC6F', '#82E0AA']
//   return colors.reverse()
// }
