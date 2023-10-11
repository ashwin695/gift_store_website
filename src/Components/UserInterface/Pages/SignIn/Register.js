import React, { useState, forwardRef, useEffect } from "react";
import useStyles from "./RegisterCss";
import { styled } from "@mui/material/styles";
import { Paper, Button, Grid, TextField, Divider, InputAdornment, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { postData } from "../../../APIServices/FetchNodeServices";
import { useNavigate, useLocation } from "react-router-dom";
import InfoHeader from "../../Components/Header/InfoHeader";
import { MainHeader } from "../../Components/Header/MainHeader";
import Signin from "../../../Assets/Images/signin.jpg"
import Swal from "sweetalert2";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#c6186d',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#c6186d',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e84393',
        borderWidth:2
      },
      '&:hover fieldset': {
        borderColor: '#c6186d',
        borderLeftWidth: 6,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c6186d',
        borderLeftWidth: 6,
      },
    },
});

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Register()
{
    const classes = useStyles()
    var navigate = useNavigate()
    var location = useLocation()

    const [pwd, setPwd] = useState({ showPwd: false, value:'' });
    const [confirmPwd, setConfirmPwd] = useState({ showConfirmPwd: false, value:'' });
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState(location.state.mobileno)
    const [inputOTP, setInputOTP] = useState('')
    const [OTP, setOTP] = useState(location.state.otp)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(function(){
        setLoading(false)
    },[])
    
    const handleClickShowPassword = () => {
        setPwd({
            ...pwd,
            showPwd: !pwd.showPwd,
        })
    }

    const handleClickShowConfirmPassword = () => {
        setConfirmPwd({
          ...confirmPwd,
          showConfirmPwd: !confirmPwd.showConfirmPwd,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault()
    }

    const handleChange = (prop) => (event) => {
        setPwd({ ...pwd, [prop]: event.target.value });
    }

    const handleConfirmChange = (prop) => (event) => {
        setConfirmPwd({ ...confirmPwd, [prop]: event.target.value })
    }

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const otpGenerator = () => {
        var values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        var otp = ''
        for( var i=1; i<=6; i++ )
        {
            otp += values[parseInt(Math.random()*9)]
        }
        return otp
    }

    const handleResendOTP = () => {
        var otp = otpGenerator()
        alert(otp)
        setOTP(otp)
    }

    const handleSubmit= async() => {
        if(confirmPwd.value === pwd.value)
        {
            if(OTP === inputOTP)
            {
                setLoading(true)
                var body={ emailid: emailId, mobileno: mobileNo, firstname: firstName, lastname: lastName, password: pwd.value}
                var result = await postData("customer/insertcustomer", body)
                if(result.result)
                {
                    setLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registered Successfully',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    var customerRegistered = "Confirmation: Hey Giftie..!!, Thank you for registering in our website, we are always happy to serve with you a great service and gift options for your loved ones. Regards: Creative_Gifts_Villa"
                    alert(customerRegistered)
                    navigate(`/login`)
                }
                else
                {   
                    setLoading(false)
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
            else
            {
                //alert("OTP not entered correctly..!!")
                setMessage( "OTP not entered correctly..!!" )
                {handleClick()}
            }
        }
        else
        {
            //alert("Password/Confirm Password Not Matched...")
            setMessage( "Password & Confirm Password Not Matched..." )
            {handleClick()}
        }
    }

    const handleCheckValidation = () => {
        if( firstName == '' )
        {
            setMessage( "Pls enter your First Name!" )
            {handleClick()}
        }
        else if( lastName == '' )
        {
            setMessage( "Pls enter your Last Name!" )
            {handleClick()}
        }
        else if( emailId == '' )
        {
            setMessage( "Pls enter your Email Id!" )
            {handleClick()}
        }
        else if( pwd.value == '' )
        {
            setMessage( "Pls make Strong Password for security purpose!" )
            {handleClick()}
        }
        else if( OTP == '' )
        {
            setMessage( "Pls enter your OTP!" )
            {handleClick()}
        }
        else
        {   
            {handleSubmit()}
        }
    }

    function handleAlert() {
        return(
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert severity="warning" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }

    const handleRegister = () => {
        return(
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={9} sx={{ margin:'2% 0% 1% 0%'}}>
                    <Paper className={classes.paper} elevation={14} sx={{ borderRadius:8, padding:'3% 3% 3% 3%' }}>
                        <Grid item xs={12}>
                            <Close className={classes.icon} onClick={()=>navigate(`/signin`)} />
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <div className={classes.head}>Register</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{padding:8, margin:5, textAlign:'center'}}>Save Your Some Information!.</div>
                            <Divider />
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={3.5} sx={{ margin:2, display:'flex', justifyContent:'center', alignItems:'center' }}>
                                <img src={Signin} alt="signin-pic" width="100%"></img>
                            </Grid>
                            <Grid item xs={7.5} sx={{ margin:2, textAlign:'center' }}>
                                <div style={{ display:'flex' }}>
                                    <Grid item xs={6} sx={{ margin:1 }}>
                                        <CssTextField 
                                            sx={{ input: { color: '#c6186d' } }}
                                            onChange={(event)=>setFirstName(event.target.value)} 
                                            label="Your First Name" 
                                            variant="outlined" 
                                            size="small" 
                                            type='text'
                                            fullWidth
                                        ></CssTextField>
                                    </Grid>
                                    <Grid item xs={6} sx={{ margin:1 }}>
                                        <CssTextField 
                                            sx={{ input: { color: '#c6186d' } }}
                                            onChange={(event)=>setLastName(event.target.value)} 
                                            label="Your Last Name" 
                                            variant="outlined" 
                                            size="small" 
                                            type='text'
                                            fullWidth
                                        ></CssTextField>
                                    </Grid>
                                </div>

                                <div style={{ display:'flex' }}>
                                    <Grid item xs={12} sx={{ margin:1 }}>
                                        <CssTextField 
                                            /* InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                    <span>+ 91 | </span>
                                                </InputAdornment>
                                            }} */
                                            sx={{ input: { color: '#c6186d' } }}
                                            type='email'
                                            onChange={(event)=>setEmailId(event.target.value)} 
                                            label="Your Email Id" 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                        ></CssTextField>
                                    </Grid>
                                </div>

                                <div style={{ display:'flex' }}>
                                    <Grid item xs={6} sx={{ margin:1 }}>
                                        <CssTextField
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <span style={{ fontSize:12, cursor:'pointer', display:'flex' }}>
                                                        {
                                                            pwd.showPwd 
                                                            ? 
                                                                <VisibilityOff onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> 
                                                            :   
                                                                <Visibility onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />
                                                        }
                                                    </span>
                                                </InputAdornment>,
                                            }} 
                                            sx={{ input: { color: '#c6186d' } }}
                                            value={pwd.value}
                                            onChange={handleChange('value')}
                                            label="Password"
                                            type={pwd.showPwd ? 'text' : 'password'}
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                        ></CssTextField>
                                    </Grid>
                                    <Grid item xs={6} sx={{ margin:1 }}>
                                    <CssTextField
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <span style={{ fontSize:12, cursor:'pointer', display:'flex' }}>
                                                        {
                                                            confirmPwd.showConfirmPwd
                                                            ? 
                                                                <VisibilityOff onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword} /> 
                                                            :   
                                                                <Visibility onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword} />
                                                        }
                                                    </span>
                                                </InputAdornment>,
                                            }} 
                                            sx={{ input: { color: '#c6186d' } }}
                                            value={confirmPwd.value}
                                            onChange={handleConfirmChange('value')}
                                            label="Confirm Password"
                                            type={confirmPwd.showConfirmPwd ? 'text' : 'password'}
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                        ></CssTextField>
                                    </Grid>
                                </div>

                                <div style={{ display:'flex', margin:'3% 0% 0% 0%' }}>
                                    <Grid item xs={12} sx={{ margin:'1% 0% 0% 1.5%' }} className={classes.note}>
                                        Please Enter OTP sent to verify your Mobile Number
                                        <span className={classes.note1}> {mobileNo}</span>
                                    </Grid>
                                </div>
                                <div style={{ display:'flex' }}>
                                    <Grid item xs={1} sx={{ margin:'0% 0% 1% 1.2%' }}>
                                        <span className={classes.change} onClick={()=>navigate(`/login`)}>Change</span>
                                    </Grid>
                                </div>
                                <div style={{ display:'flex' }}>
                                    <Grid item xs={12} sx={{ margin:'0.5% 0% 0% 1.5%' }}>
                                        <CssTextField 
                                            sx={{ input: { color: '#c6186d' } }}
                                            onChange={(event)=>setInputOTP(event.target.value)} 
                                            label="Enter OTP" 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                        ></CssTextField>
                                    </Grid>
                                </div>
                                <div style={{ display:'flex', margin:'0% 0% 0% 0%' }}>
                                    <Grid item xs={1.3} sx={{ margin:'0% 0% 1% 1.2%' }}>
                                        <span className={classes.change} onClick={handleResendOTP}>Resend OTP</span>
                                    </Grid>
                                </div>

                                <div style={{ display:'flex' }}>
                                    <Grid item xs={12} sx={{ margin:1 }}>
                                            <Button
                                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                            },
                                            borderRadius:0,
                                            backgroundColor:'#e52c86', //#fc2779
                                            //height:'8vh',
                                        }}
                                            variant="contained"
                                            fullWidth
                                            //onClick={handleSubmit}
                                            onClick={handleCheckValidation}
                                        >
                                            Register
                                        </Button>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    return(
        <div>
            {
                loading
                ?
                    <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>
                        <Dna
                            visible={loading}
                            height="150"
                            width="200"
                            ariaLabel="dna-loading"
                            wrapperStyle={override}
                            wrapperClass="dna-wrapper"
                        />
                    </Grid>
                :
                    <div>
                        <div><InfoHeader /></div>
                        {/* <div style={{ margin:'26px 0px 0px 0px' }}><MainHeader /></div> */}
            
                        <Grid item xs={12}  sx={{ margin:'10vh 0% 0% 0%' }}>
                            {handleRegister()}
                        </Grid>
            
                        {handleAlert()}
                    </div>
            }
        </div>
    )
}