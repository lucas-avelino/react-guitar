
import { Trilha } from './Trilha';
import { INoteModel } from './Note';
import React, { useState, RefObject } from 'react';
import styled from 'styled-components';
import { ScoreBoard } from './ScoreBoard';

//spawn moment is represented in tenth of a second
let notes = {
    green:[
        {spawnMoment: 1,end: 11 , id: 1},
        // {spawnMoment: , id: 1},
        // {spawnMoment: 4, id: 2},
        // {spawnMoment: 6, id: 2},
        // {spawnMoment: 8, id: 3},
        // {spawnMoment: 10, id: 3},
        {spawnMoment: 12, id: 4},
        {spawnMoment: 14, id: 7},
        {spawnMoment: 16, id: 7},
        {spawnMoment: 18, id: 8},
        {spawnMoment: 20, id: 9}
    ],
    red:[
        {spawnMoment: 10, id: 1},
        {spawnMoment: 55, id: 1},
        {spawnMoment: 60, id: 2},
        {spawnMoment: 70, id: 2},
        {spawnMoment: 80, id: 3},
        {spawnMoment: 90, id: 3},
        {spawnMoment: 100, id: 4},
        {spawnMoment: 105, id: 6},
        {spawnMoment: 110, id: 7},
        {spawnMoment: 115, id: 7},
        {spawnMoment: 120, id: 8},
        {spawnMoment: 130, id: 9}
    ],
    yellow:[
        {spawnMoment: 10, id: 1},
        {spawnMoment: 55, id: 1},
        {spawnMoment: 60, id: 2},
        {spawnMoment: 70, id: 2},
        {spawnMoment: 80, id: 3},
        {spawnMoment: 90, id: 3},
        {spawnMoment: 100, id: 4},
        {spawnMoment: 105, id: 6},
        {spawnMoment: 110, id: 7},
        {spawnMoment: 115, id: 7},
        {spawnMoment: 120, id: 8},
        {spawnMoment: 130, id: 9}
    ],
    blue:[
        {spawnMoment: 10, id: 1},
        {spawnMoment: 55, id: 1},
        {spawnMoment: 60, id: 2},
        {spawnMoment: 70, id: 2},
        {spawnMoment: 80, id: 3},
        {spawnMoment: 90, id: 3},
        {spawnMoment: 100, id: 4},
        {spawnMoment: 105, id: 6},
        {spawnMoment: 110, id: 7},
        {spawnMoment: 115, id: 7},
        {spawnMoment: 120, id: 8},
        {spawnMoment: 130, id: 9}
    ],
    orange:[

        {spawnMoment: 11, id: 7},
        {spawnMoment: 31, id: 8},
        {spawnMoment: 32, id: 9}
    ]
}
interface Trilhas{
    color: string,
    keyCode: number
}

export const CONFIG = {
    trilhas: [
        {
            color:"green",
            keyCode:65
        },
        {
            color:"red",
            keyCode:83
        },
        {
            color:"yellow",
            keyCode:71
        },
        {
            color:"blue",
            keyCode:72
        },
        {
            color:"orange",
            keyCode:74
        },
    ] as Array<Trilhas>,
    noteVelocity: 0.25,
    trilhaSize: window.screen.height*.65,
    accuracy: 150,
    timeNPS: 100,
    sizeOfTime: 25,
}

export function Guitar(){
    const [velocidade, setVelocidade] = useState(1);
    const [score, setScore] = useState(0);
    const StyledGuitar = styled.div`
        height: 100vh;
        width: 100vw;
        background-color: black;
        display: flex;
        align-items: baseline;
        padding: 50px;
        justify-content: center;
        box-sizing: border-box;
        position: relative;
        -webkit-perspective: 400px ;
        perspective: 400px ;
        padding: 50px;
        padding-bottom: 200px;
    `
    let updaters:{[key: string] : (note: INoteModel | null) => any} = {};
    const addUpdater = (updater: {[key: string] : (note: INoteModel | null) => any}) => (updaters = {...updater,...updaters});


    const start = Date.now();
    for (const i in CONFIG.trilhas) {
        setInterval(async () => {
            const now = Date.now();
            const trilha = CONFIG.trilhas[i].color;
            if (notes[trilha][0] && now - start > notes[trilha][0].spawnMoment * CONFIG.timeNPS){
                updaters[trilha]({
                    ...notes[trilha][0],
                    spawnMoment: now,
                    end: notes[trilha][0].end? notes[trilha][0].end - notes[trilha][0].spawnMoment: notes[trilha][0].end
                });
                notes[trilha].shift()
            }
        }, 10)
    }

    const addCorrect = () => {
        if (scoreBoard && scoreBoard.current)
            scoreBoard!.current!.setState({correctNotes: scoreBoard!.current!.state.correctNotes + 1});
    }
    // console.log(`[${Date.now()}][Render]: Guitar Redering`, updaters)
    const scoreBoard = React.createRef() as RefObject<ScoreBoard>;
    return (<>
            <StyledGuitar >
                <ScoreBoard ref={scoreBoard}/>
                {CONFIG.trilhas.map(n=>
                    <Trilha 
                        color={n.color}
                        keyCode={n.keyCode}
                        height={CONFIG.trilhaSize}
                        addUpdater={addUpdater}
                        addCorrect={addCorrect}
                    />
                )} 
            </StyledGuitar>
        </>
    );
}