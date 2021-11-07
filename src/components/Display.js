import React from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";

const Display = ({time}) => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} sx={{textAlign: "center"}}>
                    <Paper>
                        <Typography
                            variant="h4"
                            color="textSecondary"
                            component="h2"
                            align='center'
                            gutterBottom>Stopwatch</Typography>
                    </Paper>
                </Grid>

                <Grid container spacing={2} direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item xs={2} sm={2} md={2} sx={{textAlign: "center"}}>
                        <Paper>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                component="h3"
                                align='center'
                                gutterBottom>HH</Typography>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                component="h2"
                                align='center'
                                gutterBottom>{
                                <span>{('0' + Math.floor((time / 360000) % 60)).slice(-2)}</span>}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} sx={{textAlign: "center"}}>
                        <Paper>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                component="h2"
                                align='center'
                                gutterBottom>&nbsp;:&nbsp;</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} sx={{textAlign: "center"}}>
                        <Paper item>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                component="h3"
                                align='center'
                                gutterBottom>MM</Typography>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                component="h2"
                                align='center'
                                gutterBottom>{
                                <span>{('0' + Math.floor((time / 6000) % 60)).slice(-2)}</span>}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} sx={{textAlign: "center"}}>
                        <Paper>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                component="h2"
                                align='center'
                                gutterBottom>&nbsp;:&nbsp;</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} sx={{textAlign: "center"}}>
                        <Paper>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                component="h3"
                                align='center'
                                gutterBottom>SS</Typography>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                component="h2"
                                align='center'
                                gutterBottom>{
                                <span>{('0' + Math.floor((time / 100) % 60)).slice(-2)}</span>}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Display;