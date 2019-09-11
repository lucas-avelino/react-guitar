import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export interface INoteModel{
    spawnMoment: number,
    id: number,
    color?: string,
    totalLifeTime?: number,
    end?: number,
}

interface INoteInfo{
    spawnMoment: number,
    color: string,
    velocity: number,
    heigth: number,
    id: number,
    end?: number,
}

interface IMovement{
    color: string,
    velocity: number,
    initialPosition: number,
    totalDistance: number,
    runedTime: number,
    percentageRunned: number,
    totalLifeTime: number,
    remainLifeTime: number,
    children?: any,
    end?: number
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
    & > .disk{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: white;
        width: 25px;
        height: 15.625‬px;
    }
    & > .extend{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        ${(props)=>'background-color: '+props.color};
        width: 25px;
        height: ${(props)=>props.end!*20}px;
        bottom: 22px;
    }
`;

export const Note = React.memo(React.forwardRef(function (props: INoteInfo){
    const now = Date.now();
    const sizeMod = (props.end||0) * 20;
    const totalLifeTime = (props.heigth+sizeMod)/props.velocity;
    const atualRunTime = (now-props.spawnMoment);
    const percentageRunned = atualRunTime/totalLifeTime;

    console.log(`[${now}][Render]: Note`,props.color,props,sizeMod);
    return(<>
        {
            totalLifeTime-(now-props.spawnMoment) > 0 && 
            <StyledNote 
                runedTime={atualRunTime}
                percentageRunned={percentageRunned}
                initialPosition={percentageRunned*props.heigth}
                totalDistance={props.heigth+sizeMod}
                totalLifeTime={totalLifeTime}
                remainLifeTime={totalLifeTime-(now-props.spawnMoment)}
                color={props.color}
                velocity={props.velocity}
                end={props.end}
            >
            {props.end &&
                <div className="extend"></div>
            }
            <div className="disk"> {props.id} </div>
            
            </StyledNote>
            
        }
        </>
    );
}));