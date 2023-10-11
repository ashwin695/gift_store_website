import React, { useEffect, useState } from "react";
import useStyles from "./OrderSuccessCss";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react"
import { Grid, Paper, Divider, Button, Box, Modal, Typography } from "@mui/material";
import { Dna } from "react-loader-spinner";
import PlainHeader from "../../Components/Header/PlainHeader";
import { postData, ServerURL } from "../../../APIServices/FetchNodeServices";
import { Cancel, FormatListBulleted, LocalShipping } from "@mui/icons-material";
import Swal from "sweetalert2";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid darkgrey',
    boxShadow: 24,
    padding:2
};

export default function OrderSuccess()
{
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [orderData, setOrderData] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [price, setPrice] = useState()
    const [orderLength, setOrderLength] = useState('')
    const [giftWrap, setGiftWrap] = useState()
    const [cancel, setCancel] = useState()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false)

    var navigate = useNavigate()
    var params = useParams()
    var d = new Date()
    var day=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var month=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    d.setDate(d.getDate()+10)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    useEffect(function(){
        fetchOrder()
        setLoading(false)
    }, [])

    const fetchOrder = async() => {
        var body = {invoiceno: params.invoiceno}
        var result = await postData('order/orderbyinvoiceno', body)
        setOrderData(result.data[0])
        setOrderItems(result.data)
        if(result.result)
        {
            setOrderLength(result.data.length)
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
    //console.log(orderData)

    const handleCancel = async(id) => {
        var body = {invoiceno: id}
        var result = await postData('order/cancelorder', body)
        if(result.result)
        {
            setLoading(true)
            fetchOrder()
            setOpen(false)
            setCancel(true)
            setModalVisible(true)
            handleOpen2()
            setLoading(false)
        }
        else
        {
            setOpen(false)
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

    const handleNotCancel = () => {
        setOpen(false)
        setCancel(false)
        setModalVisible(true)
        handleOpen2()
    }
    console.log(orderItems)

    const showOrderItems = () => {
        return(
            orderItems.map((item) => {
                return(
                    <Grid item xs={12} sx={{ display:'flex', margin:'0.5% 0% 0% 0%' }}>
                        <Grid item xs={1.5}>
                            <img src={`${ServerURL}/images/${item.producticon}`} alt="product-icon" width="85%" />
                        </Grid>
                        
                        <Grid item xs={3.4}>
                            <Grid item xs={12}>
                                <div className={classes.productname}>{item.productname}</div>
                            </Grid>
                            <Grid item xs={10}>
                                {
                                item.size == null
                                ?
                                <></>
                                :
                                <Grid item xs={8} className={classes.productdetails} sx={{ margin:'0% 0% 0% 0%' }}>
                                    Size : 
                                    <span className={classes.productdetails}> {item.size}</span>
                                </Grid>
                                }
                            </Grid>
                            <Grid item xs={10}>
                                {
                                item.color == null
                                ?
                                <></>
                                :
                                <Grid item xs={8} className={classes.productdetails} sx={{ margin:'0% 0% 0% 0%' }}>
                                    Color : 
                                    <span className={classes.productdetails}> {item.color}</span>
                                </Grid>
                                }
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid item xs={12} style={{ display:'flex' }}>
                                <div style={{ padding:'1%' }}><LocalShipping /></div>
                                <div style={{ padding:'1%', fontSize:15 }}>Delivery expected by
                                    {/* <span style={{ fontWeight:700, color:'#e52c86' }}> {day[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+"."}</span> */}
                                    <span style={{ fontWeight:700, color:'#e52c86' }}> {item.expecteddeliverydate}</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ fontWeight:600 }}>
                                    Order Status - 
                                    <span className={classes.orderstatus}> {item.orderstatus}</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ fontWeight:600 }}>
                                    Delivery Charge - 
                                    <span className={classes.orderstatus}> {item.deliverycharge}</span>
                                </div>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={3}>
                            {
                                item.price === null
                                ?
                                    item.cost_offerprice > 0
                                    ?
                                        <span>
                                            <s className={classes.cutprice}>Rs.{parseInt(item.cost_price)*parseInt(item.qty)}</s>
                                            &nbsp;&nbsp;<span className={classes.price}>Rs. {parseInt(item.cost_offerprice)*parseInt(item.qty)}/--</span>
                                            <div className={classes.discount} style={{ margin:'1% 0% 0% 0%'}}>{(parseInt(item.cost_price)*parseInt(item.qty)) - (parseInt(item.cost_offerprice)*parseInt(item.qty))}&#8377; Discount</div>
                                        </span>
                                    :
                                        <span>Rs. {parseInt(item.price1)*parseInt(item.qty)}/--</span>
                                :
                                    item.offerprice > 0
                                    ?
                                        <span>
                                            <s className={classes.cutprice}>Rs.{parseInt(item.price)*parseInt(item.qty)}</s>
                                            &nbsp;&nbsp;<span className={classes.price}>Rs. {parseInt(item.offerprice)*parseInt(item.qty)}/--</span>
                                            <div className={classes.discount} style={{ margin:'1% 0% 0% 0%'}}>{(parseInt(item.price)*parseInt(item.qty)) - (parseInt(item.offerprice)*parseInt(item.qty))}&#8377; Discount</div>
                                        </span>
                                    :
                                        <span>Rs. {parseInt(item.price)*parseInt(item.qty)}/--</span>
                            }
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    const showPaper1 = () => {
        return(
            <Grid item xs={10}>
                <Paper className={classes.paper1} elevation={8}>
                    <Grid item xs={1.5} className={classes.center}>
                        <img src="" alt="" width="90%" />
                    </Grid>
                    <Grid item xs={5} sx={{ padding:2 }}>
                        <div className={classes.amtfont}>Order Placed for Rs. {orderData.totalamount}/--</div>
                        {
                            orderData.orderstatus === 'Cancelled'
                            ?
                                <div style={{ fontWeight:700, color:'#e52c86', fontSize:18 }}>Your Order has been Cancelled now.</div>
                            :
                                orderLength > 1
                                ?
                                    <div>
                                        Your {orderLength} items will be delivered by
                                        {/* <span style={{ fontWeight:700, color:'#e52c86' }}> {day[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()}.</span> */}
                                        <span style={{ fontWeight:700, color:'#e52c86' }}> {orderData.expecteddeliverydate}.</span>
                                    </div>
                                :
                                    <div>
                                        Your {orderLength} item will be delivered by
                                        {/* <span style={{ fontWeight:700, color:'#e52c86' }}> {day[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()}.</span> */}
                                        <span style={{ fontWeight:700, color:'#e52c86' }}> {orderData.expecteddeliverydate}.</span>
                                    </div>
                        }
                        <Grid item xs={6} className={classes.orderno} sx={{ margin:'6% 0% 0% 0%' }}>
                            Order No: 
                            <span style={{ fontWeight:700, color:'#e52c86' }}> {orderData.invoiceno}</span>
                        </Grid>
                    </Grid>
                    <Grid item xs={1.2} sx={{ transform:'rotate(90deg)' }}>
                        <Divider />
                    </Grid>
                    <Grid item xs={4} sx={{ padding:'2% 0% 0% 2%' }}>
                        <div className={classes.checkorder}>Easily check all your orders!</div>
                        <Button
                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },
                                borderRadius:0,
                                backgroundColor:'#e52c86',
                                margin:'4% 0% 0% 0%',
                                padding:2
                                }}
                                startIcon={<FormatListBulleted />}
                                variant="contained"
                                onClick={()=>navigate(`/myaccounts`)}
                            >
                                My Orders
                        </Button>
                    </Grid>
                    <Grid item xs={1} className={classes.img}>
                        <img src='' alt="" width="70%" />
                    </Grid>
                </Paper>
            </Grid>
        )
    }

    const showPaper2 = () => {
        return(
            <Grid item xs={10}>
                <Paper className={classes.paper2} elevation={8}>
                    <Grid item xs={12}>
                        <Grid item xs={8} sx={{ padding:'1% 0% 1% 1%' }} className={classes.deliveryhead}>
                            Delivery Address
                        </Grid>
                        <Grid item xs={8} sx={{ padding:'0.5% 0% 0% 1%' }} className={classes.name}>
                            {orderData.name}
                        </Grid>
                        <Grid item xs={8} sx={{ padding:'0.5% 0% 0% 1%' }} className={classes.address}>
                            {orderData.houseno} {orderData.address}, {orderData.state}
                        </Grid>
                        <Grid item xs={8} sx={{ padding:'0.5% 0% 0% 1%' }} className={classes.address}>
                            {orderData.city} - {orderData.pincode}
                        </Grid>
                        <Grid item xs={8} sx={{ padding:'1% 0% 1% 1%' }} className={classes.name}>
                            {orderData.mobileno}
                        </Grid>
                        
                    </Grid>
                </Paper>
            </Grid>
        )
    }

    const showPaper3 = () => {
        return(
            <Grid item xs={10}>
                <Paper sx={{ padding:'1%' }} elevation={8}>
                    <Grid item xs={12} className={classes.orderitems}>
                        <Grid item xs={6}>
                            {
                                orderLength > 1
                                ?
                                    <span style={{ color:'#e52c86', fontWeight:700 }}>{orderLength} ORDERED ITEMS</span>
                                :
                                    <span style={{ color:'#e52c86', fontWeight:700 }}>{orderLength} ORDERED ITEM</span>
                            }
                        </Grid>
                        <Grid item xs={6} sx={{ display:'flex', justifyContent:'end'}}>
                            {
                                orderData.orderstatus === 'Cancelled'
                                ?
                                <Button sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                    borderColor: "#000", 
                                    },
                                    display:'flex', 
                                    margin:'0% 0% 0% 0%', 
                                    color:'#000', 
                                    borderColor:'#000'
                                    }} 
                                    disabled
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<Cancel />}
                                >
                                    Cancel Order
                                </Button>
                                :
                                <Button sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                    borderColor: "#000", 
                                    },
                                    display:'flex', 
                                    margin:'0% 0% 0% 0%', 
                                    color:'#000', 
                                    borderColor:'#000'
                                    }} 
                                    onClick={()=>handleOpen()}
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<Cancel />}
                                >
                                    Cancel Order
                                </Button>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'0.5%' }}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'0.5%' }}>
                        {showOrderItems()}
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'0.5%' }}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sx={{ display:'flex' }}>
                        <Grid item xs={7.5} sx={{ display:'flex', flexDirection:'column', alignItems:'end', margin:'0.5%' }}>
                            <div className={classes.amtdesc}>Total Amount</div>
                        </Grid>
                        <Grid item xs={1.5} sx={{ display:'flex', flexDirection:'column', margin:'0.5%' }}>
                            <div className={classes.amtdesc}>:</div>
                        </Grid>
                        <Grid item xs={4} sx={{ display:'flex', flexDirection:'column', margin:'0.5%' }}>
                            <div className={classes.amtdesc}>Rs. {orderData.totalamount}/--</div>
                        </Grid>
                    </Grid>
                </Paper>
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
                    <PlainHeader />

                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.root} sx={{ margin:'10% 2% 0% 2%' }}>
                            {showPaper1()}
                        </Grid>
                        <Grid item xs={12} className={classes.root} sx={{ margin:'1.5% 2% 0% 2%' }}>
                            {showPaper2()}
                        </Grid>
                        <Grid item xs={12} className={classes.root} sx={{ margin:'1.5% 2% 2% 2%' }}>
                            {showPaper3()}
                        </Grid>
                    </Grid>
                </div>
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={classes.cancelhead}>Confirm Cancel Order</div>
                    <p id="modal-modal-description">
                        <Grid item xs={12} style={{ margin:'2%' }}>
                            <Divider />
                        </Grid>
                        {
                            orderItems.map((item) => {
                                return(
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sx={{ display:'flex' }}>
                                            <Grid item xs={3}>
                                                <img src={`${ServerURL}/images/${item.producticon}`} alt="order-item" width="85%" />
                                            </Grid>
                                            <Grid item xs={9}>
                                                <div className={classes.cancelname} style={{ margin:'1% 0% 4% 0%' }}>{item.productname}</div>
                                                <div className={classes.bold}>
                                                    Size -
                                                    <span className={classes.details}> {item.size}</span> 
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12} sx={{ margin:'2% 0% 2% 0%'}}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={8}>
                                Are you sure you want to cancel this order ?
                            </Grid>

                            <Grid item xs={4} sx={{display:'flex', justifyContent:'end'}}>
                                <Button
                                    sx={{ ":hover": { color: "#c6186d", // theme.palette.primary.main
                                    bgcolor: "#fdf2f7",
                                    },
                                    borderRadius:0,
                                    color:'#e52c86',
                                    margin:'0% 0% 0% 0%',
                                    padding:0
                                    }}
                                    variant="text"
                                    onClick={()=>handleNotCancel()}
                                >
                                    NO
                                </Button>
                                <Button
                                    sx={{ ":hover": { color: "#c6186d", // theme.palette.primary.main
                                    bgcolor: "#fdf2f7",
                                    },
                                    borderRadius:0,
                                    color:'#e52c86',
                                    margin:'0% 0% 0% 0%',
                                    padding:0
                                    }}
                                    variant="text"
                                    onClick={()=>handleCancel(orderData.invoiceno)}
                                >
                                    YES
                                </Button>
                            </Grid>
                        </Grid>
                    </p>
                </Box>
            </Modal>
            {
                modalVisible 
                ?
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                {
                                    cancel
                                    ? 
                                        <div style={{ fontSize:20 }}>Cancel Order</div>
                                    :
                                        <div style={{ fontSize:20 }}>Order Not Cancelled</div>
                                }
                            </Typography>
                            <p id="modal-modal-description" className={classes.cancelled}>
                                {
                                    cancel 
                                    ? 
                                        <div>Your order has been cancelled now</div>
                                    :
                                        <div>Your order has not been cancelled</div>
                                }
                            </p>
                            <Grid item xs={12} sx={{display:'flex', justifyContent:'end'}}>
                                {
                                    cancel 
                                    ?
                                        <Button
                                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                            },
                                            borderRadius:0,
                                            color:'#fff',
                                            bgcolor: "#e52c86",
                                            padding:'1%'
                                            }}
                                            variant="contained"
                                            onClick={handleClose2}
                                        >
                                            Okay
                                        </Button>
                                    :
                                        <Button
                                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                            },
                                            borderRadius:0,
                                            color:'#fff',
                                            bgcolor: "#e52c86",
                                            padding:'1%'
                                            }}
                                            variant="contained"
                                            onClick={handleClose2}
                                        >
                                            Okay
                                        </Button>
                                }
                            </Grid>
                        </Box>
                    </Modal>
                :
                    <></>
            }
        </div>
    )
}