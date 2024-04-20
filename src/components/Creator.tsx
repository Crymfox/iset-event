import React, { useState, useContext } from 'react';
// import Card from './Card.tsx';
import { TeamsContext } from '../contexts/Teams.tsx';
import { useHotkeys } from 'react-hotkeys-hook';
import { Team } from '../contexts/Teams.tsx';
import Card from './Card.tsx';

interface CreatorProps {
    final?: boolean;
}

const Creator: React.FC<CreatorProps> = ({ final }) => {
    const [teamTitle, setTeamTitle] = useState('');
    const [teamPicture, setTeamPicture] = useState('');
    const { addTeam, teams } = useContext(TeamsContext);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamTitle(event.target.value);
    };

    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // TODO: Handle file upload and set the teamPicture state

            // Example of handling file upload
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target?.result;
                setTeamPicture(dataURL as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTeam = () => {
        // TODO: Add team using teamTitle and teamPicture
        // You can use this data to render the Card component
        addTeam({
            id: teams.length + 1,
            title: teamTitle,
            imageSrc: teamPicture,
            score: 0,
        });
    };

    const [finalist, setFinalist] = useState<Team>({} as Team)

    const handleAddFinalist = () => {
        setFinalist({
            id: teams.length + 1,
            title: teamTitle,
            imageSrc: teamPicture
        });
    }


    useHotkeys('enter', () => {
        final ? handleAddFinalist() : handleAddTeam()
    }, {enableOnFormTags: ["input"]})

    return (
        final && finalist.title ? <Card imageSrc={finalist.imageSrc} title={finalist.title} final /> :
        <div className="flex gap-2 items-center justify-center">
            <label htmlFor="teamPicture" className="cursor-pointer flex justify-center">
                <input
                    type="file"
                    id="teamPicture"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePictureChange}
                />
                <span className="text-4xl text-gray-500">+</span>
            </label>
            <input
                type="text"
                placeholder="Team Title"
                value={teamTitle}
                onChange={handleTitleChange}
                className="p-2 border border-gray-300 rounded"
            />
            <button
                onClick={final ? handleAddFinalist : handleAddTeam}
                className="p-2 bg-blue-500 text-white rounded"
            >
                Add Team
            </button>
        </div>
        
    );
};

export default Creator;