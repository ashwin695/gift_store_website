import React, { useState, forwardRef } from "react";
import useStyles from "./LoginCss";
import { styled } from "@mui/material/styles";
import { Paper, Button, Grid, TextField, Divider, InputAdornment, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Close } from "@mui/icons-material";
import { postData } from "../../../APIServices/FetchNodeServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoHeader from "../../Components/Header/InfoHeader";
import { MainHeader } from "../../Components/Header/MainHeader";
import Signin from "../../../Assets/Images/signin.jpg"
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

export default function Login()
{
    const classes = useStyles()
    //const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [customerData, setCustomerData] = useState([])
    const [visible, setVisible] = useState(false)
    const [btnVisible, setBtnVisible] = useState(true)
    const [generatedOTP, setGeneratedOTP] = useState('')
    const [inputOTP, setInputOTP] = useState('')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)

    var dispatch = useDispatch()
    var navigate = useNavigate()

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

    const handleCheckValidation = () => {
        if( mobileNo == '' )
        {
            setMessage( "Enter the Mobile No..!!" )
            {handleClick()}
        }
        else
        {
            setLoading(true)
            {handleCheck()}
        }
    }

    const handleCheck = async() => {
        var body = {mobileno: mobileNo}
        var result = await postData('customer/checkusermobileno', body)
        if(result.result)
        {
            setBtnVisible(false)
            setVisible(true)
            var otp = otpGenerator()
            var otpMsg = "Verification: Hey Giftie..!!, "+otp+" is your One Time Password for mobile verification at Creative_Gifts_Villa."
            setGeneratedOTP(otp)
            setCustomerData(result.data)
            alert(otpMsg)
            //var body = {mobileno: mobileNo, otp: otpMsg}
            //await postData('customer/smsotp', body)
            setLoading(false)
        }
        else
        {
            var otp = otpGenerator()
            var otpMsg = "Verification: Hey Giftie..!!, "+otp+" is your One Time Password for mobile verification at Creative_Gifts_Villa."
            alert(otpMsg)
            navigate(`/register`, {state: {otp: otp, mobileno: mobileNo}})
            setLoading(false)
        }
    }

    const handleCheckOTP = async() => {
        setLoading(true)
        if(generatedOTP === inputOTP)
        {
            var body = {mobileno: mobileNo}
            var result = await postData('customer/assigntoken', body)
            if(result.result)
            {
                dispatch({ type: 'Add_Customer', payload: [mobileNo, customerData]})
                navigate(`/checkout`)
                localStorage.setItem('id', customerData.customerid)
                setLoading(false)
            }
        }
        else
        {
            setLoading(false)
            alert("incorrect otp")
        }
    }

    const handleDisableOtp=()=>{
        setVisible(false)
        setBtnVisible(true)
        setMobileNo('')
    }

    const handleResendOTP = () => {
        var otp = otpGenerator()
        alert(otp)
        setGeneratedOTP(otp)
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

    const handleLogin = () => {
        return(
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={3.5} sx={{ margin:'2% 0% 1% 0%'}}>
                    <Paper className={classes.paper} elevation={14} sx={{ borderRadius:8, padding:'4% 5% 4% 5%' }}>
                        <Grid item xs={12}>
                            <Close className={classes.icon} onClick={()=>navigate(`/signin`)} />
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <div className={classes.head}>Login</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{padding:8, margin:5, textAlign:'center'}}>Login/Register and Shop Now!.</div>
                            <Divider />
                        </Grid>

                        <Grid item xs={12} sx={{ margin:2, textAlign:'center' }}>
                            <img src={Signin} alt="signin-pic" width="65%" height="65%"></img>
                            <CssTextField 
                                sx={{ input: { color: '#c6186d' } }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <span onClick={()=>handleDisableOtp()} style={{color:'red', fontSize:12, cursor:'pointer'}}>Change</span>
                                    </InputAdornment>,
                                }} 
                                value={mobileNo} 
                                onChange={(event)=>setMobileNo(event.target.value)} 
                                type='tel'
                                label="Enter Mobile No." 
                                variant="outlined" 
                                size="small" 
                                fullWidth
                                required
                            ></CssTextField>

                            {
                                btnVisible
                                ?
                                    <Grid item xs={12} sx={{ margin:'4% 0% 0% 0%' }}>
                                        <Button
                                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                            },
                                            borderRadius:0,
                                            backgroundColor:'#e52c86', //#fc2779
                                            //height:'8vh',
                                        }}
                                            variant="contained"
                                            fullWidth
                                            //onClick={()=>handleCheck()}
                                            onClick={handleCheckValidation}
                                        >
                                            Proceed
                                        </Button>
                                    </Grid>
                                :
                                    <></>
                            }
                            {
                                visible
                                ?
                                    <Grid item xs={12}>
                                        <div className={classes.note}>Please Enter OTP sent to verify your Email Address.</div>
                                        <CssTextField 
                                            sx={{ input: { color: '#c6186d' } }}
                                            onChange={(event)=>setInputOTP(event.target.value)} 
                                            label="Enter OTP" 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                        ></CssTextField>
                                        <div className={classes.resend} onClick={handleResendOTP}>Resend OTP</div>

                                        <Grid item xs={12}>
                                            <Button
                                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                                },
                                                borderRadius:0,
                                                backgroundColor:'#e52c86', //#fc2779
                                                //height:'8vh',
                                                margin:'4% 0% 0% 0%',
                                            }}
                                                variant="contained"
                                                fullWidth
                                                onClick={handleCheckOTP}
                                            >
                                                Verify
                                            </Button>
                                        </Grid>
                                    </Grid>
                                :
                                    <Grid item xs={12}></Grid>
                            }
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
                            {handleLogin()}
                        </Grid>

                        {handleAlert()}
                    </div>
            }
        </div>
    )
}