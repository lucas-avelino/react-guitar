import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export interface INoteModel{
    spawnMoment: number,
    id: number,
    color?: string,
    
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
}

const rotate = (props: IMovement) => keyframes`
    from {
        transform: translate(0, ${props.initialPosition}px);
        ${(()=>{console.log(props); return "";})()}
    }
    to {
        transform: translate(0, ${props.totalDistance}px);
    }
`;

const StyledNote = styled.div<IMovement>`
    width: 25px;
    height: 25px;
    ${(props)=>'background-color: '+props.color};
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 8px;
    animation: 
        ${(props) => {
            return rotate(props);
        }}
        ${(props) => {return props.remainLifeTime;}}ms 
        linear;
        `
export const Note = React.memo(function (props: INoteInfo){
    const now = Date.now();
    const totalLifeTime = props.heigth/props.velocity;
    const atualRunTime = (now-props.spawnMoment);
    const percentageRunned = atualRunTime/totalLifeTime;

    // console.log('atualRunTime:', atualRunTime,percentageRunned)
    // console.log('lifeTime:', totalLifeTime)
    // console.log('initialPosition:', percentageRunned*props.heigth)
    // console.log('tempo ainda falta:', (props.lifeTime-(props.now-props.spawnMoment)))
    // console.log('timer:', (props.lifeTime-(props.now-props.spawnMoment))/props.velocity)
            
    return(<>
        {totalLifeTime-(now-props.spawnMoment) > 0 && 
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
            {props.id}
            </StyledNote>
        }
        </>
    );
});