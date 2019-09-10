import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export interface INoteModel{
    spawnMoment: number,
    id: number,
    color?: string,
    totalLifeTime?: number,
}

interface INoteInfo{
    spawnMoment: number,
    color: string,
    velocity: number,
    heigth: number,
    id: number,
}

interface IMovement{
    color: string,
    velocity: number,
    initialPosition: number,
    totalDistance: number,
    runedTime: number,
    percentageRunned: number,
    totalLifeTime: number,
    remainLifeTime: number;
    children?: any;
}

const rotate = (props: IMovement) => keyframes`
    from {
        transform: translate(0, ${props.initialPosition}px);
        opacity: 1;
    }
    to {
        transform: translate(0, ${props.totalDistance}px);
        opacity: 1;
    }
`;

const StyledNote = styled.div<IMovement>`
    width: 40px;
    height: 25px;
    ${(props)=>'background-color: '+props.color};
    border-radius: 100%;
    display: flex;
    opacity: 0;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 5px;
    animation: 
        ${(props) => {
            return rotate(props);
        }}
        ${(props) => {return props.remainLifeTime;}}ms 
        linear;
    & > div{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: white;
        width: 25px;
        height: 15.625‬px;
    }
`;

export const Note = React.memo(React.forwardRef(function (props: INoteInfo){
    const now = Date.now();
    const totalLifeTime = props.heigth/props.velocity;
    const atualRunTime = (now-props.spawnMoment);
    const percentageRunned = atualRunTime/totalLifeTime;

    // console.log(`[${now}][Render]: Note`,props.color,props);
    return(<>
        {
            totalLifeTime-(now-props.spawnMoment) > 0 && 
            <StyledNote 
                runedTime={atualRunTime}
                percentageRunned={percentageRunned}
                initialPosition={percentageRunned*props.heigth}
                totalDistance={props.heigth}
                totalLifeTime={totalLifeTime}
                remainLifeTime={totalLifeTime-(now-props.spawnMoment)}
                color={props.color}
                velocity={props.velocity}
            >
            <div>{props.id}</div>
            
            
            </StyledNote>
            
        }
        </>
    );
}));