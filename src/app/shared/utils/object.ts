export function prepareFiltersToQuery<Type extends {}>(obj: Type): Record<string, number | string> {
    return Object.entries(obj).reduce((acc,[key,value])=> {
    if(value) {
      acc[key] =Array.isArray(value) ? value.join(',') : value as string | number
    }

    return acc

  },{} as Record<string, number | string>)
}
