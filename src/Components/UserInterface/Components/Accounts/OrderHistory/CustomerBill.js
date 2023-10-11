import React, { useEffect, useState, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';
import useStyles from "./CustomerBillCss";
import { Button, Divider, Grid, Paper, Dialog, Box, Typography, Stepper, StepLabel, Step, Snackbar, Modal } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { Cancel, LocalShipping, Visibility, Check } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { postData, ServerURL } from "../../../../APIServices/FetchNodeServices";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
}));

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

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomerBill(){
    const classes = useStyles()
    const [billProduct, setBillProduct] = useState('')
    const [itemInvoice, setItemInvoice] = useState([])
    const [orderLength, setOrderLength] = useState('')
    const [billAddress, setBillAddress] = useState([])
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [cancel, setCancel] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [messageWarning, setMessageWarning] = useState()
    const [openWarning, setOpenWarning] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    
    let params = useParams()
    let navigate = useNavigate()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    useEffect(function(){
        fetchAllOrderData()
        fetchBillDatabyInvoice()
        fetchBillAddressbyInvoice()
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
        setOrderLength(result.data.length)
    }

    const fetchBillAddressbyInvoice = async() => {
        var body = { invoiceno: params.invoiceno }
        var result = await postData('order/orderbyinvoiceno', body)
        setBillAddress(result.data[0])
    }

    const handleNotCancel = () => {
        setOpen(false)
        setCancel(false)
        setModalVisible(true)
        handleOpen2()
    }

    const handleCancel = async(invoiceno) => {
        var body = {invoiceno: invoiceno}
        var result = await postData('order/cancelorder', body)
        if(result.result)
        {
            fetchAllOrderData()
            fetchBillDatabyInvoice()
            fetchBillAddressbyInvoice()
            setOpen(false)
            setCancel(true)
            setModalVisible(true)
            handleOpen2()
        }
        else
        {
            setOpen(false)
            setMessageWarning( "Server Error: Something went wrong..!!" )
            {handleClickWarning()}
        }
    }

    const order_Status = () => {
        let steps = []
        if(billAddress.orderstatus === 'Cancelled')
        {
            steps = ['Order Confirmed', 'Cancelled'];
        }
        else
        {
            steps = ['Order Confirmed', 'Packed', 'Shipped', 'Delivered'];
        }
        return steps
    }
    //console.log(order_Status())

    const delivery_Status = () => {
        if(billAddress.orderstatus === 'Cancelled')
        {
            return 2
        }
        else
        {
            if(billAddress.deliverystatus == 0)
            {
                return 0
            }
            else if(billAddress.deliverystatus == 1)
            {
                return 1
            }
            else if(billAddress.deliverystatus == 2)
            {
                return 2
            }
            else if(billAddress.deliverystatus == 3)
            {
                return 3
            }
            else if(billAddress.deliverystatus == 4)
            {
                return 4
            }
        }
    }

    QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
    };

    function QontoStepIcon(props) {
        const { active, completed, className } = props;
        return (
          <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
              <Check className="QontoStepIcon-completedIcon" />
            ) : (
              <div className="QontoStepIcon-circle" />
            )}
          </QontoStepIconRoot>
        );
    }

    const handleClickWarning = () => {
        setOpenWarning(true)
    }
    const handleCloseWarning = () => {
        setOpenWarning(false)
    }

    const handleProducts = async(value) => {
        var body = {productid: value.productid}
        var result = await postData('product/displayproductbyid', body)
        console.log(result)
        if(result.status)
        {
            navigate(`/products/${result.result.subcategoryid}/${result.result.subcategoryname}/productview/${result.result.productid}/${result.result.productname}`)
        }
        else
        {
            setMessageWarning( "Server Error: Something went wrong..!!" )
            {handleClickWarning()}
        }
    }

    const showOrderItems = () => {
        return(
            itemInvoice.map((item) => {
                return(
                    <Grid item xs={12} sx={{ display:'flex', margin:'0.5% 0% 0% 0%' }}>
                        <Grid item xs={1.5}>
                            <img src={`${ServerURL}/images/${item.producticon}`} onClick={()=>handleProducts(item)} alt="product-icon" width="85%" style={{ cursor:'pointer'}} />
                        </Grid>
                        
                        <Grid item xs={6} onClick={()=>handleProducts(item)}>
                            <Grid item xs={12}>
                                <div className={classes.productname} onClick={()=>handleProducts(item)}>{item.productname}</div>
                            </Grid>
                            <Grid item xs={10} className={classes.row}>
                                {
                                item.size == null
                                ?
                                <></>
                                :
                                <Grid item xs={5} className={classes.productdetails} sx={{ margin:'0% 0% 0% 0%' }}>
                                    Size : 
                                    <span className={classes.productdetails}> {item.size}</span>
                                </Grid>
                                }
                                {
                                item.color == null
                                ?
                                <></>
                                :
                                <Grid item xs={5} className={classes.productdetails} sx={{ margin:'0% 0% 0% 0%' }}>
                                    Color : 
                                    <span className={classes.productdetails}> {item.color}</span>
                                </Grid>
                                }
                            </Grid>
                            <Grid item xs={8} className={classes.productdetails} sx={{ margin:'0% 0% 0% 0%' }}>
                                Qty : 
                                <span className={classes.productdetails}> {item.qty}</span>
                            </Grid>
                            <Grid item xs={8}>
                                {
                                    item.price === null
                                    ?
                                        item.cost_offerprice > 0
                                        ?
                                            <span>
                                                <s className={classes.cutprice}>Rs.{parseInt(item.cost_price)*parseInt(item.qty)}</s>
                                                &nbsp;&nbsp;<span className={classes.price}>Rs. {parseInt(item.cost_offerprice)*parseInt(item.qty)}/--</span>
                                                &nbsp;&nbsp;<span className={classes.discount} style={{ margin:'1% 0% 0% 0%'}}>{(parseInt(item.cost_price)*parseInt(item.qty)) - (parseInt(item.cost_offerprice)*parseInt(item.qty))}&#8377; Discount</span>
                                            </span>
                                        :
                                            <span>Rs. {parseInt(item.price1)*parseInt(item.qty)}/--</span>
                                    :
                                        item.offerprice > 0
                                        ?
                                            <span>
                                                <s className={classes.cutprice}>Rs.{parseInt(item.price)*parseInt(item.qty)}</s>
                                                &nbsp;&nbsp;<span className={classes.price}>Rs. {parseInt(item.offerprice)*parseInt(item.qty)}/--</span>
                                                &nbsp;&nbsp;<span className={classes.discount} style={{ margin:'1% 0% 0% 0%'}}>{(parseInt(item.price)*parseInt(item.qty)) - (parseInt(item.offerprice)*parseInt(item.qty))}&#8377; Discount</span>
                                            </span>
                                        :
                                            <span>Rs. {parseInt(item.price)*parseInt(item.qty)}/--</span>
                                }
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            {
                                billAddress.orderstatus === 'Cancelled'
                                ?
                                    <></>
                                :
                                    <Grid item xs={12} style={{ display:'flex' }}>
                                        <div style={{ padding:'1%' }}><LocalShipping /></div>
                                        <div style={{ padding:'1%', fontSize:15 }}>Delivery expected by
                                            {/* <span style={{ fontWeight:700, color:'#e52c86' }}> {day[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+"."}</span> */}
                                            <span style={{ fontWeight:700, color:'#e52c86' }}> {billAddress.expecteddeliverydate}</span>
                                        </div>
                                    </Grid>
                            }
                            
                            <Grid item xs={12}>
                                <div style={{ fontSize:14,fontWeight:600 }}>
                                    Order Status - 
                                    <span className={classes.orderstatus}> {item.orderstatus}</span>
                                </div>
                            </Grid>
                            {
                                billAddress.couriername == null
                                ?
                                    <></>
                                :
                                    <Grid item xs={12}>
                                        <div style={{ fontSize:14,fontWeight:600 }}>
                                            {billAddress.couriername} - 
                                            <span className={classes.orderstatus}> {billAddress.tracking}</span>
                                        </div>
                                    </Grid>
                            }
                            <Grid item xs={12}>
                                <div style={{ fontSize:14,fontWeight:600, margin:'0.5% 0% 0% 0%' }}>
                                    Delivery Charge - 
                                    <span className={classes.orderstatus}> {item.deliverycharge}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    function paper1(){
        return(
            <Paper sx={{ margin:'3% 2% 1% 2%', padding:'1% 1% 1% 1%' }}>
                <Grid item xs={12} className={classes.root}>
                    <div className={classes.fnhd}>All Bill Products</div>
                </Grid>
            </Paper>
        )
    }

    function paper2(){
        return(
            <Paper sx={{ margin:'1% 2% 1% 2%', padding:'2% 2% 2% 2%' }}>
                <Grid item xs={12} className={classes.root}>
                    <Grid item xs={5} className={classes.fnhd}>
                        <span className={classes.lnth}>Order Id: {billProduct.invoiceno}</span>
                    </Grid>
                    <Grid item xs={7} className={classes.fnhd} sx={{ display:'flex', justifyContent:'end' }}>
                        <span className={classes.lnth}>Total Amount Paid &#8377;{billProduct.totalamount}</span>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    function paper3(){
        return(
            <Paper className={classes.row} sx={{ margin:'1% 2% 1% 2%', padding:'1% 1% 1% 1%' }}>
                <Grid item xs={5}>
                    <Grid item xs={8} sx={{ padding:'1% 0% 1% 1%' }} className={classes.deliveryhead}>
                        Delivery Address
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'1% 0% 0% 1%' }} className={classes.name}>
                        {billAddress.name}
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'0.5% 0% 0% 1%' }} className={classes.address}>
                        {billAddress.houseno} {billAddress.address}, {billAddress.state}
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'0.5% 0% 0% 1%' }} className={classes.address}>
                        {billAddress.city} - {billAddress.pincode}
                    </Grid>
                    <Grid item xs={12} sx={{ padding:'1% 0% 0% 1%' }} className={classes.name}>
                        {billAddress.mobileno}
                    </Grid>
                </Grid>
                <Grid item xs={0.005} sx={{ backgroundColor:'darkgrey', margin:'0% 3% 0% 1%' }}></Grid>
                <Grid item xs={6} sx={{ margin:'1.5% 0% 1.5% 0%' }}>
                    <Stepper alternativeLabel activeStep={delivery_Status()} connector={<QontoConnector />}>
                        {order_Status().map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={QontoStepIcon}>
                                    {label}
                                    {/* <div style={{ color:'#636e72', fontSize:12}}>{billAddress.expecteddeliverydate}</div> */}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>
            </Paper>
        )
    }

    function paper4(){
        return(
            <Paper sx={{ margin:'1% 2% 1% 2%', padding:'1% 1% 1% 1%' }}>
                    <Grid item xs={12} className={classes.orderitems}>
                        <Grid item xs={6} sx={{ display:'flex', alignItems:'center' }}>
                            {
                                orderLength > 1
                                ?
                                    <span style={{ color:'#e52c86', fontWeight:700 }}>{orderLength} ORDERED ITEMS</span>
                                :
                                    <span style={{ color:'#e52c86', fontWeight:700 }}>{orderLength} ORDERED ITEM</span>
                            }
                        </Grid>
                        <Grid item xs={6} sx={{ display:'flex', justifyContent:'end', padding:'0% 1% 0.5% 0%'}}>
                            {
                                billAddress.orderstatus === 'Cancelled'
                                ?
                                <Button sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                    borderColor: "#000", 
                                    },
                                    display:'flex',
                                    color:'#000', 
                                    borderColor:'#000'
                                    }} 
                                    disabled
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<Cancel />}
                                >
                                    Cancelled
                                </Button>
                                :
                                <Button sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                        borderColor: "#c6186d", 
                                    },
                                    color:'#c6186d',
                                    borderColor:'#e52c86',
                                    height:'4.2vh',
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
                            <div className={classes.amtdesc}>Rs. {billAddress.totalamount}/--</div>
                        </Grid>
                    </Grid>
                </Paper>
        )
    }

    function handleAlertWarning() {
        return(
            <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleCloseWarning}>
                <Alert severity="warning" sx={{ width: '100%' }}>
                    {messageWarning}
                </Alert>
            </Snackbar>
        )
    }

    return(
        <Grid item xs={12}>
            <Grid item xs={12}>
                {paper1()}
            </Grid>
            <Grid item xs={12}>
                {paper2()}
            </Grid>
            <Grid item xs={12}>
                {paper3()}
            </Grid>
            <Grid item xs={12}>
                {paper4()}
            </Grid>
            {handleAlertWarning()}

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
                            itemInvoice.map((item) => {
                                return(
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sx={{ display:'flex' }}>
                                            <Grid item xs={5}>
                                                <img src={`${ServerURL}/images/${item.producticon}`} alt="order-item" width="85%" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className={classes.cancelname} style={{ margin:'1% 0% 4% 0%' }}>{item.productname}</div>
                                                <Grid item xs={12}>
                                                    {
                                                    item.size == null
                                                    ?
                                                    <></>
                                                    :
                                                    <Grid item xs={8} sx={{ margin:'0% 0% 0% 1%', fontSize:14 }}>
                                                        Size : 
                                                        <span> {item.size}</span>
                                                    </Grid>
                                                    }
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {
                                                    item.color == null
                                                    ?
                                                    <></>
                                                    :
                                                    <Grid item xs={8} sx={{ margin:'0% 0% 0% 1%', fontSize:14 }}>
                                                        Color : 
                                                        <span> {item.color}</span>
                                                    </Grid>
                                                    }
                                                </Grid>
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

                            <Grid item xs={12} sx={{ display:'flex', justifyContent:'end' }}>
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
                                    onClick={()=>handleCancel(billAddress.invoiceno)}
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
        </Grid>
    )
} 