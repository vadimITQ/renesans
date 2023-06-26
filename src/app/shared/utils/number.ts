export function covertToSeparatedNumber(number: number): string {
  const [integerPart, decimalPart] = number.toFixed(2).split('.');

  const preparedIntegerPart = integerPart.split('').reduceRight(
    (acc, curr, index) => {
      const updatedAcc = `${curr}${acc.value}`;

      if (acc.counter === 2 && index !== 0) {
        acc = { value: ` ${updatedAcc}`, counter: 0 };
        return acc;
      }

      acc = { value: updatedAcc, counter: acc.counter + 1 };
      return acc;
    },
    { value: '', counter: 0 },
  ).value;

  return !Number.isNaN(decimalPart) ? `${preparedIntegerPart},${decimalPart}` : preparedIntegerPart;
}
