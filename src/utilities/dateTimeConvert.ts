// parse UTC mills to date 

// to save in database 
export function converToMills(param: string): number {
  return Date.parse(param)
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
/**
 * take in UTC mill sec to the format 
 * returns in format: 12/30/2020
 * Weekday: short (three letter, Mon, Tue, Thu, etc)
 * Year: numeric (4 digit)
 * Month: short (3 letter)
 * day, hour, min: numaric
 * @param param time in mill sec
 */
export function convertToDisplayDate(param: number): string {
  const date = new Date(param);
  console.log(date)
  const today = new Date(Date.now())
  const optionsNoYear = {
    // weekday: 'short', 
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    min: 'numeric'
  };
  const optionsWYear = {
    // weekday: 'short', 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    min: 'numeric'
  };
  let options = {};
  if (date.getFullYear() === today.getFullYear()) {
    options = optionsNoYear
  } else {
    options = optionsWYear
  }
  return date.toLocaleDateString(undefined, options)
}

export function toDateInputString(date: any): string {
  const today = new Date()
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth();
  const todayDate = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  return todayYear.toString()
    + '-' + todayMonth.toString() + '-' + todayDate.toString();
}


