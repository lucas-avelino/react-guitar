import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Note, INoteModel } from './Note';
import { Trigger } from './Trigger';
import { CONFIG } from './Guitar';


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
    & > .notes{
        overflow: hidden;
        width: 100%;
        height: calc(100% + 10px);
        position: relative;
    }
`
export const Trilha =  React.memo(function (props: ITrilha){

    const [notas , setNotas] = useState([] as Array<INoteModel | undefined>);
    // const [refs , setRef] = useState({[key]:});
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    let notes: Array<INoteModel> = [];
    const updater = async (nota: INoteModel) => {
        const filtered = notes.filter(n=>n && ((4*props.height)-(Date.now()-n.spawnMoment)) > 0);
        if(nota){
            notes.push({
                ...nota, 
                totalLifeTime: (CONFIG.trilhaSize+(nota.end||0)*20)/CONFIG.noteVelocity,
                color: props.color
            });
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

    useEffect(()=>{
        

    },[]);

    return(<>
        <StyledTrilha
            {...props}
            
        >   
            <div className="notes">
                {notas.map(n => n &&
                    <Note
                        {...n}
                        color={props.color}
                        end={n.end}
                        totalLifeTime={n.totalLifeTime}
                        // ref={(ref)=>{setRef({...refs, ...ref})}}
                    />
                )}
            </div>
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
