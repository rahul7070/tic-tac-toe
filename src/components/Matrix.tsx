import React, { useEffect, useState } from 'react';

function Matrix() {
  
    const [box, setBox] = useState<string[]>(["","","","","","","","",""])
    const [flag, setFlag] = useState<boolean>(false)
    let [turn, setTurn] = useState<number>(1);
    const [winner, setWinner] = useState<string>("")

    useEffect(()=>{
        if(winner!=""){
            setTimeout(()=>{
                window.location.reload();
            }, 5000)
        }
        setFlag(false)
    },[flag])

  function makeMatrix():JSX.Element[] {
    const matrixElements:JSX.Element[] = [];
    for (let i = 1; i <= 9; i++) {
      const color = i % 2 === 0 ? 'black' : 'white';
      matrixElements.push(<div key={i} className={`${color} box`} id={i.toString()} onClick={handleMark}>{box[i-1]}</div>);
    }
    return matrixElements;
  }

  function handleMark(e:React.MouseEvent<HTMLDivElement, MouseEvent>):void{
    const clickEvent = e.target as HTMLDivElement
    
    if(turn<10 && box[+clickEvent.id-1]==""){
        if(turn%2==0){
            box[+clickEvent.id-1]="X";
        } else{
            box[+clickEvent.id-1]="O";
        }
        setBox(box); setFlag(true)
    }
    for(let i=0; i<7; i=i+3){
        let c=0;
        for(let j=i; j<i+3; j++){
            if(box[i]!="" && box[j]==box[i])c++;
        }
        if(c==3) return setWinner(box[+clickEvent.id-1]+" won the game")
    }
    for(let i=0; i<3; i++){
        let c=0;
        for(let j=i; j<i+7; j=j+3){
            if(box[i]!="" && box[j]==box[i])c++;
        }
        if(c==3) return setWinner(box[+clickEvent.id-1]+" won the game")
    }
        let c=0;
        for(let j=0; j<9; j=j+4){
            if(box[0]!="" && box[j]==box[0])c++;
        }
        if(c==3) return setWinner(box[+clickEvent.id-1]+" won the game")
        c=0;
        for(let j=2; j<8; j=j+2){
            if(box[2]!="" && box[j]==box[2])c++;
        }
        if(c==3) return setWinner(box[+clickEvent.id-1]+" won the game")
        if(turn==9){
            setFlag(true)
            return setWinner("Match Draw")
        } 
        setTurn(++turn);
  }

  return (
    <div>
        {winner!=""?<h3 className='winnerName'>{winner}</h3>:null}
        <div className="main">
            {makeMatrix()}
        </div>
    </div>
  );
}

export default Matrix;
