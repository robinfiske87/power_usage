

export const parseToFloat = (array) => {
  return array.map(object => {
    const newObj = {}
    for(let prop in object) {
      if(prop === 'date' || prop === 'time') {
        newObj[prop] = object[prop]
        continue
      }
      newObj[prop] = parseFloat(object[prop])
    } 
  return newObj;
  })
}


export const makeDataArray = (array) =>{
  return array.map(object => {
    const newObj = {}
    for(let prop in object) {
      if(prop === 'date' || prop === 'time' || prop === 'voltage') {
        continue
      }
      newObj[prop] = object[prop]
    } 
  return Object.values(newObj);
  })
}