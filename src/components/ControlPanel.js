import React, {useEffect, useRef} from 'react';
import {Box, Grid, Button} from "@material-ui/core";

import {fromEvent} from "rxjs";
import {filter, pairwise, repeat, map, startWith, take, takeUntil, takeWhile, tap} from "rxjs/operators";

const ControlPanel = ({start, stop, reset, timerOn, dbClick}) => {
    const waitBtn = useRef();

    useEffect(() => {
        const dbClickTimeDelay = 300;
        fromEvent(waitBtn.current, 'click')
            .pipe(
                startWith(null),
                pairwise(),
                takeWhile(e => (
                    !e[0] || e[0].target === e[1]?.target)
                ),
                // tap(e=> console.log(e[0])),
                filter(e => (
                    e[0] !== null && e[1].timeStamp - e[0].timeStamp <= dbClickTimeDelay)
                ),
                map(e => e[0]),
                take(1),
                repeat()
            )
            .subscribe(e => {
                console.log('dbClicked', e);
                dbClick();
            });
        // console.log(waitBtn);
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
                            onClick={dbClick}
                            // onClick={wait}
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