import React from "react";
import useStyles from "./SignInCss";
import { Paper, Button, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoHeader from "../../Components/Header/InfoHeader";
import { MainHeader } from "../../Components/Header/MainHeader";
import { Close } from "@mui/icons-material";
import Signin from "../../../Assets/Images/signin.jpg"
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function SignIn()
{
    const classes = useStyles()

    var navigate = useNavigate()

    const handleSignIn = () => {
        return(
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={3.5} sx={{ margin:'2% 0% 1% 0%'}}>
                    <Paper className={classes.paper} elevation={14} sx={{ borderRadius:8, padding:'4% 5% 4% 5%' }}>
                        <Grid item xs={12}>
                            <Close className={classes.icon} onClick={()=>navigate(`/`)} />
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <div className={classes.head}>Sign In</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{padding:8, margin:5, textAlign:'center'}}>To quickly find your favourites items, saved addresses and payments.</div>
                            <Divider />
                        </Grid>

                        <Grid item xs={12} sx={{ margin:2, textAlign:'center' }}>
                            <div>Register and Explore the GiftStore</div>
                            <img src={Signin} alt="signin-pic" width="65%" height="65%"></img>
                            <Button
                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },
                                borderRadius:0,
                                backgroundColor:'#e52c86', //#fc2779
                                //height:'8vh',
                            }}
                                variant="contained"
                                fullWidth
                                onClick={()=>navigate(`/login`)}
                            >
                                Enter Mobile Number
                            </Button>
                            <div className={classes.terms}>
                                By continuing, you agree that you have read and accept our 
                                <span style={{ color:'red', cursor:'pointer' }}> T&Cs </span>
                                and
                                <span style={{ color:'red', cursor:'pointer' }}> Privacy Policy </span>
                                .
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    return(
        <div>
            <div><InfoHeader /></div>
            {/* <div style={{ margin:'26px 0px 0px 0px' }}><MainHeader /></div> */}

            <Grid item xs={12} sx={{ margin:'10vh 0% 0% 0%' }}>
                {handleSignIn()}
            </Grid>
        </div>
    )

}