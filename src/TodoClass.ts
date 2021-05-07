import { Todo } from './Interfaces'

declare type ChangeCallback = (store: TodoClass) => void

export default class TodoClass{

    private static i = 0
    public todos: Todo[] = []
    private callbacks: ChangeCallback[] = []
    
    private static increment(){
        return this.i++
    }


    inform (): void {

        this.callbacks.forEach( callback => callback(this))

    }

    onChange ( callback: ChangeCallback){

        this.callbacks.push(callback)

    }

    addTodo ( title: string ): void{

        this.todos = [{
            id: TodoClass.increment(),
            title: title,
            completed: false
        }, ...this.todos]
        this.inform()

    }

    removeTodo ( todo: Todo ): void{

        this.todos = this.todos.filter( t => t !== todo )
        this.inform()

    }

    toggleTodo ( todo: Todo): void{

        this.todos = this.todos.map( t => t === todo ? { ...t, completed: !t.completed } : t)
        this.inform()

    }

    toggleAllTodo ( completed = true): void {

        this.todos = this.todos.map( t => completed !== t.completed ? { ...t, completed } : t)
        this.inform()

    }

    editTodo ( todo: Todo , title: string ): void {

        this.todos = this.todos.map( t => t === todo ? { ...t, title } : t)
        this.inform()

    }

    cleanTodo (): void {

        this.todos = this.todos.filter( t => !t.completed )
        this.inform()

    }
}