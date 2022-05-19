import { isArray, isString, isObject } from './util'
function classNames(...args: any[]): string {
    const result = []
    for (let i = 0; i < args.length; i++) {
        const v = args[i]
        if (!v) continue
        if (isString(v)) {
            result.push(v)
        } else if (isArray(v)) {
            for (let j = 0; j < v.length; j++) {
                const r = classNames(v[j])
                if (r) {
                    result.push(r)
                }
            }
        } else if (isObject(v)) {
            for (const k in v) {
                if (v[k]) {
                    classNames(v[k])
                }
            }
        }
    }
    return result.join(' ')
}

export default classNames