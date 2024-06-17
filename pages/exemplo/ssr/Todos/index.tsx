import { GetServerSideProps } from "next";
import { Todo } from "../../../../types/Todo";

type Props = {
    todo: Todo[]
}
const Todos = ({todo}:Props) => {
    return (
        <div>
            <h1>Todo</h1>
        {todo.map((todo) => (
            <div key={todo.id}>
               
                <input type="checkbox" checked={todo.completed} name="isCompleted" id="isCompleted" />
                <label htmlFor="isCompleted">{todo.title}</label>
            </div>
        ))}
        </div>
    );
};

export default Todos;


export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch data from external API
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const todoList: Todo[] = await res.json();

    return {
        props: {
            todo: todoList
        },
    };
}