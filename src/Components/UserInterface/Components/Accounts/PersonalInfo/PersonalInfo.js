import React, { useState, useEffect } from "react";
import useStyles from "./PersonalInfoCss";
import { styled, alpha } from "@mui/material/styles";
import { Button, Divider, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { postData } from "../../../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
    ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        borderBottom: '2px solid #e84393',
        overflow: 'hidden',
        borderRadius: 6,
        input: { color: '#000'},
        backgroundColor: theme.palette.mode === 'light' ? 'white smoke' : '#c6186d',
        '&:hover': {
            backgroundColor: 'transparent',
            input: { color: '#c6186d'},
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha('#c6186d', 0.35)} 0 0 0 2px`,
            borderColor: '#c6186d',
        },
    },
    '& label.Mui-focused': {
        color: '#c6186d',
    },
}));

export default function PersonalInfo(props)
{
    const classes = useStyles()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [emailId, setEmailId] = useState()
    const [refresh, setRefresh] = useState(false)

    const mobileNo = props.mobileNo

    useEffect(function(){
        fetchCustomerData()
    },[])

    const fetchCustomerData = async() => {
        let body = {mobileno: mobileNo}
        let result = await postData('customer/displaydatabymobileno', body)
        if(result.result)
        {
            setFirstName(result.data.firstname)
            setLastName(result.data.lastname)
            setEmailId(result.data.emailid)
        }
        setRefresh(!refresh)
    }

    const handleSubmit = async() => {
        var body = {firstname: firstName, lastname: lastName, mobileno: mobileNo, emailid: emailId}
        var result = await postData('customer/updatedetails', body)
        if(result.result)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your Details are Updated',
                showConfirmButton: false,
                timer: 2000
            })
            fetchCustomerData()
        }
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const showInformation = () => {
        return(
            <Paper sx={{ margin:'3% 2% 2% 2%', padding:'1% 1% 1% 1%' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ margin:'2% 2% 0% 2%' }}>
                        <div className={classes.fnhd}>Personal Information</div>
                        <div className={classes.fnsubhd}>You can Update your Details Here</div>
                    </Grid>
                    <Grid item xs={11.5} sx={{ margin:'1.5% 0% 0% 2%' }}>
                        <Divider className={classes.divider}/>
                    </Grid>
                    <Grid item xs={12} sx={{ margin:'3% 3% 0% 3%' }}>
                        <RedditTextField active sx={{ input: { color: '#c6186d' } }} value={firstName} type='text' onChange={(event)=>setFirstName(event.target.value)} size="small" label="First Name" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{ margin:'1% 3% 0% 3%' }}>
                        <RedditTextField sx={{ input: { color: '#c6186d' } }} value={lastName} type='text' onChange={(event)=>setLastName(event.target.value)} size="small" label="Last Name" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{ margin:'1% 3% 0% 3%' }}>
                    <RedditTextField 
                        sx={{ input: { color: '#c6186d' } }} 
                        type='tel' 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <span>+ 91 | </span>
                            </InputAdornment>
                        }}
                        value={props.mobileNo} 
                        size="small" 
                        label="Phone" 
                        variant="filled" 
                        disabled
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sx={{ margin:'1% 3% 0% 3%' }}>
                    <RedditTextField sx={{ input: { color: '#c6186d' } }} value={emailId} type='email' onChange={(event)=>setEmailId(event.target.value)} size="small" label="Email Id" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{ margin:'2% 3% 2% 3%' }}>
                        <Button
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                            },
                            borderRadius:0,
                            backgroundColor:'#e52c86',
                            height:'6vh',
                            }}
                            className={classes.btnsubmit}
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Update Details
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    return(
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={11}>
                {showInformation()}
            </Grid>
        </Grid>
    )
}