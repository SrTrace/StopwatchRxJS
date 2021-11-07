import React, {useEffect, useRef, useState} from 'react';
import {Container} from "@material-ui/core";

import Display from "./components/Display";
import ControlPanel from "./components/ControlPanel";

import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

const styles = {
    bgContainer: {
        background: `#ADD8E6`
    }
};

const App = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        const newStream = new Subject();
        interval(10)
            .pipe(
                takeUntil(newStream)
            )
            .subscribe(() => {
                if (timerOn) {
                    setTime(val => val + 1);
                }
            });

        return () => {
            newStream.next();
            newStream.complete();
        }
    }, [timerOn]);

    const dbClick = () => {
        handleWait();
    };

    const handleStart = () => {
        setTimerOn(true);
    };

    const handleStop = () => {
        setTimerOn(false);
        setTime(0);
    };

    const handleWait = () => {
        if (time !== 0) {
            setTimerOn(false);
        }
    };

    const handleReset = () => {
        setTime(0);
        setTimerOn(false);
        if (time !== 0) {
            handleStart();
        }
    };

    return (
        <Container style={styles.bgContainer}>
            <Display time={time}/>
            <ControlPanel
                dbClick={dbClick}
                start={handleStart}
                stop={handleStop}
                reset={handleReset}
                wait={handleWait}
                timerOn={timerOn}
            />
        </Container>
    );
};

export default App;