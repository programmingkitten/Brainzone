import React, { useState } from 'react'
import styles from "./reactionTime.module.css"


export const ReactionTime = () => {
    const [reactionTime, setReactionTime] = useState(null);
    const [reactState, setReactState] = useState(false);
    const [lookForClick, setLookForClick] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [points, setPoints] = useState(0);

    function reactionTimeStatistics(time) {
        if (time > 350) return 'Worse than avarage';
        if (time > 220) return 'Avarage';
        if (time > 150) return 'Better than avarage';
        return "Insane reaction time!!"
    }

    function onReactionDivClick() {
        if (reactState) {
            if (lookForClick) {
                setPoints(p => p+1)
                setReactionTime(new Date()-startTime)
                setReactState(false); setLookForClick(false);
            } else {
                console.log('Click when you see green!');
            };

            return
        };
        setReactState(true)
        setTimeout(() => {
            const date = new Date();
            setStartTime(date)
            setLookForClick(true)
        }, Math.floor(Math.random() * 5001))
        
    }

    return (
        <div>
            <div onClick={onReactionDivClick} className={`
            ${styles.reactionTimeDiv} 
            ${ lookForClick ? styles.waitingForClick: 'nopent'}
            ${reactState&&!lookForClick ? styles.waitingForGreen: ''}`}>
            {reactionTime ? 
            <div className={styles.reactMessage}><h1>You reacted in {reactionTime}ms!</h1> 
            <span>{reactionTimeStatistics(reactionTime)}</span></div>
            : <div className={styles.reactMessage}>
                <h1>Try to see how fast you can react!</h1>
            </div>}
            
            <h1 className={styles.reactStateMessage}>{reactState ? 'Click when it turns green!': 'Click to start!'}</h1>
            </div>
        </div>
    )
}
