import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Note, INoteModel } from './Note';
import Fire from '../img/fire.gif';
import { CONFIG } from './Guitar';

interface ITrigger{
    color: string;
    keyCode: number;
    notas: Array<INoteModel>;
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
        -webkit-animation: ${hide} 500ms ease-out;
        animation: ${hide} 500ms ease-out;
    }
`

export const Trigger = React.memo((props: ITrigger) => {
    const [pressedState , setPressedState] = useState(false);
    const [pressedCorrectState , setPressedCorrectState] = useState(false);
    // let notes: Array<INoteModel> = new Array(...props.notas as Array<INoteModel>);
    let pressed = false;
    let pressedCorrect = false;
    let lastNoteFound: undefined | INoteModel;
    const commonTotalLifeTime = CONFIG.trilhaSize/CONFIG.noteVelocity;

    // if(props.color == "green") console.log(`[${Date.now()}][Log][OnRender][${props.color}]:`,"props.notas",props.notas)
    const onKeyDown =  (e:any) => {
        if(props.color == "green") console.log(`[${Date.now()}][Log][${props.color}]:`,"props.notas",props.notas)
        // if(props.color == "green") console.log(`[${Date.now()}][Log][${props.color}]:`,"notes",notes)
        // console.log(pressed, pressedCorrect)
        if(e.keyCode == props.keyCode && !pressed){
            setPressedState(true);
            pressed = true;
            const filtered = props.notas.filter(n=>
                n
                && n.spawnMoment + commonTotalLifeTime < Date.now() + CONFIG.accuracy
                && n.spawnMoment + commonTotalLifeTime > Date.now() - CONFIG.accuracy
            );
            // console.log("onKeyDown",Date.now(),filtered)
            if(filtered.length > 0 ){

                // console.log(`[${Date.now()}][Log][${props.color}]:`,filtered)
                lastNoteFound =  props.notas[props.notas.indexOf(filtered[0])];
                delete props.notas[props.notas.indexOf(filtered[0])];
                setPressedCorrectState(true);
                pressedCorrect = true;
                console.log("oi")
                props.addCorrect();
            }
        }else if(lastNoteFound && lastNoteFound.end && Date.now() < lastNoteFound.spawnMoment + lastNoteFound.totalLifeTime!){
            if(props.color == "green") console.log("Ispressed")
            setPressedCorrectState(true);
            pressedCorrect = true;
            console.log("oi")
            props.addCorrect();
        }
    };

    const onKeyRelease = function (e:any) {
        console.log("release",e.keyCode )

        if(e.keyCode == props.keyCode){
            pressedCorrect = pressed = false;
            setPressedCorrectState(false);
            setPressedState(false);
        }
    }
    useEffect(()=>{
        console.log("oi")
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("keyup", onKeyRelease);
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyRelease);
    },[props.notas])


    // console.log(`[${Date.now()}][Render]: Trigger Redering`,props,pressed)
    return(
        <StyledTrigger 
            {...props} 
            pressed={pressedState}
            pressedCorrect={pressedCorrectState}
        >
            {true && <img src={Fire}/>}
        </StyledTrigger>
    );
});
