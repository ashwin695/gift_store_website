import React from "react";
import useStyles from "./ShortFooterCss";
import { Grid, Divider, Paper } from "@mui/material";
import genuineProduct from "../../../Assets/Images/genuine.png"
import fastDelivery from "../../../Assets/Images/fastdelivery.png"
import securePayment from "../../../Assets/Images/securepayment.png"

export default function ShortFooter()
{
    const classes = useStyles()

    const temp1 = () => {
        return(
            <Grid item xs={12} className={classes.temp}>
                <div className={classes.circlebg}>
                    <img src={genuineProduct} alt="genuine-product" width="55%" />
                </div>
                <div>
                    <span className={classes.footertitle}>
                        GENUINE PRODUCTS
                    </span>
                    <Divider style={{ margin: 10 }}/>
                    <span className={classes.footerdesc}>
                        Self Manufactured Products
                    </span>
                </div>
            </Grid>
        )
    }
    const temp2 = () => {
        return(
            <Grid item xs={12} className={classes.temp}>
                <div className={classes.circlebg}>
                    <img src={fastDelivery} alt="fast-delivery" width="90%" />
                </div>
                <div>
                    <span className={classes.footertitle}>
                        FREE SHIPPING
                    </span>
                    <Divider style={{ margin: 10 }}/>
                    <span className={classes.footerdesc}>
                        For Orders Above Rs.499
                    </span>
                </div>
            </Grid>
        )
    }
    const temp3 = () => {
        return(
            <Grid item xs={12} className={classes.temp}>
                <div className={classes.circlebg}>
                    <img src={securePayment} alt="secure-payment" width="55%" />
                </div>
                <div>
                    <span className={classes.footertitle}>
                        SECURE PAYMENTS
                    </span>
                    <Divider style={{ margin: 10 }}/>
                    <span className={classes.footerdesc}>
                        Using 128-bit SSL Encryption
                    </span>
                </div>
            </Grid>
        )
    }

    return(
        <div className={classes.root}>
            <Paper elevation={8}>
                <Grid container spacing={2} className={classes.bg} style={{ padding: '1.5% 0% 1.5% 0%' }}>
                    <Grid item xs={4}>
                        {temp1()}
                    </Grid>
                    <Grid item xs={4}>
                        {temp2()}
                    </Grid>
                    <Grid item xs={4}>
                        {temp3()}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}