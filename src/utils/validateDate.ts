/* RetVal
 *   1 =>  "Invalid format YYYY-MM-DD"
 *   2 =>  "Invalid date"
 *   3 =>  "Input date is lesser than current date"
 *   0 =>  "OK"
 */

export function validateDate(date: string) {
  const dateFormatRegEx = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormatRegEx.test(date)) return 1;

  const inputDate = new Date(date);

  if (isNaN(inputDate.getTime())) return 2;

  const currentDate = new Date();

  if (inputDate < currentDate) return 3;

  return 0;
}
