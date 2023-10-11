import React, { useEffect, useState } from "react";
import useStyles from "./Footer2Css";
import { styled } from "@mui/material/styles";
import { Button, Divider, Grid, TextField } from "@mui/material";
import logo from "../../../Assets/Images/creativegiftsvillalogo.png"
import visa from "../../../Assets/Images/visa.png"
import mastercard from "../../../Assets/Images/mastercard.png"
import paytm from "../../../Assets/Images/paytm.png"
import phonepe from "../../../Assets/Images/phonepe.png"
import gpay from "../../../Assets/Images/gpay.png"
import { FacebookOutlined, Instagram, Twitter, WhatsApp, YouTube } from '@mui/icons-material';
import { getData } from "../../../APIServices/FetchNodeServices";

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

export default function Footer2(){
    const classes = useStyles()
    const [topCategories, setTopCategories] = useState([])

    useEffect(function(){
        fetchCategories()
    }, [])

    const fetchCategories = async() => {
        var result = await getData('category/displayallcategories')
        setTopCategories(result.result)
    }

    const showContact = () => {
        return(
            <Grid item xs={12} style={{ display:'flex', flexDirection:'column', margin:'0% 0% 0% 39%' }}>
                <div style={{ margin:'0% 0% 4% 0%', cursor:'pointer' }}>Contact Us</div>
                <div style={{ margin:'4% 0% 4% 0%', cursor:'pointer' }}>Call: +91 9109472941</div>
                <div style={{ margin:'4% 0% 4% 0%', cursor:'pointer' }}>WhatsApp: +91 9109472941</div>
            </Grid>
        )
    }
    const showAbout = () => {
        return(
            <Grid item xs={12} style={{ display:'flex', flexDirection:'column', margin:'0% 0% 0% 40%' }}>
                <div style={{ margin:'0% 0% 4% 2%', cursor:'pointer' }}>Support Center</div>
                <div style={{ margin:'4% 0% 4% 2%', cursor:'pointer' }}>Customer Support</div>
                <div style={{ margin:'4% 0% 4% 2%', cursor:'pointer' }}>About Us</div>
                <div style={{ margin:'4% 0% 4% 2%', cursor:'pointer' }}>Blogs</div>
            </Grid>
        )
    }
    const showCustomerCare = () => {
        return(
            <Grid item xs={12} style={{ display:'flex', flexDirection:'column', margin:'0% 0% 0% 30%' }}>
                <div style={{ margin:'0% 0% 4% 0%', cursor:'pointer' }}>FAQs and Help</div>
                <div style={{ margin:'4% 0% 4% 0%', cursor:'pointer' }}>Shipping & Delivery</div>
            </Grid>
        )
    }
    const showInformation = () => {
        return(
            <Grid item xs={12} style={{ display:'flex', flexDirection:'column', margin:'0% 0% 0% 29%' }}>
                <div style={{ margin:'0% 0% 4% 0%', cursor:'pointer' }}>Policy Privacy</div>
                <div style={{ margin:'4% 0% 4% 0%', cursor:'pointer' }}>Terms & Conditions</div>
                <div style={{ margin:'4% 0% 4% 0%', cursor:'pointer' }}>Refund & Cancellation Policy</div>
            </Grid>
        )
    }
    const showTopCategories = () => {
        return(
            topCategories.map((item) => {
                return(
                    <Grid item xs={12} style={{ margin:'0% 0% 0% 30%' }}>
                        <div style={{ margin:'0.7% 0% 8% 0%', cursor:'pointer' }}>{item.categoryname}</div>
                    </Grid>
                )
            })
        )
    }
    
    return(
        <div className={classes.root} style={{ bottom: 0, marginTop:'5vh' }}>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={3.5} style={{ margin:'2% 0% 2% 4%', textAlign:"center" }}>
                    <img src={logo} alt="logo" className={classes.img}></img>
                    <div className={classes.tagline}>
                        <u>We Made Your Special Dreams For Your Loved Ones</u>
                    </div>
                    
                    <div className={classes.heading}>Get Social</div>
                    <div>
                        <FacebookOutlined fontSize='medium' style={{ margin:8 }} />
                        <Twitter fontSize='medium' style={{ margin:8 }} />
                        <WhatsApp fontSize='medium' style={{ margin:8 }} />
                        <Instagram fontSize='medium' style={{ margin:8 }} />
                        <YouTube fontSize='medium' style={{ margin:8 }} />
                    </div>
                </Grid>

                <Grid item xs={7} style={{ margin:'2% 0% 0% 2%' }}>
                    <Grid item xs={12} style={{ display:'flex', justifyContent:'center', margin:'3% 0% 2% 0%', }}>
                        <div className={classes.ideastitle}>Get Creative Ideas Tips In Your Inbox</div>
                    </Grid>
                    <Grid item xs={12} style={{ display:'flex', justifyContent:'center', margin:'4% 0% 2% 0%', }}>
                        <Grid item xs={4.8}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='email' size="small" label="Write your Email Id here" variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                sx={{ ":hover": { bgcolor: "#fff", color:'#c6186d' // theme.palette.primary.main
                                },
                                backgroundColor:'#e52c86',
                                height:'5.5vh',
                                //width:'20wh',
                                margin:'0% 0% 0% 5%',
                            }}
                                variant="contained"
                                fullWidth
                                //onClick={()=>handleBuyNow(productData)}
                            >
                                SUBSCRIBE
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid container spacing={2}>
                <Grid item xs={12} style={{ display:'flex', justifyContent:'center', margin:'2% 0% 1% 0%' }}>
                    <Grid item xs={2.5} style={{ display:'flex', flexDirection:'column' }}>
                        <div className={classes.head}>Contact</div>
                        <div className={classes.menu}>
                            {showContact()}
                        </div>
                    </Grid>
                    <Grid item xs={2.5} style={{ display:'flex', flexDirection:'column' }}>
                        <div className={classes.head}>About</div>
                        <div className={classes.menu}>
                            {showAbout()}
                        </div>
                    </Grid>
                    <Grid item xs={2.5} style={{ display:'flex', flexDirection:'column' }}>
                        <div className={classes.head}>Customer Care</div>
                        <div className={classes.menu}>
                            {showCustomerCare()}
                        </div>
                    </Grid>
                    <Grid item xs={2.5} style={{ display:'flex', flexDirection:'column' }}>
                        <div className={classes.head}>Our Information</div>
                        <div className={classes.menu}>
                            {showInformation()}
                        </div>
                    </Grid>
                    <Grid item xs={2.5} style={{ display:'flex', flexDirection:'column' }}>
                        <div className={classes.head}>Top Categories</div>
                        <div className={classes.menu} style={{ display:'flex', flexDirection:'column' }}>
                            {showTopCategories()}
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid container spacing={2}>
                <Grid item xs={12} style={{ display:'flex', justifyContent:'space-around', alignItems:'center', margin:'1.5% 0% 1% 0%' }}>
                    <Grid item xs={4} style={{ display:'flex', justifyContent:'center' }}>
                        <div className={classes.copyright}>
                            Copyright &copy; {new Date().getFullYear()} 
                            <span style={{ color:'#e52c86', fontWeight:700, cursor:'pointer' }}> Creative_Gifts_Villa </span> All rights reserved 
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{ display:'flex', justifyContent:'end', alignItems:'center' }}>
                        <img src={mastercard} alt="mastercard" style={{ width:'10%', margin:'0% 1% 0% 1%' }}></img>
                        <img src={visa} alt="visa" style={{ width:'7%', height:'50%', margin:'0% 2% 0% 1%' }}></img>
                        <img src={paytm} alt="paytm" style={{ width:'7%', margin:'0% 2% 0% 2%' }}></img>
                        <img src={phonepe} alt="phonepe" style={{ width:'10%', margin:'0% 1% 0% 2%' }}></img>
                        <img src={gpay} alt="gpay" style={{ width:'10%', margin:'0% 0% 0% 2%' }}></img>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}