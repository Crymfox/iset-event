import React from 'react';
import Creator from '../components/Creator.tsx';

const Final: React.FC = () => {
    // Page for finals, Starts with 8 players on the left side 2 against 2, then 4 players on the right side 2 against 2, then 2 players on the right side 1 against 1 with the lines of the court and Creator component to add each of the 8 starting players
    return (
        <div className='grid grid-flow-col grid-cols-4 px-4 h-screen items-center'>
            <div className='flex flex-col gap-8'>
                <Creator final />
                <Creator final />
                <Creator final />
                <Creator final />
                <Creator final />
                <Creator final />
                <Creator final />
                <Creator final />
            </div>
            <div className='flex flex-col gap-4'>
                <h1>player1</h1>
                <h1>player2</h1>
                <h1>player3</h1>
                <h1>player4</h1>
            </div>
            <div className='flex flex-col gap-4'>
                <h1>player1</h1>
                <h1>player2</h1>
            </div>
            <div>
                <h1>winner</h1>
            </div>
        </div>
    )
}

export default Final;