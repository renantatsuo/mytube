export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(Date.parse(date));
  }

  return new Intl.DateTimeFormat("en-us", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatNumber(number: number): string {
  if (number < 1000) {
    return number.toString();
  }

  const numberString = number.toString();

  if (numberString.length <= 6) {
    return numberString.replace(/(\d+)(\d)\d{2}/, "$1.$2K");
  }

  if (numberString.length <= 9) {
    return numberString.replace(/(\d+)(\d)\d{5}/, "$1.$2M");
  }

  if (numberString.length <= 12) {
    return numberString.replace(/(\d+)(\d)\d{8}/, "$1.$2B");
  }

  return number.toString();
}
