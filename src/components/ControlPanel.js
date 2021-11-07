import React, {useEffect, useRef, useState} from 'react';
import {Box, Grid, Button} from "@material-ui/core";

import {fromEvent} from "rxjs";
import {filter, pairwise, repeat, map, startWith, take, takeWhile, tap} from "rxjs/operators";

const ControlPanel = ({start, stop, reset, timerOn, dbClick}) => {
    const waitBtn = useRef();
    const [isDbClick, setIsDbClick] = useState(false);

    const handleDbClick = () => {
        if (isDbClick) {
            setIsDbClick(false);
            return dbClick();
        }
    };

    useEffect(() => {
        const dbClickTimeDelay = 300;
        fromEvent(waitBtn.current, 'click')
            .pipe(
                startWith(null),
                // tap(e => console.log(e)),
                pairwise(),
                takeWhile(e => (
                    !e[0] || e[0].target === e[1]?.target)
                ),
                filter(e => (
                    e[0] !== null && e[1]?.timeStamp - e[0].timeStamp <= dbClickTimeDelay)
                ),
                // tap(e => console.log(e)),
                map(e => e[0]),
                take(1),
                repeat()
            )
            .subscribe(e => {
                if (e) {
                    console.log('dbClicked', e);
                    setIsDbClick(true);
                }
            });

    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        {!timerOn && (
                            <Button
                                onClick={start}
                                variant="outlined"
                                color="secondary">Start</Button>
                        )}
                        {timerOn && (
                            <Button
                                onClick={stop}
                                variant="outlined"
                                color="secondary">Stop</Button>
                        )}
                        <Button
                            ref={waitBtn}
                            onClick={handleDbClick}
                            variant="outlined"
                            color="secondary">Wait</Button>
                        <Button
                            onClick={reset}
                            variant="outlined"
                            color="secondary">Reset</Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default ControlPanel;