import React, { useEffect, useState } from "react";
import useStyles from "./CustomerBillCss";
import { Button, Divider, Grid, Paper, Dialog, Box, Typography } from "@mui/material";
import { Cancel, Visibility } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { postData, ServerURL } from "../../../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";

export default function CustomerBill1() 
{
    const classes = useStyles()
    const [billProduct, setBillProduct] = useState('')
    const [itemInvoice, setItemInvoice] = useState([])
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [cancel, setCancel] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)

    var params = useParams()
    var navigate = useNavigate()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    useEffect(function(){
        fetchAllOrderData()
        fetchBillDatabyInvoice()
    },[])
    //console.log(itemInvoice)

    const fetchAllOrderData = async() => {
        var body = { orderid: params.orderid }
        var result = await postData('order/displayorderbyid', body)
        setBillProduct(result.data)
    }

    const fetchBillDatabyInvoice = async() => {
        var body = { invoiceno: params.invoiceno }
        var result = await postData('order/orderbyinvoiceno', body)
        setItemInvoice(result.data)
    }

    const handleCancelOrder = async(inv) => {
        var body = { invoiceno: inv }
        var result = await postData('order/cancelorder', body)
        if(result.result)
        {
            fetchAllOrderData()
            fetchBillDatabyInvoice()
            setOpen(false)
            setCancel(true)
            setDialogOpen(true)
            handleOpen2()
        }
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Please Refresh the Page',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const handleOrderNotCancel = () => {
        setOpen(false)
        setCancel(false)
        setDialogOpen(true)
        handleOpen2()
    }

    const fetchOrderBill = () => {
        return(
            itemInvoice.map(function(item){
                return(
                    <Grid item xs={12} style={{margin:10, display:'flex', flexDirection:'row'}}>
                        <Grid item xs={3} style={{ display:'flex', justifyContent:'start' }}>
                            <img src={`${ServerURL}/images/${item.producticon}`} alt='bill-pic' style={{ width:'95%', height:150 }}  />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid item xs={12}>
                                <div style={{fontSize:18, fontWeight:'700', color:'#57606f'}}>{item.productname} - {item.modelname}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>Color -</div>
                                <div style={{color:'#000', fontSize:14, display:'flex', alignItems:'center'}}>&nbsp;{item.colorname}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>Price -</div>
                                <div>
                                    &nbsp;{
                                        item.offerprice > 0 ?
                                        <span>
                                            <span style={{fontSize:14}}>&#8377;{item.offerprice} &nbsp;</span>
                                            <s style={{fontSize:14}}>&#8377;{item.price}</s>
                                            <div style={{fontSize:14, color:'green', fontWeight:'600'}}>You Saved &#8377;{item.price - item.offerprice}</div>
                                        </span>
                                        :
                                        <span style={{fontSize:14}}>{item.price}</span>
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>Quantity -</div>
                                <div style={{color:'#000', fontSize:14, display:'flex', alignItems:'center'}}>&nbsp;{item.qty}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>{item.paymentmode}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                            <div style={{color:'#000', fontWeight:700, fontSize:16}}>Status -</div>
                                <div style={{color:'#000', fontSize:14, display:'flex', alignItems:'center'}}>&nbsp;{item.status}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    return(
        <Grid container spacing={2}>
            <Paper className={classes.function}>
                <Grid item xs={12} className={classes.root}>
                    <div className={classes.fnhd}>All Bill Products</div>
                    <div className={classes.fnhd}>Total Amount Paid &#8377;{billProduct.totalamount}</div>
                </Grid>
                <Grid item xs={12} style={{marginTop:5}}>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid item xs={12} style={{display:'flex', justifyContent:'end', padding:5}}>
                    <Button onClick={()=>handleOpen()} variant="contained" style={{backgroundColor:'#000'}} startIcon={<Cancel />}>
                        Cancel Order
                    </Button>
                </Grid>
                <Grid item xs={12} style={{display:'flex', flexDirection:'column'}}>
                   {fetchOrderBill()}
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} style={{display:'flex', flexDirection:'column', paddingTop:10}}>
                   <Button variant="contained" onClick={()=>navigate(`/orderhistory`)} style={{backgroundColor:'#000', color:'#fff'}} startIcon={<Visibility />}>Show All Orders</Button>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Cancel Order
                    </Typography>
                    <p id="modal-modal-description" style={{ fontFamily:'sans-serif', color:'grey', paddingTop:10  }}>
                        Are you sure you want to cancel this order ?
                    </p>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'end'}}>
                        <Button onClick={()=>handleOrderNotCancel()} style={{ color:'grey', marginTop:10 }}>No</Button>
                        <Button onClick={()=>handleCancelOrder(billProduct.invoiceno)} style={{ color:'grey', marginTop:10 }}>Yes</Button>
                    </Grid>
                    </Box>
                </Dialog>
                {
                    dialogOpen ?
                        <Dialog
                            open={open2}
                            onClose={handleClose2}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                {
                                    cancel ? 
                                    <div>Cancel Order</div>
                                    :
                                    <div>Order Not Cancelled</div>
                                }
                            </Typography>
                            <p id="modal-modal-description" style={{ fontFamily:'sans-serif', color:'grey', paddingTop:10  }}>
                                {
                                    cancel ? 
                                    <div>Your order has been cancelled now</div>
                                    :
                                    <div>Your order has not been cancelled</div>
                                }
                            </p>
                            <Grid item xs={12} style={{display:'flex', justifyContent:'end'}}>
                                <Button onClick={handleClose2} style={{ color:'grey', marginTop:10 }}>OK</Button>
                            </Grid>
                            </Box>
                        </Dialog>
                    :
                    <></>
                }
            </Paper>
        </Grid>
    )
}