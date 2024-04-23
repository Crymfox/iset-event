import React, { createContext, useRef } from 'react';

export interface Team {
    id?: number;
    imageSrc: string;
    title: string;
    score?: number;
    rank?: number;
}

interface FinalsContextType {
    sender: React.MutableRefObject<Team>;
    receiver: React.MutableRefObject<Team>;
}

export const FinalsContext = createContext<FinalsContextType>({
    sender: { current: { title: '', imageSrc: '' } },
    receiver: { current: { title: '', imageSrc: '' } },
});

export const FinalsProvider = ({ children }: { children: React.ReactNode }) => {
    
    const sender = useRef<Team>({ title: '', imageSrc: '' });
    const receiver = useRef<Team>({ title: '', imageSrc: '' });

    return (
        <FinalsContext.Provider value={{ sender, receiver }}>
            {children}
        </FinalsContext.Provider>
    );
};