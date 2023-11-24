import React, {useState, useRef, useEffect} from 'react';

interface InputTaskProps {
    id: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    listingId,
    startDate,
    endDate,
    totalPrice,
    onDone,
    onEdited,
    onRemoved
}) => {

    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState({ listingId,
        startDate,
        endDate,
        totalPrice});
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    disabled={isEditMode}
                    checked={checked}
                    onChange={(evt) => {
                        setChecked(evt.target.checked);

                        if (evt.target.checked) {
                            setTimeout(() => {
                                onDone(id);
                            }, 300);
                        }
                    }}
                />
                { isEditMode ? (
                    <input
                        value={value}
                        ref={editTitleInputRef}
                        onChange={(evt) => {
                            setValue(evt.target.value);
                        }}
                        onKeyDown={(evt) => {
                            if(evt.key === 'Enter') {
                                onEdited(id, value);
                                setIsEditMode(false);
                            }
                        }}
                    />
                ) : (
                    <h3>{totalPrice}</h3>
                )}
            </label>
            { isEditMode ? (
                <button
                    aria-label="Save"
                    onClick={() => {
                        onEdited(id, value);
                        setIsEditMode(false);
                    }}
                >edit</button>
            ) : (
                <button
                    aria-label="Edit"
                    onClick={() => {
                        setIsEditMode(true);
                    }}
                >edit</button>
            )}
            <button
                aria-label="Remove"
                onClick={() => {
                    if(confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            >remove</button>
        </div>
    )
};