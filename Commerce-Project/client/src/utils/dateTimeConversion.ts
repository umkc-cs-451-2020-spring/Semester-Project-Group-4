export const dateConverter = (date: any) => {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
}