import { useState } from 'react'
import TaskInput from '../TaskInput/TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])

    const doneTodoes = todos.filter((todo) => todo.done)
    const notdoneTodos = todos.filter((todo) => !todo.done)

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodos((prev) => [...prev, todo])
    }

    const handleDoneTodo = (id: string, done: boolean) => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return todo
            })
        })
    }
    console.log(todos)
    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput addTodo={addTodo} />
                <TaskList todos={notdoneTodos} handleDoneTodo={handleDoneTodo} />
                <TaskList doneTaskList todos={doneTodoes} handleDoneTodo={handleDoneTodo} />
            </div>
        </div>
    )
}
