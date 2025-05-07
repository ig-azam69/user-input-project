'use client';
import React, { useReducer, useContext, createContext } from 'react';

// Types
type Student = {
    name: string;
    age: number;
    email: string;
};

type Records = {
    students: Student[];
};

type ActionType =
    | { type: 'add'; payload: Student }
    | { type: 'del'; payload: number }
    | { type: 'reset' }
    | { type: 'update'; payload: { index: number; data: Student } };

type ContextType = {
    state: Records;
    dispatch: React.Dispatch<ActionType>;
};

// Create context
const DataContext = createContext<ContextType>({} as ContextType);

// Custom hook
export const useData = () => {
    return useContext(DataContext);
};

// Initial state
const initialState: Records = {
    students: [],
};

// Reducer function
const reducer = (state: Records, action: ActionType): Records => {
    switch (action.type) {
        case 'add':
            return { students: [...state.students, action.payload] };

        case 'del':
            const updatedStudents = [...state.students];
            updatedStudents.splice(action.payload, 1);
            return { students: updatedStudents };

        case 'update':
            const newStudents = [...state.students];
            newStudents[action.payload.index] = action.payload.data;
            return { students: newStudents };

        case 'reset':
            return initialState;

        default:
            return state;
    }
};

// Provider component
const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
