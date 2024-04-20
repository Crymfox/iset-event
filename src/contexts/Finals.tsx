import React, { createContext, useRef } from 'react';

// Define the shape of the team object
export interface Team {
    id?: number;
    imageSrc: string;
    title: string;
    score?: number;
    rank?: number;
}

// Define the shape of the context
interface FinalsContextType {
    sender: React.MutableRefObject<Team>;
    receiver: React.MutableRefObject<Team>;
}

// Create the context
export const FinalsContext = createContext<FinalsContextType>({
    sender: { current: { title: '', imageSrc: '' } },
    receiver: { current: { title: '', imageSrc: '' } },
});

// Create the provider component
export const FinalsProvider = ({ children }: { children: React.ReactNode }) => {
    
    const sender = useRef<Team>({ title: '', imageSrc: '' });
    const receiver = useRef<Team>({ title: '', imageSrc: '' });

    return (
        <FinalsContext.Provider value={{ sender, receiver }}>
            {children}
        </FinalsContext.Provider>
    );
};