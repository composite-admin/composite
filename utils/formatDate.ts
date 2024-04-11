export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const [month, day, year] = formattedDate.split(" ");

  return `${day.slice(0, -1)} ${month}, ${year}`;
}

export function convertDateFormat(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function convertDateFormatToAllString(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function formatDateToString(dateString: string) {
  const date = new Date(dateString);
  const options: any = { year: 'numeric', month: 'short', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}