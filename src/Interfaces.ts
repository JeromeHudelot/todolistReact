export interface Todo {
    id: number
    title: string
    completed: boolean
}

export interface TodoListProps {


}

export interface TodoListState {

    todos: Todo[]
    newTodo: string
    filter: 'all' | 'completed' | 'active'

}

export interface TodoItemProps {

    todo: Todo
    onToggle: ( todo: Todo) => void
    onDestroy: ( todo: Todo ) => void
    onUpdate: ( todo: Todo, title: string) => void

}

export interface TodoItemState {

    editing: boolean
    title: string

}