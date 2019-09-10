import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Note, INoteModel } from './Note';
import Fire from '../img/fire.gif';

interface ITrigger{
    color: string;
    keyCode: number;
    notas: Array<INoteModel | null>;
    addCorrect: () => any; 
}

const hide = () => keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const StyledTrigger = styled.div<{
    pressed: boolean,
    pressedCorrect: boolean,
    color: string,
}>`
    width: 50px;
    height: 30px;
    background-color: ${(props) => {if(props.pressed) return "rgba(0, 0, 0,0.9)"; else return "rgba(229,229,232,0.5)";}};
    position: absolute;
    bottom: -15px;
    border-radius: 100%;
    border: 4px solid ${(props) => props.color};
    box-sizing: border-box;
    & > img {
        position: absolute;
        width: 100px;
        top: -60px;
        left: -25px;
        display: ${(props) => {if(props.pressedCorrect) return "block"; else return "none";}};
        opacity: 0;
        animation: ${hide} 500ms ease-out;
    }
`
let notes: Array<INoteModel | null> = [];

export const Trigger =  function (props: ITrigger){
    notes = notes != []? notes = props.notas: notes
    const [pressed , setPressed] = useState(false);
    const [pressedCorrect , setPressedCorrect] = useState(false);

    const onKeyDown = function (e:any) {
        console.log(e.keyCode )
        if(e.keyCode == props.keyCode && !pressed){
            
            setPressed(true);
            const filtered = notes.filter(n=>
                n
                && n.spawnMoment+n.totalLifeTime!<Date.now()+200 
                && n.spawnMoment+n.totalLifeTime!>Date.now()-200
            );
            console.log("onKeyDown",Date.now(),filtered)
            if(filtered.length > 0 ){
                console.log(`[${Date.now()}][Log]:`,filtered)
                notes[notes.indexOf(filtered[0])] = null;
                setPressedCorrect(true);
                props.addCorrect();
            }
        }
    }

    const onKeyRelease = function (e:any) {
        console.log(e.keyCode )
        if(e.keyCode == props.keyCode){
            setPressedCorrect(false);
            setPressed(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyRelease);
    }, [])


    console.log(`[${Date.now()}][Render]: Trigger Redering`,props)
    return(
        <StyledTrigger 
            {...props} 
            pressed={pressed}
            pressedCorrect={pressedCorrect}
        >
            {true && <img src={Fire}/>}
        </StyledTrigger>
    );
};
