import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput/TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
    const doneTodoes = todos.filter((todo) => todo.done)
    const notdoneTodos = todos.filter((todo) => !todo.done)

    useEffect(() => {
        const todoString = localStorage.getItem('todos')
        const todosObj: Todo[] = JSON.parse(todoString || '[]')
        setTodos(todosObj)
    }, [])

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodos((prev) => [...prev, todo])

        const todoString = localStorage.getItem('todos')
        const todosObj: Todo[] = JSON.parse(todoString || '[]')
        const newTodosObj = [...todosObj, todo]
        localStorage.setItem('todos', JSON.stringify(newTodosObj))
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
    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id)
        if (findedTodo) {
            setCurrentTodo(findedTodo)
        }
    }
    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, name }
            return null
        })
    }

    const finishEditTodo = () => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === currentTodo?.id) {
                    return currentTodo
                }
                return todo
            })
        })
        setCurrentTodo(null)
    }

    const deleteTodo = (id: string) => {
        if (currentTodo) {
            setCurrentTodo(null)
        }
        setTodos((prev) => {
            const finedIndexTodo = prev.findIndex((todo) => todo.id === id)
            if (finedIndexTodo > -1) {
                const result = [...prev]
                result.splice(finedIndexTodo, 1)
                return result
            }
            return prev
        })
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput
                    addTodo={addTodo}
                    currentTodo={currentTodo}
                    editTodo={editTodo}
                    finishEditTodo={finishEditTodo}
                />
                <TaskList
                    todos={notdoneTodos}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
                <TaskList
                    doneTaskList
                    todos={doneTodoes}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    )
}
