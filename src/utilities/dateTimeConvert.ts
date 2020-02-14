// parse UTC mills to date 

// to save in database 
export function converToMills(param: string){
  return Date.parse(param)
}

