import * as React from 'react'
import { TodoItemProps, TodoItemState } from './Interfaces'

export default class TodoItem extends React.PureComponent<TodoItemProps, TodoItemState> {

    constructor(props: TodoItemProps) {
        super(props)
        this.state = {
            editing: false,
            title: ''

        }

    }

    render () {

        let { todo } = this.props
        let { editing, title } = this.state
        return <li className={ ( this.state.editing ? 'editing ' : '' ) +  ( todo.completed ? 'completed' : '' ) }>
        <div className='view'>
            <input className='toggle' type='checkbox' onChange={ this.toggle } checked={ todo.completed }/>
            <label onDoubleClick={ this.startEditing }>{ todo.title }</label>
            <button className='destroy' onClick={ this.destroy }></button>
        </div>
        <input
            type='text' 
            className='edit' 
            value={ title }
            onBlur={ this.handleSubmit }
            onKeyDown={ this.handleKeyDown } 
            onInput={ this.handleInput }
        />
    </li>
    }

    toggle = () => {

        this.props.onToggle(this.props.todo)

    }

    destroy = (): void => {

        this.props.onDestroy(this.props.todo)

    }

    startEditing = (e: React.MouseEvent<HTMLLabelElement>) => {

        this.setState( { editing: true, title: this.props.todo.title } )

    }

    handleSubmit = () => {

        this.props.onUpdate(this.props.todo, this.state.title )
        this.setState( { editing: false } )

    }

    handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>) => {

        if( e.key === 'Escape'){
            this.setState( { editing: false } )
        }
        else if ( e.key === 'Enter' ) {

            this.handleSubmit()

        }

    }

    handleInput = (e: React.FormEvent<HTMLInputElement>) => {

        this.setState( { title: (e.target as HTMLInputElement).value } )

    }

}