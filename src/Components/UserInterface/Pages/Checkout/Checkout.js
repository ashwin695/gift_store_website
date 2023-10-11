import React, { useState, useEffect, forwardRef } from "react";
import useStyles from "./CheckoutCss";
import { styled, alpha } from "@mui/material/styles";
import StepperHeader from "../../Components/Header/StepperHeader";
import { Box, Drawer, List } from "@mui/material";
import { Button, Grid, Divider, TextField, Paper, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getData, postData, ServerURL } from "../../../APIServices/FetchNodeServices";
import { ArrowBackIosNew, East } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
    ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        borderBottom: '2px solid #e84393',
        overflow: 'hidden',
        borderRadius: 6,
        backgroundColor: theme.palette.mode === 'light' ? 'white smoke' : '#c6186d',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha('#c6186d', 0.35)} 0 0 0 2px`,
            borderColor: '#c6186d',
        },
    },
    '& label.Mui-focused': {
        color: '#c6186d',
    },
}));

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Checkout(){
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = React.useState({ right: false });
    const [addressStatus, setAddressStatus] = useState({ status: false, data: [] })
    const [name, setName] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')
    const [messageWarning, setMessageWarning] = useState()
    const [messageSuccess, setMessageSuccess] = useState()
    const [openWarning, setOpenWarning] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [lastOrderInvoice, setLastOrderInvoice] = useState([])
    const [loading, setLoading] = useState(true)

    var dispatch = useDispatch()
    var navigate = useNavigate()
    var customer = useSelector(state => state.customer)
    var customerDetails = Object.values(customer)[0]
    var customerMobileNo = customerDetails.mobileno
    //console.log(customerDetails)

    var shoppingBag = useSelector(state =>state.cartbag)
    var keys = Object.keys(shoppingBag)
    var products = Object.values(shoppingBag)
    //console.log(products)

    var totalPrice = products.reduce((a,b)=>getTotal(a,b),0)
    function getTotal(p1, p2){
        var cash = !p2.price
                    ?
                        parseInt(p2.price1)*parseInt(p2.qty)
                    :
                        parseInt(p2.price)*parseInt(p2.qty)
        return(cash + p1)
    }
    //console.log(totalPrice)

    var subTotal = products.reduce((a,b)=>getTotalPrice(a,b),0)
    function getTotalPrice(p1,p2){
        var price = !p2.price
                    ?
                        p2.offerprice1 > 0
                        ?
                            parseInt(p2.offerprice1)*parseInt(p2.qty)
                        :
                            parseInt(p2.price1)*parseInt(p2.qty)
                    :
                        p2.offerprice > 0
                        ?
                            parseInt(p2.offerprice)*parseInt(p2.qty)
                        :
                            parseInt(p2.price)*parseInt(p2.qty)
        return( price + p1 )
    }

    const delivery = () => {
        if(subTotal < 500)
        {
            return(
                <span>{parseInt(150)}</span>
            )
        }
        else
        {
            return(
                <span>Free Delivery</span>
            )
        }
    }

    const payableAmount = () => {
        if(subTotal < 500)
        {
            return(
                <span>{parseInt(subTotal) + parseInt(150)}</span>
            )
        }
        else
        {
            return(
                <span>{parseInt(subTotal)}</span>
            )
        }
    }

    const finalAmt = payableAmount().props.children
    const delivery_charge = delivery().props.children

    var savings = products.reduce((a,b)=>getSavings(a,b),0)
    function getSavings(p1, p2){
        var price = !p2.price
                    ?
                        p2.offerprice1 > 0
                        ?
                            (parseInt(p2.price1)*parseInt(p2.qty)) - (parseInt(p2.offerprice1)*parseInt(p2.qty))
                        :
                            0
                    :
                        p2.offerprice > 0
                        ?
                            (parseInt(p2.price)*parseInt(p2.qty)) - (parseInt(p2.offerprice)*parseInt(p2.qty))
                        :
                            0
        return(price + p1)
    }

    const handleClickSuccess = () => {
        setOpenSuccess(true)
    }
    const handleClickWarning = () => {
        setOpenWarning(true)
    }
    const handleCloseWarning = () => {
        setOpenWarning(false)
    }
    const handleCloseSuccess = () => {
        setOpenSuccess(false)
    }

    useEffect(function(){
        fetchAddress()
        fetchLastOrderInvoiceNo()
        setLoading(false)
    },[])

    const fetchAddress = async() => {
        var body = {customermobileno: customerMobileNo}
        var result = await postData('address/checkaddress', body)
        setAddressStatus({ status: result.result, data: result.data })
    }

    const fetchLastOrderInvoiceNo = async() => {
        var result = await getData('order/lastorderinvoice')
        setLastOrderInvoice(result.data[0])
    }

    const handleAddressSubmit = async() => {
        if( name == '' || houseNo == '' || address == '' || city == '' || state == '' || pincode == '' || phone == '' )
        {
            setMessageWarning( "Please fill all the details." )
            {handleClickWarning()}
        }
        else
        {
            var body = { name: name, houseno: houseNo, address: address, city: city, state: state, pincode: pincode, billmobileno: phone, customermobileno: customerMobileNo }
            var result = await postData('address/insertaddress', body)
            if(result.result)
            {
                setMessageSuccess( "Address Saved" )
                {handleClickSuccess()}
                fetchAddress()
            }
            else
            {
                setMessageWarning( "Server Error: Something went wrong!" )
                {handleClickWarning()}
            }
        }
        toggleDrawer('right', false)
    }

    const handleChooseAddress = async(item) => {
        setLoading(true)
        var body = { amount: finalAmt }
        var result  = await postData('order/orderid', body)
        if(result.result)
        {
            dispatch({ type: 'Delivery_Address', payload: [ item.billmobileno, item ]})
            navigate(`/rzppayment`, { state : {response: result.data, invoiceno: lastOrderInvoice.invoiceno, delivery: delivery_charge}})
        }
        else
        {
            setMessageWarning( "Server Error: Something went wrong!" )
            {handleClickWarning()}
            console.log(result.data)
        }
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
        {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    };

    const addNewAddress = (anchor) => (
        <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }} role="presentation">
            <Grid container spacing={1.2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={3}>
                        <Grid item xs={2}>
                            <ArrowBackIosNew className={classes.arrow} onClick={toggleDrawer(anchor, false)} />
                        </Grid>
                        <Grid item xs={9} className={classes.drawerhead}>ADD NEW ADDRESS</Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <List sx={{ margin:"4% 0% 4% 0%"}}>
                        <Grid item xs={12} sx={{ margin:'4% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setName(event.target.value)} size="small" label="Name" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setHouseNo(event.target.value)} size="small" label="House/Flat/Office No." variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setAddress(event.target.value)} size="large" label="Colony/Area/Road Name" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setCity(event.target.value)} size="small" label="City" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setState(event.target.value)} size="small" label="State" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setPincode(event.target.value)} size="large" label="Pincode" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField
                                sx={{ input: { color: '#c6186d' } }} 
                                type='tel' 
                                onChange={(event)=>setPhone(event.target.value)} 
                                size="small" 
                                label="Phone" 
                                variant="filled" 
                                fullWidth
                            />
                        </Grid>
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper1} elevation={10}>
                        <Grid item xs={12}>
                            <Button
                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },
                                borderRadius:0,
                                backgroundColor:'#e52c86',
                                height:'8vh',
                                }}
                                className={classes.btnsubmit}
                                variant="contained"
                                fullWidth
                                onClick={handleAddressSubmit}
                            >
                                Ship to this Address
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );

    const showShoppingBagItems1 = () => {
        return(
            products.map((item) => {
                return(
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className={classes.block}>
                                <div className={classes.row}>
                                    <img src={`${ServerURL}/images/${item.item.producticon}`} alt='checkout-img' className={classes.checkoutimg} />
                                    <div className={classes.col}>
                                        <span className={classes.productname}>{item.item.productname}</span>
                                        <span className={classes.bold}>
                                            Size -
                                            <span className={classes.details}> {item.size}</span> 
                                        </span>
                                        <Grid item xs={8} className={classes.details} style={{ margin:'1% 0% 0% 0%' }}>
                                            {
                                            item.size == undefined
                                            ?
                                            <></>
                                            :
                                            <Grid item xs={8} className={classes.details} style={{ margin:'0.5% 0% 0% 0%' }}>
                                                Size : 
                                                <span className={classes.details1}> {item.size}</span>
                                            </Grid>
                                            }
                                        </Grid>
                                        {
                                            item.color === undefined
                                            ?
                                                <></>
                                            :
                                                <span className={classes.bold}>
                                                    Color -
                                                    <span className={classes.details}> {item.color}</span> 
                                                </span>
                                        }
                                        <span className={classes.bold1}>
                                            Gift Wrap - 
                                            <span className={classes.details}> {item.giftWrap}</span>
                                        </span>
                                        <span className={classes.price}>
                                        {
                                            item.offerprice > 0
                                            ?
                                                item.giftWrap === 'With Gift Wrap'
                                                ?
                                                    <div>
                                                        Rs. {parseInt(item.offerprice) + parseInt(100)}/--
                                                        <span className={classes.percentoff}>
                                                            {Math.round((item.price-item.offerprice)/item.price*100)}% Off
                                                        </span>
                                                    </div>
                                                :
                                                    <div>
                                                        Rs. {item.offerprice}/--
                                                        <span className={classes.percentoff}>
                                                            {Math.round((item.price-item.offerprice)/item.price*100)}% Off
                                                        </span>
                                                    </div>
                                            :
                                                item.giftWrap === 'With Gift Wrap'
                                                ?
                                                    <div>Rs. {parseInt(item.price) + parseInt(100)}/--</div>
                                                :
                                                    <div>Rs. {item.price}/--</div>
                                        }
                                        </span>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    const showShoppingBagItems = () => {
        return(
            products.map((item) => {
                return(
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className={classes.block}>
                                <Grid item xs={12} className={classes.row}>
                                    <Grid item xs={4}>
                                        <img src={`${ServerURL}/images/${item.item.producticon}`} alt='checkout-img' className={classes.checkoutimg} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12}>
                                            <div className={classes.productname}>{item.item.productname}</div>
                                        </Grid>
                                        <Grid item xs={10}>
                                            {
                                            item.size == undefined
                                            ?
                                            <></>
                                            :
                                            <Grid item xs={8} className={classes.details} sx={{ margin:'0% 0% 0% 4%' }}>
                                                Size : 
                                                <span className={classes.details}> {item.size}</span>
                                            </Grid>
                                            }
                                        </Grid>
                                        <Grid item xs={10}>
                                            {
                                            item.color == undefined
                                            ?
                                            <></>
                                            :
                                            <Grid item xs={8} className={classes.details} sx={{ margin:'0% 0% 0% 4%' }}>
                                                Color : 
                                                <span className={classes.details}> {item.color}</span>
                                            </Grid>
                                            }
                                        </Grid>
                                        {/* <Grid item xs={10} className={classes.price} sx={{ margin:'4% 0% 0% 3.5%' }}>
                                            Qty :
                                            <span className={classes.details}> {item.qty}</span>
                                        </Grid> */}
                                        <Grid item xs={10} className={classes.price} sx={{ margin:'5% 0% 0% 4%' }}>
                                            {
                                                item.price === undefined
                                                ?
                                                    item.offerprice1 > 0
                                                    ?
                                                        <span>
                                                            <s className={classes.cutprice}>Rs.{parseInt(item.price1)*parseInt(item.qty)}</s>
                                                            &nbsp;&nbsp;<span className={classes.price}>Rs. {parseInt(item.offerprice1)*parseInt(item.qty)}/--</span>
                                                            <div className={classes.discount} style={{ margin:'1% 0% 0% 0%'}}>{(parseInt(item.price1)*parseInt(item.qty)) - (parseInt(item.offerprice1)*parseInt(item.qty))}&#8377; Discount</div>
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
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    const showBilling = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12} className={classes.billing}>Payment Details</Grid>
                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12} sx={{ margin:'0% 1% 0% 1%' }}>
                    <span className={classes.bill}>
                        Bag Total
                        <span className={classes.billdesc}>{totalPrice}</span>
                    </span>
                </Grid>
                <Grid item xs={12} sx={{ margin:'0% 1% 0% 1%' }}>
                    <span className={classes.bill}>
                        Savings
                        <span className={classes.billdesc} style={{ color:'#e52c86' }}>- {savings}</span>
                    </span>
                </Grid>
                <Grid item xs={12} sx={{ margin:'0% 1% 0% 1%' }}>
                    <span className={classes.bill}>
                        Sub Total
                        <span className={classes.billdesc}>{subTotal}</span>
                    </span>
                </Grid>
                <Grid item xs={12} sx={{ margin:'0% 1% 0% 1%' }}>
                    <span className={classes.bill}>
                        Delivery Charge
                        <span className={classes.billdesc} style={{ color:'#e52c86' }}>
                            {
                                subTotal < 500
                                ?
                                    <span>150</span>
                                :
                                    <span>Free Delivery</span>
                            }
                        </span>
                    </span>
                </Grid>

                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12} sx={{ margin:'0% 3% 0% 1%' }}>
                    <span className={classes.pay}>
                        Payable Amount
                        <span className={classes.paydesc}>Rs. {payableAmount()}</span>
                    </span>
                </Grid>
                <Grid item xs={12}><Divider /></Grid>
            </Grid>
        )
    }

    const showAddress = () => {
        return(
            <Paper className={classes.col} sx={{ padding:'2% 2% 2% 2%' }} elevation={5}>
                <div className={classes.head}>ADDRESS</div>
                {
                    addressStatus.data.map((item) => {
                        return(
                            <Grid item xs={12} sx={{ border:'1px solid #bdc3c7', margin:'2% 2% 2% 2%', padding:'3.5% 3.5% 3.5% 3.5%' }}>
                            <div className={classes.name}>{item.name}</div>
                            <div className={classes.address}>{item.houseno} {item.address}, {item.state}</div>
                            <div className={classes.address}>{item.city} - {item.pincode}</div>
                            <div className={classes.address}>{item.billmobileno}</div>
        
                            <Grid item xs={12} sx={{ display:'flex' }}>
                                {/* <Grid item xs={3} sx={{ margin:'4% 4% 0% 1%'}}>
                                    <Button
                                        sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                            borderColor: "#c6186d", 
                                        },
                                        borderColor:'#e52c86',
                                        color:'#c6186d',
                                        height:'5vh',
                                        borderRadius:2,
                                    }}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        Edit
                                    </Button>
                                </Grid> */}
                                <Grid item xs={6} sx={{ margin:'4% 3% 0% 1%' }}>
                                    <Button
                                        sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                        },
                                        borderRadius:2,
                                        backgroundColor:'#e52c86',
                                        height:'5vh',
                                    }}
                                        className={classes.btnsubmit}
                                        variant="contained"
                                        fullWidth
                                        onClick={()=>handleChooseAddress(item)}
                                    >
                                        Deliver Here 
                                        <span className={classes.icon}> <East fontSize="small" /></span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        )
                    })
                }
            </Paper>
        )
    }

    function checkoutView()
    {
        return(
            <Grid container spacing={2} className={classes.root}>
                {
                    addressStatus.status
                    ?
                        <Grid item xs={2.4}>
                            <Button
                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },
                                borderRadius:0,
                                backgroundColor:'#e52c86',
                                height:'6vh',
                            }}
                                variant="contained"
                                fullWidth
                                onClick={toggleDrawer('right', true)}
                            >
                                Add New Address
                            </Button>
                        </Grid>
                    :
                        <></>
                }
                <Grid item xs={4} sx={{ padding:'2% 2% 2% 2%' }}>    
                    {
                        addressStatus.status
                        ?
                            <div>{showAddress()}</div>
                        :
                            <Paper className={classes.col} sx={{ padding:'2% 2% 2% 2%' }} elevation={5}>
                                <div className={classes.head}>ADDRESS</div>
                                <Grid item xs={8}>
                                    <Button
                                        sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                        },
                                        borderRadius:0,
                                        backgroundColor:'#e52c86',
                                        height:'6vh',
                                    }}
                                        variant="contained"
                                        fullWidth
                                        onClick={toggleDrawer('right', true)}
                                    >
                                        Add New Address
                                    </Button>
                                </Grid>
                            </Paper>
                    }
                </Grid>

                <Grid item xs={3.8} sx={{ display:'flex', flexDirection:'column', }}>
                    <Paper elevation={5}>
                        <div className={classes.qtybag}>{keys.length} Gifts in your Bag</div>
                    </Paper>
                    {
                        keys.length > 2
                        ?
                            <div className={classes.scroll}>
                                {showShoppingBagItems()}
                                {/* {showShoppingBagItems1()} */}
                            </div>
                        :
                            <div>
                                {showShoppingBagItems()}
                            </div>
                    }
                    <Paper elevation={5}>
                        <div style={{ padding:10 }}>{showBilling()}</div>
                    </Paper>
                </Grid>
            </Grid>
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
                <>
                    <div><StepperHeader /></div>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {checkoutView()}
                        </Grid>
                    </Grid>
                    <React.Fragment key={"right"}>
                        <Drawer
                            anchor={"right"}
                            open={openDrawer["right"]}
                            onClose={toggleDrawer("right", false)}
                        >
                            {addNewAddress("right")}
                        </Drawer>
                    </React.Fragment>
                    {handleAlertWarning()}
                    {handleAlertSuccess()}
                </>
            }
        </div>
    )
}