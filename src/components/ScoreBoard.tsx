import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Note, INoteModel } from './Note';


interface IScoreBoard{
    // points: number;
}
interface IScoreBoardState{
    correctNotes: number;
    passedNotes: number;
}
const StyledScoreBoard = styled.div<{
    // pressed: boolean,
    // color: string,
}>`
    position: absolute;
    background-color: white;
    width: 100px;
    height: 100px;
    left: 0px;
    bottom: 0px;
    
  
`
export class ScoreBoard extends React.Component<IScoreBoard,IScoreBoardState>{
    // points: number = 0;
    constructor(props){
        super(props)
        this.state ={
            correctNotes: 0,
            passedNotes: 0,
            
        }
    }
    render(){
        return  <StyledScoreBoard>
            Acertos: {this.state.correctNotes}
        </StyledScoreBoard>
    }
}
// export const ScoreBoard =  function (props: IScoreBoard){
//     return(
//         <>
//             {props.points}
//         </>
//     );
// };
