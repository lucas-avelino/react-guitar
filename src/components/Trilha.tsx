import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Note, INoteModel } from './Note';
import { array } from 'prop-types';
import { notStrictEqual } from 'assert';

interface ITrilha{
    color: string;
    addUpdater: (any) => any;
    height: number;
}

const StyledTrilha = styled.div<{
    height: number
}>`
    width: 40px;
    height: ${(props)=>props.height}px;
    background-color: white;
    border: 1px solid red;
    position: relative;
`
export function Trilha(props: ITrilha){

    const [notas , setNotas] = useState([] as Array<INoteModel>);
    // const [updates , setlastUpdate] = useState([] as Array<number>);
    
    // DECAPRED
    // const [, updateState] = React.useState();
    // const forceUpdate = useCallback(() => updateState({}), []);

    let notes: Array<INoteModel> = [];

    // DECAPRED
    // const spawnNote = (nota: INoteModel) => {
    //     notes.push(nota);
    //     notes = notes.filter(n=>((4*1000)-(Date.now()-n.spawnMoment)) > 0);
    //     setNotas(notes);
    //     forceUpdate();
    // }

    const updater = async (nota: INoteModel | null) => {
        const filtered = notes.filter(n=>((4*1000)-(Date.now()-n.spawnMoment)) > 0);
        if(nota){
            notes.push(nota);
            // notes = notes.filter(n=>((4*1000)-(Date.now()-n.spawnMoment)) > 0);
            setNotas(notes);
            // forceUpdate();
        }else if(filtered != notes){
            setNotas(filtered);
            notes = filtered;
            // forceUpdate();
        }
        
    }
    // DECAPRED
    // props.addSpawner([props.color,spawnNote]);
    props.addUpdater({[props.color]: updater});

    // console.log(notas);
    return(
        <StyledTrilha
            {...props}
        >
            {notas.map(n => 
                <Note
                    heigth={props.height}
                    {...n}
                    velocity={0.25}
                    color={props.color}
                />
            )}
            {/* {(()=>{console.log(notas); return "";})()} */}
            
        </StyledTrilha>
    );
}
