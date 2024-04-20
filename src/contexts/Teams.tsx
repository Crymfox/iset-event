import React, { createContext, useState } from 'react';

// Define the shape of the team object
export interface Team {
    id?: number;
    imageSrc: string;
    title: string;
    score?: number;
    rank?: number;
}

// Define the shape of the context
interface TeamsContextType {
    teams: Team[];
    addTeam: (team: Team) => void;
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    sortTeams?: (teams: Team[]) => Team[];
    deleteTeam?: (team: Team) => void;
}

// Create the context
export const TeamsContext = createContext<TeamsContextType>({
    teams: [],
    addTeam: () => {},
    setTeams: () => {},
    sortTeams: () => [],
    deleteTeam: () => {},
});

// Create the provider component
export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
    const [teams, setTeams] = useState<Team[]>([]);

    // Function to add a new team to the context
    const addTeam = (team: Team) => {
        setTeams((prevTeams) => [...prevTeams, team]);
    };

    const sortTeams = (teams: Team[]) => {
        const sortedTeams = [...teams].sort((a, b) => b.score! - a.score!);
        return sortedTeams.map((team, index) => ({ ...team, rank: index + 1 }));
    }

    const deleteTeam = (team: Team) => {
        setTeams((prevTeams) => prevTeams.filter((t) => t !== team));
    }

    return (
        <TeamsContext.Provider value={{ teams, addTeam, setTeams, sortTeams, deleteTeam }}>
            {children}
        </TeamsContext.Provider>
    );
};