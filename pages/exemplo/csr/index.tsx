import { GetStaticProps } from "next/types";
import { Todo } from "../../../types/Todo";
import { useEffect, useState } from "react";


type Props = {
    idade: number
}
const Todos = ({idade}: Props) => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);    
    useEffect(() => {
        loadTodos();
    }, [])

    const loadTodos = async () => {
        setIsLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
        const list: Todo[] = await res.json();
        setTodoList(list);
        setIsLoading(false);
    }
    return (
        <div>
            <h1>Todo</h1>
            <p>Meu nome é {process.env.NEXT_PUBLIC_NOME}</p>
            <p>tenho {idade} anos</p>
            {isLoading && <p>Loading...</p>}
        {todoList.map((todo) => (
            <div key={todo.id}>
               
                <input type="checkbox" checked={todo.completed} name="isCompleted" id="isCompleted" />
                <label htmlFor="isCompleted">{todo.title}</label>
            </div>
        ))}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            idade: process.env.IDADE,
        },
    }
}



export default Todos;

