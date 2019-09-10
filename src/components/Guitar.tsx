
import { Trilha } from './Trilha';
import { INoteModel } from './Note';
import React, { useState } from 'react';
import styled from 'styled-components';
import { async } from 'q';



let notesGreen = [
    {spawnMoment: 100, id: 1},
    {spawnMoment: 550, id: 1},
    {spawnMoment: 600, id: 2},
    {spawnMoment: 700, id: 2},
    {spawnMoment: 800, id: 3},
    {spawnMoment: 900, id: 3},
    {spawnMoment: 1000, id: 4},
    {spawnMoment: 1050, id: 6},
    {spawnMoment: 1100, id: 7},
    {spawnMoment: 1150, id: 7},
    {spawnMoment: 1200, id: 8},
    {spawnMoment: 1300, id: 9}
]

let notesRed = [
    {spawnMoment: 100, id: 1},
    {spawnMoment: 550, id: 1},
    {spawnMoment: 600, id: 2},
    {spawnMoment: 700, id: 2},
    {spawnMoment: 800, id: 3},
    {spawnMoment: 900, id: 3},
    {spawnMoment: 1000, id: 4},
    {spawnMoment: 1050, id: 6},
    {spawnMoment: 1100, id: 7},
    {spawnMoment: 1150, id: 7},
    {spawnMoment: 1200, id: 8},
    {spawnMoment: 1300, id: 9}
]

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
    // DECAPRED
    // const spawners:[[string,(id: INoteModel) => any]] = [["",()=>{}]];
    // const addSpawner = (spawner: [string,(a:INoteModel) => any]) => (spawners.push(spawner));

    let updaters:{[key: string] : (note: INoteModel | null) => any} = {};
    const addUpdater = (updater: {[key: string] : (note: INoteModel | null) => any}) => (updaters = {...updater,...updaters});

    
    // DECAPRED
    // // setTimeout(() => {
    //     setTimeout(() => {
    //         spawners.find(s => s[0] == 'green')![1](
    //             {
    //                 spawnMoment: Date.now(),
    //                 color: "green"
    //             }
    //         );
    //     }, 100)
    //     // setTimeout(() => {
    //     //     spawners.find(s => s[0] == 'green')![1](2);
    //     // }, 1000)
    // // }, 100);
    // setInterval(() => {
    //     spawners.find(s => s[0] == 'green')![1](
    //     {
    //         spawnMoment: Date.now(),
    //         color: "green"
    //     }
    // )}, 900);

    // const runTimeExec = async(updaters, start) => {
    //     let lastTime = Date.now();
    //     while(true){
    //         // console.log(updaters)
    //         // if(lastTime == Date.now()){continue;}
    //         // lastTime = Date.now()
    //         // if(lastTime-start > notesGreen[0].spawnMoment){
    //         //     console.log(updaters)
    //         //     // updaters["green"]({...notesGreen[0], spawnMoment: start+notesGreen[0].spawnMoment});
    //         //     // notesGreen.shift()
    //         // }//else{
    //         //     updaters["green"](null);
    //         // }
    //     }
    // }
    const start = Date.now();
    // setTimeout(runTimeExec(updaters, start),1000);
    console.log(updaters)
    let runs = 0;

    setInterval(async () => {
        // console.log(updaters);
        console.log(runs);
        const now = Date.now();
        if (notesGreen[0] && now - start > notesGreen[0].spawnMoment){
            updaters["green"]({...notesGreen[0], spawnMoment: now});
            notesGreen.shift()
        }else{
            updaters["green"](null);
        }
        runs++;
    }, 1);
    setInterval(async () => {
        // console.log(updaters);
        console.log(runs);
        const now = Date.now();
        if (notesRed[0] && now - start > notesRed[0].spawnMoment){
            updaters["red"]({...notesRed[0], spawnMoment: now});
            notesRed.shift()
        }else{
            updaters["red"](null);
        }
        runs++;
    }, 1);

    // setInterval(async () => {
    //     // console.log(updaters);
    //     if (runs1 % 10 == 0 ){
    //         updaters["red"]({spawnMoment: Date.now(), id: runs});
    //     }else{
    //         updaters["red"](null);
    //     }
    //     runs1++;
    //     // updaters();
    // }, 10);

    
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