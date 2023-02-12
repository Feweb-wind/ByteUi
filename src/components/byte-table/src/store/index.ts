import { ComponentInternalInstance, getCurrentInstance } from 'vue'
import { Column } from '../table-column'
export class helpMutations {
    'return' = typeof TableStore()['mutations']
}
export type Sotre<T> = {
    states: StoreStates<T>,
    mutations: any
}
export type StoreStates<T> = {
    data: Array<T>,
    columns: Array<Column>,
}
// export interface TableInstance<T> extends ComponentInternalInstance {
//     store: Sotre<T>,
// }
export class helpStore {
    'return' = TableStore()
}
export interface TableInstance<T> extends ComponentInternalInstance {
    store: helpStore['return']
}
export function TableStore<T>() {
    const instance = getCurrentInstance() as TableInstance<T>
    let states: StoreStates<T> = {
        data: [],
        columns: []
    }
    const mutations: any = {
        setData(states: StoreStates<T>, data: T[]) {
            //to do : 性能优化，实现局部刷新
            // states.data = data
            states.data = data
        },
        insertColumn(states: StoreStates<T>, col: Column) {
            states.columns.push(col)
        },
        removeColumn() {

        },
        sort() {

        },
        changeSortCondition() {

        },
    }
    const commit = function (name: keyof typeof mutations, ...args: any[]) {
        if (mutations[name]) {
            mutations[name].apply(instance, [states].concat(args))
        } else {
            throw new Error(`Action not found ${name.toString()}`)
        }
    }
    const getStates = function () {
        return states
    }
    return {
        mutations,
        commit,
        getStates
    }
}