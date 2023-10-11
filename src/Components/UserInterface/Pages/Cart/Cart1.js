import React, { useEffect, useState } from "react";
import useStyles from "./CartCss";
import { Grid, Button, Divider } from "@mui/material";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { MainHeader } from "../../Components/Header/MainHeader";
import { isValidAuth, ServerURL } from "../../../APIServices/FetchNodeServices";
import EmptyBag from "../../../Assets/Images/shoppingbag.jpg"
import InfoHeader from "../../Components/Header/InfoHeader";
import { useDispatch } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import { Cancel, CancelOutlined } from "@mui/icons-material";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Cart1()
{
    const classes = useStyles()
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showRemove, setShowRemove] = useState(false);

    const handleMouseEnter = () => {
        setShowRemove(true);
    };

    const handleMouseLeave = () => {
        setShowRemove(false);
    };

    var navigate = useNavigate()
    var dispatch = useDispatch()
    var giftCharge = 100
    var shoppingBag = useSelector(state => state.cartbag)
    var keys = Object.keys(shoppingBag)
    var products = Object.values(shoppingBag)

    //console.log(products)

    var subTotal = products.reduce((a,b)=>getTotalPrice(a,b),0)
    function getTotalPrice(p1,p2){
        var price = p2.giftWrap === 'With Gift Wrap'
                    ?
                        p2.offerprice > 0
                        ?
                            parseInt(p2.offerprice) + parseInt(giftCharge)
                        :
                            parseInt(p2.price) + parseInt(giftCharge)
                    :
                        p2.offerprice > 0
                        ?
                            parseInt(p2.offerprice)
                        :
                            parseInt(p2.price)
            return( price + p1 )
    }

    const handleCheckAuth = async() => {
        setLoading(true)
        var result = await isValidAuth('customer')
        //alert(JSON.stringify(result))
        if(result.auth)
        {
            navigate(`/checkout`)
            dispatch({ type: 'Add_Customer', payload: [result.data.mobileno, result.data]})
            setLoading(false)
        }
        else
        {
            navigate(`/signin`)
            setLoading(false)
        }
    }
    
    const handleProducts = (value) => {
        navigate(`/products/${value.subcategoryid}/${value.subcategoryname}/productview/${value.productid}/${value.productname}`)
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
                    <div className={classes.title}>Price</div>
                    <div className={classes.title}>Sub Total</div>
                </Grid>
                <Grid item xs={11} style={{ margin:'0% 0% 0% 2%' }}>
                    <Divider />
                </Grid>
                <Grid item xs={11.5} style={{ margin:'0% 0% 0% 2%' }}>
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
                                            Gift Wrap :  
                                            <span className={classes.details1}> {item.giftWrap}</span>
                                        </Grid>
                                        <Grid item xs={8} className={classes.details} style={{ margin:'0.5% 0% 0% 0%' }}>
                                            Whatsapp No. : 
                                            <span className={classes.details1}> {item.userWhatsapp}</span>
                                        </Grid>
                                        <Grid item xs={8} className={classes.price} style={{ margin:'4% 0% 0% 0%' }}>
                                            MRP :&nbsp;
                                            <span className={classes.details1}> 
                                                {
                                                    item.price === undefined
                                                    ?
                                                        item.offerprice1 > 0
                                                        ?
                                                            item.giftWrap === 'With Gift Wrap'
                                                            ?
                                                                <span>Rs. {parseInt(item.offerprice1) + parseInt(100)}/--</span>
                                                            :
                                                                <span>Rs. {item.offerprice1}/--</span>
                                                        :
                                                            item.giftWrap === 'With Gift Wrap'
                                                            ?
                                                                <span>Rs. {parseInt(item.price1) + parseInt(100)}/--</span>
                                                            :
                                                                <span>Rs. {item.price1}/--</span>
                                                    :
                                                        item.offerprice > 0
                                                        ?
                                                            item.giftWrap === 'With Gift Wrap'
                                                            ?
                                                                <span>Rs. {parseInt(item.offerprice) + parseInt(100)}/--</span>
                                                            :
                                                                <span>Rs. {item.offerprice}/--</span>
                                                        :
                                                            item.giftWrap === 'With Gift Wrap'
                                                            ?
                                                                <span>Rs. {parseInt(item.price) + parseInt(100)}/--</span>
                                                            :
                                                                <span>Rs. {item.price}/--</span>
                                                }
                                            </span>
                                        </Grid>
                                        <Grid item xs={8} style={{ margin:'4.5% 0% 0% 0%' }}>
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
                                    <Grid item xs={2} style={{ margin:'0% 0% 0% 0%' }}>
                                        Rs. {}
                                        { 
                                            item.price === undefined
                                            ?
                                            item.price1
                                            :
                                            item.price
                                        }/--
                                    </Grid>
                                    <Grid item xs={2.3} style={{ margin:'0% 0% 0% 2.8%', display:'flex', justifyContent:'center' }}> 
                                        {
                                            item.price === undefined
                                            ?
                                                item.offerprice1 > 0
                                                ?
                                                    item.giftWrap === 'With Gift Wrap'
                                                    ?
                                                        <div>Rs. {parseInt(item.offerprice1) + parseInt(100)}/--</div>
                                                    :
                                                        <div>Rs. {item.offerprice1}/--</div>
                                                :
                                                    item.giftWrap === 'With Gift Wrap'
                                                    ?
                                                        <div>Rs. {parseInt(item.price1) + parseInt(100)}/--</div>
                                                    :
                                                        <div>Rs. {item.price1}/--</div>
                                            :
                                                item.offerprice > 0
                                                ?
                                                    item.giftWrap === 'With Gift Wrap'
                                                    ?
                                                        <div>Rs. {parseInt(item.offerprice) + parseInt(100)}/--</div>
                                                    :
                                                        <div>Rs. {item.offerprice}/--</div>
                                                :
                                                    item.giftWrap === 'With Gift Wrap'
                                                    ?
                                                        <div>Rs. {parseInt(item.price) + parseInt(100)}/--</div>
                                                    :
                                                        <div>Rs. {item.price}/--</div>
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
        </div>
    )
}