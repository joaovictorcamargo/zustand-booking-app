import React from 'react';
import shallow from 'zustand/shallow'

import { useToDoStore } from '../../data/stores/useToDoStore';

export const ToDoListDone: React.FC = () => {
    const [
        tasksDone,
        createTaskDone,
    ] = useToDoStore(state => [
        state.tasksDone,
        state.createTaskDone,
        state.deleteEverything,
    ]);

    return (
        <article>
            <h1>Done tasks</h1>
            {!tasksDone.length && (
                <p>There is no one done task.</p>
            )}
            {tasksDone.map((task, index) => (
                <p
                    key={task.id}
                >{index + 1}. {task.title}</p>
            ))}
        </article>
    );
}