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
        animation: ${hide} 500ms ease-out;
    }
`

export const Trigger =  function (props: ITrigger){
    let notes: Array<INoteModel | undefined> = new Array(...props.notas as Array<INoteModel | undefined>);
    const [pressed , setPressed] = useState(false);
    const [pressedCorrect , setPressedCorrect] = useState(false);
    const commonTotalLifeTime = CONFIG.trilhaSize/CONFIG.noteVelocity;

    console.log(`[${Date.now()}][Log][OnRender][${props.color}]:`,"props.notas",props.notas)
    const onKeyDown =  (e:any) => {
        console.log(`[${Date.now()}][Log][${props.color}]:`,"props.notas",props.notas)
        console.log(`[${Date.now()}][Log][${props.color}]:`,"notes",notes)
        if(e.keyCode == props.keyCode && !pressed){
            setPressed(true);
            const filtered = props.notas.filter(n=>
                n
                && n.spawnMoment+commonTotalLifeTime<Date.now() + CONFIG.accuracy
                && n.spawnMoment+commonTotalLifeTime>Date.now() - CONFIG.accuracy
            );
            // console.log("onKeyDown",Date.now(),filtered)
            if(filtered.length > 0 ){

                console.log(`[${Date.now()}][Log][${props.color}]:`,filtered)
                props.notas[props.notas.indexOf(filtered[0])] = undefined;
                setPressedCorrect(true);
                props.addCorrect();
            }
        }else if(pressed){
           console.log("Ispressed")
        }
    };

    const onKeyRelease = function (e:any) {
        // console.log(e.keyCode )
        if(e.keyCode == props.keyCode){
            setPressedCorrect(false);
            setPressed(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyRelease);
    }, [props])


    // console.log(`[${Date.now()}][Render]: Trigger Redering`,props,pressed)
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
