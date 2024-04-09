export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const [month, day, year] = formattedDate.split(" ");

  return `${day} ${month}, ${year}`;
}
export function convertDateFormat(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
