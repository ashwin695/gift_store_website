import React, { useEffect, useState } from "react";
import useStyles from "./FooterCss";
import { Divider, Grid, Paper } from "@mui/material";
import logo from "../../../Assets/Images/creativegiftsvillalogo.png"
import { FacebookOutlined, Instagram, Twitter, WhatsApp, YouTube } from '@mui/icons-material';
import { getData } from "../../../APIServices/FetchNodeServices";
import ShortFooter from "./ShortFooter";

export default function Footer(){
    const classes = useStyles()
    const [mainMenu, setMainMenu] = useState([])

    useEffect(function(){
        fetchMainMenu()
    }, [])

    const fetchMainMenu = async() => {
        var result = await getData('category/displayallcategories')
        setMainMenu(result.result)
    }

    const showMainMenu = () => {
        return(
            mainMenu.map((item) => {
                return(
                    <div style={{ margin: 10 }}>• {item.categoryname}</div>
                )
            })
        )
    }

    const showInformation = () => {
        return(
            <Grid item xs={12}>
                <div style={{ margin: 10 }}>• About Us</div>
                <div style={{ margin: 10 }}>• Shipping & Delivery</div>
                <div style={{ margin: 10 }}>• Privacy Policy</div>
                <div style={{ margin: 10 }}>• Terms of Service</div>
                <div style={{ margin: 10 }}>• Refund Policy</div>
            </Grid>
        )
    }

    const showQuickLinks = () => {
        return(
            <Grid item xs={12}>
                <div style={{ margin: 10 }}>• First's Choice</div>
                <div style={{ margin: 10 }}>• Bestseller</div>
                <div style={{ margin: 10 }}>• Trending</div>
                <div style={{ margin: 10 }}>• Offer Zone</div>
                <div style={{ margin: 10 }}>• Birthday's & Anniversaries</div>
            </Grid>
        )
    }

    const showYearlySpecial = () => {
        return(
            <Grid item xs={12}>
                <div style={{ margin: 10 }}>• Birthday's</div>
                <div style={{ margin: 10 }}>• Anniversaries</div>
                <div style={{ margin: 10 }}>• Couple Special</div>
                <div style={{ margin: 10 }}>• For Her</div>
                <div style={{ margin: 10 }}>• For Him</div>
                <div style={{ margin: 10 }}>• Corporate</div>
                <div style={{ margin: 10 }}>• Wedding Brooch</div>
            </Grid>
        )
    }

    return(
        <div className={classes.root}>
            <Paper elevation={8}>
                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ margin:20, textAlign:"center" }}>
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

                    <Grid item xs={7.5} style={{ display:'flex' }}>
                        <div style={{ margin:40 }}>
                            <div className={classes.head}>
                                Main Menu
                            </div>
                            <div className={classes.menu}>
                                {showMainMenu()}
                            </div>
                        </div>
                        <div style={{ margin:40 }}>
                            <div className={classes.head}>
                                Information
                            </div>
                            <div className={classes.menu}>
                                {showInformation()}
                            </div>
                        </div>
                        <div style={{ margin:40 }}>
                            <div className={classes.head}>
                                Quick Links
                            </div>
                            <div className={classes.menu}>
                                {showQuickLinks()}
                            </div>
                        </div>
                        <div style={{ margin:40 }}>
                            <div className={classes.head}>
                                Yearly Special
                            </div>
                            <div className={classes.menu}>
                                {showYearlySpecial()}
                            </div>
                        </div>
                    </Grid>

                    {/* <Grid item xs={3.5} style={{ margin:20, textAlign:"center", background:'pink' }}>
                        
                    </Grid> */}
                </Grid>

                <ShortFooter />
            </Paper>
        </div>
    )
}