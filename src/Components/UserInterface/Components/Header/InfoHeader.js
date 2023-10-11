import React from "react";
import useStyles from "./InfoHeaderCss";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from "@mui/material";

export default function InfoHeader(){
    const classes = useStyles()

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute" style={{ backgroundColor:'#e52c86', height:30}} elevation={3}>
                <Toolbar>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid item xs={3.5}>
                                <div className={classes.info}>
                                    <span className={classes.txt}>Contact - </span>
                                    <a href="tel:+919109472941" className={classes.txtdecor}> 9109472941</a>
                                    <span className={classes.txt}> | </span>
                                    <a href="mailto: guptaashwin695@gmail.com" className={classes.txtdecor}>creativegiftsvilla01@gmail.com</a>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
}