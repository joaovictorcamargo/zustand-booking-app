import { Task } from '@/data/stores/useToDoStore';
import React, {useState, useCallback} from 'react';

interface InputPlusProps {
    onAdd: ({totalPrice, startDate, endDate, listingId}: Task) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({
    onAdd,
}) => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue]);

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(evt) => {
                    setInputValue(evt.target.value);
                }}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder="Type here..."
            />
            <button
                onClick={addTask}
                aria-label="Add"
            >add</button>
        </div>
    )
};