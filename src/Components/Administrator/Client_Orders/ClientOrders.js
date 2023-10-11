import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "@material-table/core";
import PropTypes from 'prop-types';
import { Grid, TextField, MenuItem, Divider, Snackbar, Stepper, StepLabel, Step, } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useStyles from "./ClientOrdersCss";
import { getData, postData, ServerURL } from "../../APIServices/FetchNodeServices";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Gifts from "../../Assets/Images/gifts.png";
import { styled } from "@mui/material/styles";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import moment from "moment/moment";
import { LocalShipping, Mood, Payment, ReceiptLong, Check } from "@mui/icons-material";

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

export default function ClientOrders(){
    const classes = useStyles()
    const [orderData, setOrderData] = useState([])
    const [orderByInvoice, setOrderByInvoice] = useState([])
    const [open, setOpen] = useState(false)
    const [orderInvoiceNo, setOrderInvoiceNo] = useState('')
    const [orderDate, setOrderDate] = useState('')
    const [name, setName] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [billMobileNo, setBillMobileNo] = useState('')
    const [paymentMode, setPaymentMode] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [orderStatus, setOrderStatus] = useState('')
    const [deliveryStatus, setDeliveryStatus] = useState('')
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('')
    const [customerData, setCustomerData] = useState([])
    const [accountMobileNo, setAccountMobileNo] = useState('')
    const [accountEmailId, setAccountEmailId] = useState('')
    const [changeDeliveryStatus, setChangeDeliveryStatus] = useState()
    const [changeOrderStatus, setChangeOrderStatus] = useState()
    const [messageWarning, setMessageWarning] = useState()
    const [openWarning, setOpenWarning] = useState(false)
    const [messageSuccess, setMessageSuccess] = useState()
    const [openSuccess, setOpenSuccess] = useState(false)
    const [trackingEnter, setTrackingEnter] = useState(false)
    const [trackingNo, setTrackingNo] = useState()
    const [courierName, setCourierName] = useState()

    let day=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    useEffect(function(){
        fetchAllOrdersData()
    },[])

    const fetchAllOrdersData = async() => {
        var result = await getData('order/displayallorders')
        setOrderData(result.data)
    }

    const fetchBillDatabyInvoice = async(rowData) => {
        var body = { invoiceno: rowData.invoiceno }
        var result = await postData('order/orderbyinvoiceno', body)
        setOrderByInvoice(result.data)
    }

    const fetchCustomerData = async(rowData) => {
        var body = { mobileno: rowData.customermobileno }
        var result = await postData('customer/checkusermobileno', body)
        setCustomerData(result.data)
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

    const order_Status = () => {
        let steps = []
        if(orderStatus === 'Cancelled')
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
        if(orderStatus === 'Cancelled')
        {
            return 2
        }
        else
        {
            if(deliveryStatus == 0)
            {
                return 0
            }
            else if(deliveryStatus == 1)
            {
                return 1
            }
            else if(deliveryStatus == 2)
            {
                return 2
            }
            else if(deliveryStatus == 3)
            {
                return 3
            }
            else if(deliveryStatus == 4)
            {
                return 4
            }
        }
    }

    const handleOpen = async(rowData) => {
        fetchBillDatabyInvoice(rowData)
        fetchCustomerData(rowData)
        
        setOpen(true)
        setOrderInvoiceNo(rowData.invoiceno)
        setOrderDate(rowData.orderdate)
        
        setName(rowData.name)
        setHouseNo(rowData.houseno)
        setAddress(rowData.address)
        setCity(rowData.city)
        setState(rowData.state)
        setPincode(rowData.pincode)
        setBillMobileNo(rowData.mobileno)
        setAccountEmailId(rowData.emailid)
        setAccountMobileNo(rowData.customermobileno)
        setPaymentMode(rowData.paymentmode)
        setTransactionId(rowData.transactionid)
        setOrderStatus(rowData.orderstatus)
        setDeliveryStatus(rowData.deliverystatus)
        setChangeDeliveryStatus(rowData.deliverystatus)
        setChangeOrderStatus(rowData.orderstatus)
        setExpectedDeliveryDate(rowData.expecteddeliverydate)
        setTrackingNo(rowData.tracking)
        setCourierName(rowData.couriername)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickWarning = () => {
        setOpenWarning(true)
    }
    const handleCloseWarning = () => {
        setOpenWarning(false)
    }

    const handleClickSuccess = () => {
        setOpenSuccess(true)
    }
    const handleCloseSuccess = () => {
        setOpenSuccess(false)
    }

    const handleChangeStatus = (event) => {
        setChangeDeliveryStatus(event.target.value);
        if(event.target.value == 0)
        {
            setChangeOrderStatus('Order Placed')
            setTrackingEnter(false)
        }
        else if(event.target.value == 1)
        {
            setChangeOrderStatus('Order Confirmed')
            setTrackingEnter(false)
        }
        else if(event.target.value == 2)
        {
            setChangeOrderStatus('Packed')
            setTrackingEnter(false)
        }
        else if(event.target.value == 3)
        {
            setChangeOrderStatus('Shipped')
            setTrackingEnter(true)
        }
        else if(event.target.value == 4)
        {
            setChangeOrderStatus('Delivered')
            setTrackingEnter(false)
        }
        else if(event.target.value == 5)
        {
            setChangeOrderStatus('Cancelled')
            setTrackingEnter(false)
        }
    }

    const handleSave = async() => {
        let body = { invoiceno: orderInvoiceNo, deliverystatus: changeDeliveryStatus, orderstatus: changeOrderStatus, tracking: trackingNo, couriername: courierName }
        let result = await postData('order/changeorderstatus', body)
        if(result.result)
        {
            setMessageSuccess( "Order Status Updated Successfully..!!" )
            {handleClickSuccess()}
            fetchAllOrdersData()
            setDeliveryStatus(changeDeliveryStatus)
            setOrderStatus(changeOrderStatus)
            setOpen(false)
        }
        else
        {
            setMessageWarning( "Server Error: Something went wrong..!!" )
            {handleClickWarning()}
        }
    }

    const showProductsByInvoice = () => {
        return(
            <div>
                <Grid item xs={12} className={classes.grid}>
                    <Grid item xs={7} sx={{ padding:'0% 0% 0% 10%' }}>
                        Product
                    </Grid>
                    <Grid item xs={2} className={classes.center}>
                        Qty
                    </Grid>
                    <Grid item xs={3} className={classes.center}>
                        Subtotal
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} className={classes.grid1}>
                    {
                        orderByInvoice.map((item) => {
                            return(
                                <Grid container spacing={1}sx={{ margin:'0% 0% 2% 0%' }}>
                                    <Grid item xs={1.3} style={{ margin:'0% 0% 0% 2%' }}>
                                        <img src={`${ServerURL}/images/${item.producticon}`} alt="cart-products" /* onClick={()=>handleProducts(item.item)} */ className={classes.cartimg} />
                                    </Grid>
                                    <Grid item xs={5.7} style={{ margin:'0% 0% 0% 0%' }}>
                                        <Grid item xs={12} className={classes.name} /* onClick={()=>handleProducts(item.item)} */>
                                            {item.productname}
                                        </Grid>
                                        <Grid item xs={8} className={classes.sizecolor}>
                                            {
                                                item.size == null
                                                ?
                                                <></>
                                                :
                                                <Grid item xs={8} className={classes.sizecolor} style={{ margin:'1.5% 0% 0% 0%' }}>
                                                    Size : 
                                                    <span className={classes.sizecolor1}> {item.size}</span>
                                                </Grid>
                                            }
                                        </Grid>
                                        <Grid item xs={8} className={classes.sizecolor}>
                                            {
                                                item.color == null
                                                ?
                                                <></>
                                                :
                                                <Grid item xs={8} className={classes.sizecolor}>
                                                    Color : 
                                                    <span className={classes.sizecolor1}> {item.color}</span>
                                                </Grid>
                                            }
                                        </Grid>
                                        <Grid item xs={8} className={classes.sizecolor} style={{ padding:'0% 0% 0% 0.8%' }}>
                                            Whatsapp No. : 
                                            <span className={classes.sizecolor1}> {item.userwhatsapp}</span>
                                        </Grid>
                                        <Grid item xs={8} className={classes.price} style={{ margin:'0% 0% 0% 1%' }}>
                                            Price :&nbsp;
                                            <span className={classes.sizecolor1}>
                                                {
                                                    item.cost_price === null
                                                    ?
                                                        item.offerprice > 0
                                                        ?
                                                            <span>
                                                                <s className={classes.cutprice}>Rs.{item.price}</s>
                                                                &nbsp;&nbsp;<span className={classes.price}>Rs. {item.offerprice}/--</span>
                                                            </span>
                                                        :
                                                            <span>Rs. {item.price}/--</span>
                                                    :
                                                        item.cost_offerprice > 0
                                                        ?
                                                            <span>
                                                                <s className={classes.cutprice}>Rs.{item.cost_price}</s>
                                                                &nbsp;&nbsp;<span className={classes.price}>Rs. {item.cost_offerprice}/--</span>
                                                            </span>
                                                        :
                                                            <span>Rs. {item.cost_price}/--</span>
                                                }
                                            </span>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1.3} className={classes.center} style={{ fontFamily:'serif', fontSize:18, margin:'0% 0% 0% 0%' }}>
                                        {item.qty}
                                    </Grid>
                                    <Grid item xs={2.1} className={classes.center} style={{ fontFamily:'serif', fontSize:18, margin:'0% 0% 0% 1%', display:'flex', justifyContent:'end' }}> 
                                        {
                                            item.cost_price === null
                                            ?
                                                item.offerprice > 0
                                                ?
                                                    <div>Rs. {item.offerprice*item.qty}/--</div>
                                                :
                                                    <div>Rs. {item.price*item.qty}/--</div>
                                            :
                                                item.cost_offerprice > 0
                                                ?
                                                    <div>Rs. {item.cost_offerprice*item.qty}/--</div>
                                                :
                                                    <div>Rs. {item.cost_price*item.qty}/--</div>
                                        }
                                    </Grid>
                                </Grid>
                                
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }

    function displayIndividualOrders(){
        return(
            <Dialog
                maxWidth="xl"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} className={classes.row}>
                            <div className={classes.image}>
                                <img src={Gifts} alt="product-pic" width="30"></img>
                            </div>
                            <div className={classes.heading}>Bill Invoice</div>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Divider className={classes.divider}/>
                        </Grid>

                        <Grid container spacing={1} sx={{ margin:'1% 0% 0% 0%' }}>
                            {
                                trackingEnter
                                ?
                                    <Grid item xs={12} className={classes.row}>
                                        <Grid item xs={0.5} sx={{ color:'#e52c86' }}>
                                            <ReceiptLong />
                                        </Grid>
                                        <Grid item xs={10} className={classes.col} sx={{ margin:'0% 0% 2% 0%' }}>
                                            <Grid item xs={12}>
                                                <Grid item xs={12} sx={{ fontWeight:600 }}>
                                                    #{orderInvoiceNo}
                                                </Grid>
                                                <Grid item xs={12} sx={{ color:'#636e72', fontSize:13 }}>
                                                    {day[moment(orderDate).weekday()]}, {(moment(orderDate).format('ll'))}, {moment(orderDate).format('h:mm a')}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} className={classes.end}>
                                            <Button
                                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                                    },
                                                    backgroundColor:'#e52c86',
                                                    height:'6vh'
                                                }}
                                                variant="contained"
                                                fullWidth
                                                onClick={handleSave}
                                            >
                                                Save
                                            </Button>
                                        </Grid>
                                    </Grid>
                                :
                                    <Grid item xs={5} className={classes.row}>
                                        <Grid item xs={0.8} sx={{ color:'#e52c86' }}>
                                            <ReceiptLong />
                                        </Grid>
                                        <Grid item xs={10} className={classes.col} sx={{ margin:'0% 0% 2% 0%' }}>
                                            <Grid item xs={12}>
                                                <Grid item xs={12} sx={{ fontWeight:600 }}>
                                                    #{orderInvoiceNo}
                                                </Grid>
                                                <Grid item xs={12} sx={{ color:'#636e72', fontSize:13 }}>
                                                    {day[moment(orderDate).weekday()]}, {(moment(orderDate).format('ll'))}, {moment(orderDate).format('h:mm a')}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                            }
                            {
                                !trackingEnter
                                ?
                                    <Grid item xs={7} className={classes.end}>
                                        <Grid container spacing={1} className={classes.end}>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={changeDeliveryStatus}
                                                        label="Order Status"
                                                        onChange={handleChangeStatus}
                                                        style={{ color: '#c6186d' }}
                                                    >
                                                        <MenuItem value={"0"}>Order Placed</MenuItem>
                                                        <MenuItem value={"1"}>Order Confirmed</MenuItem>
                                                        <MenuItem value={"2"}>Packed</MenuItem>
                                                        <MenuItem value={"3"}>Shipped</MenuItem>
                                                        <MenuItem value={"4"}>Delivered</MenuItem>
                                                        <MenuItem value={"5"}>Cancelled</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4} className={classes.end}>
                                                <Button
                                                    sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                                        },
                                                        backgroundColor:'#e52c86',
                                                        height:'6vh'
                                                    }}
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={handleSave}
                                                >
                                                    Save
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                :
                                    <Grid item xs={12} className={classes.end}>
                                        <Grid container spacing={1} className={classes.end}>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={changeDeliveryStatus}
                                                        label="Order Status"
                                                        onChange={handleChangeStatus}
                                                        style={{ color: '#c6186d' }}
                                                    >
                                                        <MenuItem value={"0"}>Order Placed</MenuItem>
                                                        <MenuItem value={"1"}>Order Confirmed</MenuItem>
                                                        <MenuItem value={"2"}>Packed</MenuItem>
                                                        <MenuItem value={"3"}>Shipped</MenuItem>
                                                        <MenuItem value={"4"}>Delivered</MenuItem>
                                                        <MenuItem value={"5"}>Cancelled</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <CssTextField sx={{ input: { color: '#c6186d' } }} value={trackingNo} onChange={(event)=>setTrackingNo(event.target.value)} label="Tracking/AWB No." size="small" variant="outlined" fullWidth></CssTextField>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <CssTextField sx={{ input: { color: '#c6186d' } }} value={courierName} onChange={(event)=>setCourierName(event.target.value)} label="Courier Service Name" size="small" variant="outlined" fullWidth></CssTextField>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                            }
                        </Grid>

                        <Grid item xs={12}>
                            <Divider className={classes.divider}/>
                        </Grid>

                        <Grid container spacing={1} sx={{ margin:'1% 0% 0.5% 0%' }}>
                            <Grid item xs={6} className={classes.row}>
                                <Grid item xs={1}>
                                    <LocalShipping sx={{ color:'#e52c86' }} />
                                </Grid>
                                <Grid item xs={11}>
                                    <Grid item xs={12} className={classes.head}>
                                        Delivery Address
                                    </Grid>
                                    <Grid item xs={12} className={classes.details}>
                                        {name}
                                    </Grid>
                                    <Grid item xs={12} className={classes.details}>
                                        {houseNo}, {address}
                                    </Grid>
                                    <Grid item xs={12} className={classes.details}>
                                        {city} - {pincode}, {state}
                                    </Grid>
                                    <Grid item xs={12} className={classes.details}>
                                        +91 {billMobileNo}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={6} sx={{ textAlign:'end' }}>
                                <Grid container spacing={3} className={classes.row}>
                                    <Grid item xs={5} sx={{ color:'#e52c86' }}>
                                        <Mood />
                                    </Grid>
                                    <Grid item xs={7} sx={{ textAlign:'start' }} className={classes.col}>
                                        <Grid item xs={10} className={classes.head}>
                                            Customer Details
                                        </Grid>
                                        <Grid item xs={12} className={classes.details}>
                                            <div style={{ margin:'0.5% 0% 0% 0%' }}>{customerData.firstname} {customerData.lastname}</div>
                                            <div style={{ margin:'0.5% 0% 0% 0%' }}>{accountEmailId}</div>
                                            <div style={{ margin:'0.5% 0% 0% 0%' }}>+91 {accountMobileNo}</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider className={classes.divider}/>
                        </Grid>

                        <Grid item xs={12}>
                            {showProductsByInvoice()}
                        </Grid>

                        <Grid item xs={12}>
                            <Divider className={classes.divider}/>
                        </Grid>

                        <Grid container spacing={1} sx={{ margin:'1% 0% 0% 0%' }}>
                            <Grid item xs={6} className={classes.row}>
                                <Grid item xs={1} sx={{ color:'#e52c86' }}>
                                    <Payment />
                                </Grid>
                                <Grid item xs={11}>
                                    <Grid item xs={12} className={classes.head}>
                                        Payment Info
                                    </Grid>
                                    <Grid item xs={12} className={classes.payment}>
                                        Payment Mode : 
                                        <span className={classes.paymentdetails}>
                                            &nbsp;{paymentMode}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} className={classes.payment}>
                                        Transaction Id : 
                                        <span className={classes.paymentdetails}>
                                            &nbsp;{transactionId}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} className={classes.payment}>
                                        Order Status : 
                                        <span className={classes.paymentdetails}>
                                            &nbsp;{orderStatus}
                                        </span>
                                    </Grid>
                                    {/* <Grid item xs={12} className={classes.payment}>
                                        Delivery Status : 
                                        <span className={classes.paymentdetails}>
                                            &nbsp;{deliveryStatus}
                                        </span>
                                    </Grid> */}
                                    {
                                        courierName == null
                                        ?
                                            <></>
                                        :
                                            <Grid item xs={12}>
                                                <Grid item xs={12} className={classes.payment}>
                                                    Courier Name : 
                                                    <span className={classes.paymentdetails}>
                                                        &nbsp;{courierName}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12} className={classes.payment}>
                                                    Tracking No. : 
                                                    <span className={classes.paymentdetails}>
                                                        &nbsp;{trackingNo}
                                                    </span>
                                                </Grid>
                                            </Grid>
                                    }
                                    {
                                        orderStatus === 'Cancelled'
                                        ?
                                            <></>
                                        :
                                            <Grid item xs={12} className={classes.payment}>
                                                Expected Delivery : 
                                                <span className={classes.paymentdetails}>
                                                    &nbsp;{expectedDeliveryDate}
                                                </span>
                                            </Grid>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sx={{ margin:'3% 0% 3% 0%'}}>
                                <Stepper alternativeLabel activeStep={delivery_Status()} connector={<QontoConnector />}>
                                    {order_Status().map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={QontoStepIcon}>
                                                {label}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button sx={{ color:'#c6186d' }} onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    function displayOrders(){
        return(
            <MaterialTable sx={{ padding: '0 5px 0 5px', fontSize:15}}
                title="LIST OF ORDERS"
                columns={[
                    { title: 'Product Image', render: (rowData) => <img alt="pic" src={`${ServerURL}/images/${rowData.producticon}`} width="80" height="80" style={{borderRadius:10}} /> },
                    { title: 'Invoice No', field: 'invoiceno' },
                    { title: 'Order Date', render: (rowData) => (moment(rowData.orderdate).format('DD-MM-YYYY')) },
                    //{ title: 'Product Name', field: 'productname' },
                    //{ title: 'Qty', field: 'qty' },
                    { title: 'Final Amount', render: (rowData) => (<div>Rs. {rowData.totalamount}/--</div>) },
                    { title: 'Order Status', field: 'orderstatus' },
                    { title: 'Delivery Status', render: (rowData) => (
                        rowData.deliverystatus == 0
                        ?
                        'Order Placed'
                        :
                        rowData.deliverystatus == 1
                        ?
                        'Order Confirmed'
                        :
                        rowData.deliverystatus == 2
                        ?
                        'Packed'
                        :
                        rowData.deliverystatus == 3
                        ?
                        'Shipped'
                        :
                        rowData.deliverystatus == 4
                        ?
                        'Delivered'
                        :
                        rowData.deliverystatus == 5
                        ?
                        'Cancelled'
                        :
                        'Server Error: status updated soon..!!'
                    ) },
                ]}
                data={orderData}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product',
                        onClick: (event, rowData) => handleOpen(rowData)
                    }
                ]}
                options={{
                    headerStyle: {
                      backgroundColor: '#e52c86',
                      color: '#FFF',
                      padding: 10
                    },
                    rowStyle: {
                        color:'#9E1357',
                        fontSize: "1.0em"
                    },
                }}
            />    
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
    function handleAlertSuccess() {
        return(
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {messageSuccess}
                </Alert>
            </Snackbar>
        )
    }

    return(
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displayOrders()}
            </div>
            <div>
                {displayIndividualOrders()}
            </div>
            {handleAlertWarning()}
            {handleAlertSuccess()}
        </div>
    )
}