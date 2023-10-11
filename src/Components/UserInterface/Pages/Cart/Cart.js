import React, { useState } from "react";
import useStyles from "./CartCss";
import { Grid, Button, Divider } from "@mui/material";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { MainHeader } from "../../Components/Header/MainHeader";
import { getToken, isValidAuth, postData, ServerURL } from "../../../APIServices/FetchNodeServices";
import EmptyBag from "../../../Assets/Images/shoppingbag.jpg"
import InfoHeader from "../../Components/Header/InfoHeader";
import { useDispatch } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Cart(){
    const classes = useStyles()
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)

    var navigate = useNavigate()
    var dispatch = useDispatch()
    var shoppingBag = useSelector(state => state.cartbag)
    var keys = Object.keys(shoppingBag)
    var products = Object.values(shoppingBag)

    //console.log(products)

    const subTotal = products.reduce((a,b)=>getTotalPrice(a,b),0)
    function getTotalPrice(p1,p2){
        let price = !p2.price
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

    const handleCheckAuth = async() => {
        setLoading(true)
        //var result = await isValidAuth('customer', /* localStorage.getItem('id'), */ 9109472941,(iss mobileno ko customerid se fetch kr vana hai) localStorage.getItem('id'))
        var result = await getToken('customer', localStorage.getItem('id'))
        //alert(JSON.stringify(result))

        //console.log("checkauth",result)


        if(result == null)
        {
            navigate(`/signin`)
            setLoading(false)
        }
        else
        {
            if(result.auth)
            {
                const token = result.token
                fetchCustomerById(token)
            }
            //console.log("account",result)
        }
    }

    const fetchCustomerById = async(token) => {
        var body = {id: localStorage.getItem('id')}
        var result = await postData('customer/displaycustomerbyid', body)
        //alert(JSON.stringify(result.data))

        //console.log("fetchCustomerById",result)

        if(!result.result)
        {
            handleCheckAuth()
        }
        else
        {
            let mobile = result.data.mobileno
            setTimeout(() => {
               checkAuthMobile(token, mobile) 
            }, 500);
        }
    }

    const checkAuthMobile = async(token, mobile) => {
        //var result = await isValidAuth('customer', /* localStorage.getItem('id'), */ 9109472941,(iss mobileno ko customerid se fetch kr vana hai) localStorage.getItem('id'))
        var result = await isValidAuth('customer', token, mobile)
        //alert(JSON.stringify(result))

        //console.log("checkAuthMobile", result)

        if(!result.auth)
        {
            navigate(`/signin`)
            setLoading(false)
            
        }
        else
        {
            navigate(`/checkout`)
            dispatch({ type: 'Add_Customer', payload: [result.data.mobileno, result.data]})
            setLoading(false)
        }
    }

    /* const handleCheckAuth = async() => {
        setLoading(true)
        var result = await isValidAuth('customer', localStorage.getItem('id'))
        //alert(JSON.stringify(result))

        console.log("cart",result)

        if(result.auth)
        {
            navigate(`/checkout`)
            dispatch({ type: 'Add_Customer', payload: [result.data.mobileno, result.data]})
            setLoading(false)
        }
        else
        {
            
        }
    } */
    
    const handleProducts = (value) => {
        setLoading(true)
        navigate(`/products/${value.subcategoryid}/${value.subcategoryname}/productview/${value.productid}/${value.productname}`)
        setLoading(false)
    }

    const handleRemove = (item) => {
        dispatch({ type: 'Delete_Products', payload: [item.item.productid, item]})
        setRefresh(!refresh)
    }

    const handleEmpty = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.root}>
                    <img src={EmptyBag} alt="empty-bag" className={classes.img} />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.desc}>Your Cart is Empty</div>
                </Grid>
                <Grid item xs={12} className={classes.root}>
                    <Button
                        sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                        },
                        borderRadius:0,
                        backgroundColor:'#e52c86',
                        height:'6vh',
                        width:'20%'
                    }}
                        className={classes.btnsubmit}
                        variant="contained"
                        //fullWidth
                        onClick={()=>navigate(`/`)}
                    >
                        Continue Shopping
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const handleCartItems = () => {
        return(
            <Grid container spacing={2}>
                <Grid item xs={9.2} className={classes.grid} style={{ margin:'1% 0% 0% 10%' }}>
                    <div className={classes.title}></div>
                    <div className={classes.title}>Product</div>
                    <div className={classes.title}>Qty</div>
                    <div className={classes.title}>Sub Total</div>
                </Grid>
                <Grid item xs={11} style={{ margin:'0% 0% 0% 2%' }}>
                    <Divider />
                </Grid>
                <Grid item xs={11.7} style={{ margin:'0% 0% 0% 2%' }}>
                    {
                        products.map((item)=>{
                            return(
                                <Grid container spacing={1}sx={{ margin:'0% 0% 2% 0%' }}>
                                    <Grid item xs={1.6} style={{ margin:'0% 0% 0% 4%' }}>
                                        <img src={`${ServerURL}/images/${item.item.producticon}`} alt="cart-products" onClick={()=>handleProducts(item.item)} className={classes.cartimg} />
                                    </Grid>
                                    <Grid item xs={4.4} style={{ margin:'0% 0% 0% 2.6%' }}>
                                        <Grid item xs={12} className={classes.name} onClick={()=>handleProducts(item.item)}>
                                            {item.item.productname}
                                        </Grid>
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
                                            item.color == undefined
                                            ?
                                            <></>
                                            :
                                            <Grid item xs={8} className={classes.details} style={{ margin:'0.5% 0% 0% 0%' }}>
                                                Color : 
                                                <span className={classes.details1}> {item.color}</span>
                                            </Grid>
                                        }
                                        <Grid item xs={8} className={classes.details} style={{ margin:'0.5% 0% 0% 0%' }}>
                                            Whatsapp No. : 
                                            <span className={classes.details1}> {item.userWhatsapp}</span>
                                        </Grid>
                                        <Grid item xs={8} className={classes.price} style={{ margin:'2% 0% 0% 0%' }}>
                                            Price :&nbsp;
                                            <span className={classes.details1}>
                                                {
                                                    item.price === undefined
                                                    ?
                                                        item.offerprice1 > 0
                                                        ?
                                                            <span>
                                                                <s className={classes.cutprice}>Rs.{item.price1}</s>
                                                                &nbsp;&nbsp;<span className={classes.price}>Rs. {item.offerprice1}/--</span>
                                                            </span>
                                                        :
                                                            <span>Rs. {item.price1}/--</span>
                                                    :
                                                        item.offerprice > 0
                                                        ?
                                                            <span>
                                                                <s className={classes.cutprice}>Rs.{item.price}</s>
                                                                &nbsp;&nbsp;<span className={classes.price}>Rs. {item.offerprice}/--</span>
                                                            </span>
                                                        :
                                                            <span>Rs. {item.price}/--</span>
                                                }
                                            </span>
                                        </Grid>
                                        <Grid item xs={8} style={{ margin:'3% 0% 0% 0%' }}>
                                            <Button
                                                sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                                    borderColor: "#c6186d", 
                                                },
                                                borderColor:'#e52c86',
                                                color:'#c6186d',
                                                height:'4vh',
                                                borderRadius:0,
                                            }}
                                                variant="outlined"
                                                onClick={()=>handleRemove(item)}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1.5} style={{ fontFamily:'serif', fontSize:18, margin:'0% 0% 0% 0.4%' }}>
                                        {item.qty}
                                    </Grid>
                                    <Grid item xs={2} style={{ fontFamily:'serif', fontSize:18, margin:'0% 0% 0% 0.5%', display:'flex', justifyContent:'end' }}> 
                                        {
                                            item.price === undefined
                                            ?
                                                item.offerprice1 > 0
                                                ?
                                                    <div>Rs. {item.offerprice1*item.qty}/--</div>
                                                :
                                                    <div>Rs. {item.price1*item.qty}/--</div>
                                            :
                                                item.offerprice > 0
                                                ?
                                                    <div>Rs. {item.offerprice*item.qty}/--</div>
                                                :
                                                    <div>Rs. {item.price*item.qty}/--</div>
                                        }
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
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
                <>
                <div><InfoHeader /></div>
                <div style={{ margin:'26px 0px 0px 0px' }}><MainHeader /></div>
    
                {
                    keys.length > 0
                    ?
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.cart} sx={{ margin:'2% 0% 0% 2%' }}>
                                <div className={classes.head}>Your Cart</div>
                            </Grid>
                            <Grid item xs={11} style={{ margin:'0% 0% 0% 2%' }}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                {handleCartItems()}
                            </Grid>
                            <Grid item xs={11} style={{ margin:'0% 0% 2% 2%' }}>
                                <Divider />
                            </Grid>
                            <Grid item xs={10.8} style={{ display:'flex', justifyContent:'flex-end' }}>
                                <div className={classes.subtotal}>Sub Total :</div>
                                <div className={classes.subtotalcharge}>Rs. {subTotal}/--</div>
                            </Grid>
                            <Grid item xs={11} style={{ margin:'2% 0% 2% 0%' }} className={classes.cartbtn}>
                                <Grid item xs={2} style={{ margin:'1% 1% 0% 0%' }} className={classes.cartbtn}>
                                    <Button
                                        sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                            borderColor: "#c6186d", 
                                        },
                                        borderColor:'#e52c86',
                                        color:'#c6186d',
                                        height:'8vh',
                                        borderRadius:0,
                                    }}
                                        variant="outlined"
                                        fullWidth
                                        onClick={()=>navigate(`/`)}
                                    >
                                        Continue Shopping
                                    </Button>
                                </Grid>
                                <Grid item xs={2} style={{ margin:'1% 0% 0% 0%' }} className={classes.cartbtn}>
                                    <Button
                                        sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                        },
                                        borderRadius:0,
                                        backgroundColor:'#e52c86',
                                        height:'8vh',
                                    }}
                                        variant="contained"
                                        fullWidth
                                        onClick={()=>handleCheckAuth()}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    :
                        <Grid item xs={12} sx={{ margin:'2% 0% 3% 0%'}}>
                            {handleEmpty()}
                        </Grid>
                }
                <Footer />
                </>
            }
        </div>
    )
}