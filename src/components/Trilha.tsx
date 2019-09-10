import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Note, INoteModel } from './Note';
import { Trigger } from './Trigger';

interface ITrilha{
    color: string;
    addUpdater: (any) => any;
    height: number;
    keyCode: number;
    addCorrect: ()=>any;
}

const StyledTrilha = styled.div<{
    height: number
}>`
    width: 50px;
    height: ${(props)=>props.height}px;
    background-color: rgba(255,255,255,0.5);
    border: 1px solid red;
    position: relative;
    box-sizing: margin-box;
    // transform: rotate3d(1,0,0, 25degs);
    -webkit-transform-style: preserve-3d; /* Safari 3-8  */  
    -webkit-transform: rotateX(35deg); /* Safari 3-8  */
    transform-style: preserve-3d;
    transform: rotateX(35deg);
`
export const Trilha =  React.memo(function (props: ITrilha){

    const [notas , setNotas] = useState([] as Array<INoteModel>);
    // const [refs , setRef] = useState({[key]:});
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    let notes: Array<INoteModel> = [];
    const updater = async (nota: INoteModel) => {
        const filtered = notes.filter(n=>n && ((4*props.height)-(Date.now()-n.spawnMoment)) > 0);
        if(nota){
            notes.push({...nota, totalLifeTime: (props.height/0.25)});
            setNotas(notes);
            forceUpdate();
        }
        else if (filtered != notes){
            setNotas(filtered);
            notes = filtered;
        }
    }
    props.addUpdater({[props.color]: updater});
    
    // console.log(`[${Date.now()}][Render]: Trilha Redering`,props.color, notes)


    return(<>
        <StyledTrilha
            {...props}
            
        >
            {notas.map(n => 
                <Note
                    heigth={props.height}
                    {...n}
                    velocity={0.25}
                    color={props.color}
                    // ref={(ref)=>{setRef({...refs, ...ref})}}
                />
            )}
            
            <Trigger
                color={props.color}
                keyCode={props.keyCode}
                notas={notas}
                addCorrect={props.addCorrect}
            />
        </StyledTrilha>
    </>
    );
});
