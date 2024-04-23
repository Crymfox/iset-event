import React, { createContext, useState } from 'react';

export interface Team {
    id?: number;
    imageSrc: string;
    title: string;
    score?: number;
    rank?: number;
}

interface TeamsContextType {
    teams: Team[];
    addTeam: (team: Team) => void;
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    sortTeams?: (teams: Team[]) => Team[];
    deleteTeam?: (team: Team) => void;
}

export const TeamsContext = createContext<TeamsContextType>({
    teams: [],
    addTeam: () => {},
    setTeams: () => {},
    sortTeams: () => [],
    deleteTeam: () => {},
});

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
    const [teams, setTeams] = useState<Team[]>([]);

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