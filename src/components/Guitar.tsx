
import { Trilha } from './Trilha';
import { INoteModel } from './Note';
import React, { useState, RefObject } from 'react';
import styled from 'styled-components';
import { ScoreBoard } from './ScoreBoard';


//spawn moment is represented in tenth of a second
let notes = {
    green:[
        {spawnMoment: 1, id: 1},
        {spawnMoment: 2, id: 1},
        {spawnMoment: 4, id: 2},
        {spawnMoment: 6, id: 2},
        {spawnMoment: 8, id: 3},
        {spawnMoment: 10, id: 3},
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
        padding-bottom: 400px;
        /* margin: -50px 0 0 0; */
    `
    let updaters:{[key: string] : (note: INoteModel | null) => any} = {};
    const addUpdater = (updater: {[key: string] : (note: INoteModel | null) => any}) => (updaters = {...updater,...updaters});


    const start = Date.now();
    console.log(updaters)
    let runs = 0;
    setInterval(async () => {
        const now = Date.now();

        if (notes.green[0] && now - start > notes.green[0].spawnMoment*100){
            updaters["green"]({...notes.green[0], spawnMoment: now});
            notes.green.shift()
        }
    }, 1)
    

    setInterval(async () => {
        const now = Date.now();

        if (notes.red[0] && now - start > notes.red[0].spawnMoment*100){
            updaters["red"]({...notes.red[0], spawnMoment: now});
            notes.red.shift()
        }
    }, 1);

    setInterval(async () => {
        const now = Date.now();

        if (notes.yellow[0] && now - start > notes.yellow[0].spawnMoment*100){
            updaters["yellow"]({...notes.yellow[0], spawnMoment: now});
            notes.yellow.shift()
        }
    }, 1);

    setInterval(async () => {
        const now = Date.now();

        if (notes.blue[0] && now - start > notes.blue[0].spawnMoment*100){
            updaters["blue"]({...notes.blue[0], spawnMoment: now});
            notes.blue.shift()
        }
    }, 1);


    setInterval(async () => {
        const now = Date.now();

        if (notes.orange[0] && now - start > notes.orange[0].spawnMoment*100){
            updaters["orange"]({...notes.orange[0], spawnMoment: now});
            notes.orange.shift()
        }        
    }, 1);

    let correctNotes = 0;
    const addCorrect = () => {
        console.log((scoreBoard as unknown as ScoreBoard));
        scoreBoard!.current!.setState({correctNotes: scoreBoard!.current!.state.correctNotes + 1});
        // correctNotes = correctNotes++;
    }
    // console.log(`[${Date.now()}][Render]: Guitar Redering`, updaters)
    const scoreBoard = React.createRef() as RefObject<ScoreBoard>;
    return (<>
            <StyledGuitar >
            <ScoreBoard
                ref={scoreBoard}/>
                <Trilha 
                    color={"green"}
                    addUpdater={addUpdater}
                    height={600}
                    keyCode={65}
                    addCorrect={addCorrect}
                />
                <Trilha 
                    color={"red"}
                    addUpdater={addUpdater}
                    height={600}
                    keyCode={83}
                    addCorrect={addCorrect}
                />
                <Trilha 
                    color={"yellow"}
                    addUpdater={addUpdater}
                    height={600}
                    keyCode={71}
                    addCorrect={addCorrect}
                />
                <Trilha 
                    color={"blue"}
                    addUpdater={addUpdater}
                    height={600}
                    keyCode={72}
                    addCorrect={addCorrect}
                />
                <Trilha 
                    color={"orange"}
                    addUpdater={addUpdater}
                    height={600}
                    keyCode={74}
                    addCorrect={addCorrect}
                />
            </StyledGuitar>
        </>
    );
}