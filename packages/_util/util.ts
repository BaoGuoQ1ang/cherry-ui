export const isArray = Array.isArray
export const isString = (val: string) => typeof val === 'string'
export const isObject = (val: object) => val !== null && typeof val === 'object'
export const isFunction = (val: object) => typeof val === 'function'