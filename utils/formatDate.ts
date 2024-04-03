export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const [month, day, year] = formattedDate.split(" ");

  return `${day} ${month}, ${year}`;
}
