import React, { useState, useContext } from 'react';
import { TeamsContext } from '../contexts/Teams.tsx';
import { useHotkeys } from 'react-hotkeys-hook';
import { Team } from '../contexts/Teams.tsx';
import Card from './Card.tsx';
import { FinalsContext } from '../contexts/Finals.tsx';

interface CreatorProps {
    final?: boolean;
    first?: boolean;
}

const Creator: React.FC<CreatorProps> = ({ final, first }) => {
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
        if (teamTitle.length > 0) addTeam({
            id: teams.length + 1,
            title: teamTitle,
            imageSrc: teamPicture,
            score: 0,
        });
        setTeamTitle('');
        // setTeamPicture('');
    };

    const [finalist, setFinalist] = useState<Team>({title: '', imageSrc: ''})

    const handleAddFinalist = () => {
        if (teamTitle.length > 0) {
            setFinalist({
                title: teamTitle,
                imageSrc: teamPicture
            });
            setStart(false)
        }
    }

    const handleDeleteFinalist = () => {
        if (first) setFinalist({title: '', imageSrc: ''})
        setStart(first)
    }

    useHotkeys('enter', () => {
        if (!final) {
            handleAddTeam()
        }
    }, {enableOnFormTags: ["input"]})

    const { sender, receiver } = useContext(FinalsContext)

    const [start, setStart] = useState(first)

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        sender.current = finalist
        e.dataTransfer.setData('text', JSON.stringify(finalist))
        // setFinalist({title: '', imageSrc: ''})
    }

    const handleOnDragEnd = () => {
        if (receiver.current == sender.current) {
            setFinalist(receiver.current)
        }
    }

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        receiver.current = sender.current
    }

    const handleOnDrag = () => {
        setFinalist({title: '', imageSrc: ''})
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const data = e.dataTransfer.getData('text')
        if (data) {
            const team = JSON.parse(data)
            sender.current = {title: '', imageSrc: ''}
            receiver.current = team
            setFinalist(team)
        }
    }

    return (
        <div className='min-w-[14rem]' draggable={final && finalist.title != ''} onDragStart={handleOnDragStart} onDrag={handleOnDrag} onDragEnd={handleOnDragEnd}>
            {
                final && finalist.title ? <Card imageSrc={finalist.imageSrc} title={finalist.title} onDeleteFunction={handleDeleteFinalist} final /> : (final ? start : true) ?
                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="teamPicture" className="cursor-pointer flex justify-center">
                        <input
                            type="file"
                            id="teamPicture"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePictureChange}
                        />
                        <span className="text-3xl text-white border-2 rounded-full px-2">+</span>
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
                </div> : <div
                    className='border-2 border-black bg-white w-[14rem] h-[5rem] rounded-lg'
                    onDragOver={handleOnDragOver}
                    onDrop={handleOnDrop}
                ></div>
            }
        </div>
    );
};

export default Creator;