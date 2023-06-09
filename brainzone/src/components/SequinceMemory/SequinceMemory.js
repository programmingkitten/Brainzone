import React, { memo, useState } from 'react'
import styles from './SequinceMemory.module.css'
import useSound from 'use-sound';
import successSound from '../../audioFiles/success.mp3'
import errorSound from '../../audioFiles/error.mp3'
export const SequinceMemory = () => {

  const [level, setLevel] = useState(1);
  const [memoriseOrder, setMemoriseOrder] = useState([])
  const [currentHighlight, setCurrentHighlight] = useState(null);
  const [timeOutBonus, setTimeOutBonus] = useState(800);
  const [points, setPoints] = useState(0);
  const [playErrorSound] = useSound(errorSound);
  const [playSuccessSound] = useSound(successSound);
  const [gamesHistory, setGamesHistory] = useState([]);
  const levelGenerator = (memoriseBoxesCount, rows, cols) => {
    return {'memoriseBoxesCount': memoriseBoxesCount, 
            'rows': rows,
            'cols': cols,
          }
  }

  const hightlightMemoriseBoxes = (numbers) => {
    let timeOut = 500;
    let timeBetweenDifferentHighlights = 80
    for (let boxIndex of numbers) {
      setTimeout(() => setCurrentHighlight(boxIndex), timeOut) 
      setTimeout(() => setCurrentHighlight(999), timeOut-timeBetweenDifferentHighlights) 
      timeOut += timeOutBonus
    }
    setTimeout(() => setCurrentHighlight(999), 500+timeOutBonus*numbers.length)
  }

  const createMemoriseOrder = () => {
    const levelData = levels[level]
    const memoriseBoxesCount = levelData.memoriseBoxesCount
    const numbers = [];
    for (let i=0; i<memoriseBoxesCount; i++) {
      const number = Math.floor(Math.random() * levelData.rows*levelData.cols)
      
      numbers.push(number)
      console.log(numbers)
    }

    setMemoriseOrder(numbers);
    hightlightMemoriseBoxes(numbers);
  }

  function onBoxClick(boxIndex) {

    if (boxIndex != memoriseOrder[0]) {
      playErrorSound();
      return
    } 

    playSuccessSound();
    memoriseOrder.shift();

    if (memoriseOrder.length == 0) {
    setPoints(state => state+level)
    createMemoriseOrder();
    return
    }
  }

  const levels = {
    1: levelGenerator(4, 3, 3),
    2: levelGenerator(5, 3, 3),
    3: levelGenerator(6, 3, 3),
    4: levelGenerator(9, 3, 3),
    5: levelGenerator(12, 3, 3),
    6: levelGenerator(14, 3, 3),
    7: levelGenerator(17, 3, 3),
    8: levelGenerator(21, 3, 3),
  }

  return (
    
    <div >
      <h1> Points: {points}</h1>
      <h1>Current level {level}; Boxes to memorise: {levels[level].memoriseBoxesCount}</h1>
      <input type='range' value={level} onChange={(e) => setLevel(Number(e.target.value))} min={1} max={Object.values(levels).length}></input>
      
      <div className={styles.sequinceBoxWrapper}>

      <div className={styles.sequinceBox}>
          {[...Array(levels[level].rows)].map((x, rowIndex) => {
          
          return <div className={styles.row}>
            {[...Array(levels[level].cols)].map((x, colIndex) => {
              return <div className={styles.card} onClick={() => onBoxClick(rowIndex+rowIndex+colIndex+rowIndex)}>
                {currentHighlight==rowIndex+rowIndex+colIndex+rowIndex ? <div className={styles.hightlight}></div>: ''}
              </div>
            }) }
          </div>})}
          </div>
      </div>

      <button onClick={createMemoriseOrder}>Start</button>
    </div>
   
  )
}
