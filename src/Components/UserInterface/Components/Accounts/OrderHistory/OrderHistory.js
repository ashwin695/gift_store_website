import React, {useEffect, useState} from "react";
import useStyles from "./OrderHistoryCss";
import { Divider, Grid, MenuItem, Paper } from "@mui/material";
import { ServerURL, postData } from "../../../../APIServices/FetchNodeServices";
import moment from "moment";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from "react-router-dom";

export default function OrderHistory(props){
    const classes = useStyles()
    const [orderStatus, setOrderStatus] = useState({ status:false, data:[] })
    const [orderLength, setOrderLength] = useState('')

    var navigate = useNavigate()

    useEffect(function(){
        checkOrder()
    },[])
    //console.log(orderStatus.data)

    const checkOrder = async() => {
        var body = {customermobileno: props.mobileNo}
        var result = await postData('order/checkcustomerorder', body)
        if(result.result)
        {
            setOrderLength(result.data.length)
            setOrderStatus({ status: result.result, data: result.data })
        }
        
    }

    const handleShowBill = (item) => {
        navigate(`/myaccounts/orderhistory/bill/${item.orderid}/${item.invoiceno}`)
    }

    const fetchOrders = () => {
        return orderStatus.data.map((item) => {
            return(
                <div>
                    <MenuItem className={classes.btn} value={item.orderid} onClick={()=>handleShowBill(item)}>
                        <Grid item xs={12} className={classes.root}>
                            {/* <Grid item xs={4} className={classes.row}>
                                <div>{moment(item.orderdate).format("YYYY/MM/DD")}</div>
                            </Grid> */}
                            <Grid item xs={1.2}>
                                <img src={`${ServerURL}/images/${item.producticon}`} alt='checkout-img' className={classes.orderhistoryimg} />
                            </Grid>
                            <Grid item xs={4.5} sx={{ margin:'1% 0% 1% 1%' }} className={classes.row}>
                                <div className={classes.productname}>{item.productname}</div> 
                            </Grid>
                            <Grid item xs={1} sx={{ margin:'1% 0% 1% 1%' }} className={classes.row}>
                                <div>{item.invoiceno}</div>
                            </Grid>
                            <Grid item xs={1} sx={{ margin:'1% 0% 1% 1%', display:'flex', justifyContent:'center' }} className={classes.row}>
                                <ReceiptIcon style={{cursor:'pointer', color:'#e52c86'}} />
                            </Grid>
                            <Grid item xs={2} sx={{ margin:'1% 0% 1% 1%' }} className={classes.row}>
                                <div className={classes.center}>{item.orderstatus}</div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                    <Divider />
                </div>
            )
        })
    }

    return(
        <Grid item xs={12}>
            <Paper sx={{ margin:'3% 2% 2% 2%', padding:'1% 1% 1% 1%' }}>
                <Grid item xs={12} sx={{ margin:'2% 2% 2% 2%' }}>
                    {
                        orderStatus.status 
                        ?
                            <Grid item xs={12}>
                                <Grid item xs={12} className={classes.root}>
                                    <div className={classes.fnhd}>MY ORDER</div>
                                    <div className={classes.lnth}>{orderLength} order had placed from your Account</div>
                                </Grid>
                                <Grid item xs={12} style={{marginTop:5}}>
                                    <Divider className={classes.divider}/>
                                </Grid>
                                <Grid item xs={12} style={{marginTop:5, fontWeight:600}} className={classes.root}>
                                    <Grid item xs={10.5} className={classes.center}>
                                       Product
                                    </Grid>
                                    <Grid item xs={2} className={classes.end}>
                                        Order No.
                                    </Grid>
                                    <Grid item xs={2.4} className={classes.end}>
                                        Show Bill
                                    </Grid>
                                    <Grid item xs={4.5} className={classes.center}>
                                        Status
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{marginTop:0}}>
                                    {fetchOrders()}
                                </Grid>
                            </Grid>
                        :
                            <Grid item xs={12} sx={{ fontSize:26, fontWeight:700, color:'#e52c86' }}>
                                No Order has been Placed from your Account
                            </Grid>
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}