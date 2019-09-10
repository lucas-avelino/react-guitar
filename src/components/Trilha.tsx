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
    width: 50px;
    height: ${(props)=>props.height}px;
    background-color: white;
    border: 1px solid red;
    position: relative;
`
export const Trilha =  React.memo(function (props: ITrilha){

    const [notas , setNotas] = useState([] as Array<INoteModel>);
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    let notes: Array<INoteModel> = [];


    const updater = async (nota: INoteModel) => {
        const filtered = notes.filter(n=>((4*1000)-(Date.now()-n.spawnMoment)) > 0);
        if(nota){
            notes.push(nota);
            setNotas(notes);
            forceUpdate();
        }
        else if (filtered != notes){
            setNotas(filtered);
            notes = filtered;
        }
    }
    props.addUpdater({[props.color]: updater});

    console.log(`[${Date.now()}][Render]: Trilha Redering`,props.color, notes)
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
        </StyledTrilha>
    );
});
