import * as React from 'react'
import TodoClass from './TodoClass'
import { Todo, TodoListProps, TodoListState } from './interfaces'
import TodoItem from './TodoItem'

const Filters = {

    completed: (todo: Todo) => todo.completed,
    active: (todo: Todo) => !todo.completed,
    all: (todo: Todo) => true
}

export default class TodoList extends React.PureComponent<TodoListProps, TodoListState> {

    private list: TodoClass = new TodoClass()
    private toggleTodo: (todo: Todo) => void
    private destroyTodo: (todo: Todo) => void
    private updateTitle: (todo: Todo, title: string) => void
    private clearCompleted: () => void

    constructor(props: TodoListProps){

        super(props)
        this.state = {

            todos: [],
            newTodo: '',
            filter: 'all'

        }
        this.list.onChange((list) => {

            this.setState({ todos: list.todos })

        })
        this.toggleTodo = this.list.toggleTodo.bind(this.list)
        this.destroyTodo = this.list.removeTodo.bind(this.list)
        this.updateTitle = this.list.editTodo.bind(this.list)
        this.clearCompleted = this.list.cleanTodo.bind(this.list)

    }

    get remainingCount (): number {

        return this.state.todos.reduce( ( count, todo ) => !todo.completed ? count + 1 : count, 0 )

    }

    get completedCount (): number {

        return this.state.todos.reduce( ( count, todo ) => todo.completed ? count + 1 : count, 0)

    }

    render () {

        let { todos, newTodo, filter } = this.state
        let todosFiltered = todos.filter( Filters[filter] )
        let remainingCount = this.remainingCount
        let completedCount = this.completedCount

        return <section className='todoapp'>
            <header className = 'header'>
                <h1>todos</h1>
                <input className='new-todo'
                value = { newTodo }
                placeholder='Que doit on faire ?'
                onInput={ this.updateNewTodo }
                onKeyPress={ this.addTodo }/>
            </header>
            <section className='main'>
                { todos.length > 0 && <input className='toggle-all' type='checkbox' checked={ remainingCount === 0 } onChange={ this.toggle }/> }
                { todos.length > 0 && <label htmlFor='toggle-all'>Marquer tout complété</label> }
                <ul className='todo-list'>
                    { todosFiltered.map( todo => {

                        return <TodoItem 
                        todo={ todo } 
                        key={ todo.id } 
                        onToggle={ this.toggleTodo } 
                        onDestroy={ this.destroyTodo }
                        onUpdate={ this.updateTitle }
                    />
                    
                    })}
                </ul>
            </section>
            <footer className='footer'>
                { remainingCount > 0 &&<span className='todo-count'><strong>{ remainingCount }</strong> tache restante</span> }
                <ul className='filters'>
                    <li>
                        <a href='#/' className={ filter === 'all' ? 'selected' : '' } onClick={ this.setFilter('all') }>Toutes</a>
                    </li>
                    <li>
                        <a href='#/active' className={ filter === 'active' ? 'selected' : '' } onClick={ this.setFilter('active') }>En cours</a>
                    </li>
                    <li>
                        <a href='#/completed' className={ filter === 'completed' ? 'selected' : '' } onClick={ this.setFilter('completed') }>Complété</a>
                    </li>
                </ul>
                { completedCount > 0 && <button className='clear-completed' onClick={ this.clearCompleted }>Vider complété</button> }
            </footer>
        </section>

    }

    updateNewTodo = (e: React.FormEvent<HTMLInputElement>) => {

        this.setState( { newTodo: ( e.target as HTMLInputElement).value } )

    }

    addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if(e.key === 'Enter'){

            this.list.addTodo( this.state.newTodo )
            this.setState( { newTodo: '' })

        }
    }
    toggle = (e: React.FormEvent<HTMLInputElement>) => {

        this.list.toggleAllTodo( this.remainingCount > 0 )

    }

    setFilter = (filter: 'all' | 'completed' | 'active') => {

        return (e: React.MouseEvent<HTMLElement>) => {

            this.setState( { filter: filter } )

        }

    }

}