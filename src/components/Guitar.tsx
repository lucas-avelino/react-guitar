
import { Trilha } from './Trilha';
import { INoteModel } from './Note';
import React, { useState } from 'react';
import styled from 'styled-components';


//spawn moment is represented in tenth of a second
let notes = {
    green:[
        {spawnMoment: 1, id: 1},
        {spawnMoment: 5, id: 1},
        {spawnMoment: 6, id: 2},
        {spawnMoment: 7, id: 2},
        {spawnMoment: 8, id: 3},
        {spawnMoment: 9, id: 3},
        {spawnMoment: 10, id: 4},
        {spawnMoment: 10.5, id: 6},
        {spawnMoment: 11, id: 7},
        {spawnMoment: 11, id: 7},
        {spawnMoment: 12, id: 8},
        {spawnMoment: 230, id: 9}
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
    const StyledGuitar = styled.div`
        height: 100vh;
        width: 100vw;
        background-color: black;
        display: flex;
        align-items: center;
        padding: 50px;
        justify-content: center;
        box-sizing: border-box;
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
    }, 10);


    setInterval(async () => {
        const now = Date.now();

        if (notes.orange[0] && now - start > notes.orange[0].spawnMoment*100){
            updaters["orange"]({...notes.orange[0], spawnMoment: now});
            notes.orange.shift()
        }        
    }, 1);

    console.log(`[${Date.now()}][Render]: Guitar Redering`, updaters)
    return (
        <StyledGuitar >
            <Trilha 
                color={"green"}
                addUpdater={addUpdater}
                height={1000}
            />
             <Trilha 
                color={"red"}
                addUpdater={addUpdater}
                height={1000}
            />
             <Trilha 
                color={"yellow"}
                addUpdater={addUpdater}
                height={1000}
            />
             <Trilha 
                color={"blue"}
                addUpdater={addUpdater}
                height={1000}
            />
             <Trilha 
                color={"orange"}
                addUpdater={addUpdater}
                height={1000}
            />
        </StyledGuitar>
    );
}