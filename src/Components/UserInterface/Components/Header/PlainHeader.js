import React from "react";
import { Grid, AppBar, Box, Toolbar } from "@mui/material";
import logo from "../../../Assets/Images/logo.png"
import { useNavigate } from "react-router-dom";

export default function PlainHeader() 
{
    var navigate = useNavigate()

    return(
        <div>
            <Grid item xs={12}>
                <Box sx={{ flexGrow: 1 }} style={{ display:'flex' }}>
                    <AppBar style={{ backgroundColor: '#fff' }} position="fixed">
                        <Toolbar>
                            <Grid container spacing={1}>
                                <Grid item xs={3} sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                                    <img 
                                        src={logo}
                                        width="30%"
                                        style={{ padding:10 }}
                                        onClick={()=>navigate(`/`)}
                                    >
                                    </img>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
        </div>
    )
}