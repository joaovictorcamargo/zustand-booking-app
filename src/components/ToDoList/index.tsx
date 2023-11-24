import { useToDoStore } from '@/data/stores/useToDoStore';
import React from 'react';
import { InputPlus } from '../InputPlus/index';
import { InputTask } from '../InputTask/index';

interface ToDoListProps {
    mainTitle?: string;
}

export const ToDoList: React.FC<ToDoListProps> = ({
    mainTitle = 'To Do App'
}) => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);

    return (
        <article>
            <h1 className="text-red-500">{mainTitle}</h1>
            <section>
                <InputPlus
                    onAdd={({totalPrice, startDate, endDate, listingId, id}) => {
                       if ({totalPrice, startDate, endDate, listingId, id}) {
                            createTask({totalPrice, startDate, endDate, listingId, id })
                       } 
                    }}
                />
            </section>
            <section>
                {!tasks.length && (
                    <p>There is no one task.</p>
                )}
                {tasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                    />
                ))}
            </section>
        </article>
    );
}