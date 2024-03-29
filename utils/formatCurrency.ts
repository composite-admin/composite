export const formatCurrency = (amount: number | string) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });

  if (typeof amount === "string") {
    amount = parseInt(amount.replace(",", ""));
  }

  if (isNaN(Number(amount))) {
    return "Invalid amount";
  }

  return formatter.format(Number(amount));
};
