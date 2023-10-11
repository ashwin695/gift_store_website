import React, { useState, useEffect, forwardRef } from "react";
import useStyles from "./ProductViewCss";
import { styled } from "@mui/material/styles";
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Snackbar, Avatar } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate, useParams } from "react-router-dom";
import { postData, ServerURL } from "../../../APIServices/FetchNodeServices";
import { MainHeader } from "../../Components/Header/MainHeader";
import { useDispatch } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import MuiAlert from "@mui/material/Alert";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import CategoryHeader2 from "../../Components/Header/CategoryHeader2";
import { Boy, ShoppingBag } from "@mui/icons-material";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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

export default function ProductView3(){
    const classes = useStyles()
    const [productData, setProductData] = useState([])
    const [costPrice, setCostPrice] = useState([])
    const [sizeData, setSizeData] = useState([])
    const [sizeId, setSizeId] = useState()
    const [sizeName, setSizeName] = useState('')
    const [colorData, setColorData] = useState([])
    const [colorId, setColorId] = useState()
    const [colorName, setColorName] = useState('')
    const [giftWrap, setGiftWrap] = useState('Without Gift Wrap')
    const [userWhatsapp, setUserWhatsapp] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState()
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showBtn, setShowBtn] = useState(false)
    const [value,setValue] = useState()
    const [gotoCart, setGotoCart] = useState(false)

    var params = useParams()
    var dispatch = useDispatch()
    var navigate = useNavigate()
    var size = sizeName.sizename
    var color = colorName.colorname
    var price = costPrice.price
    var offerprice = costPrice.offerprice
    let price1 = productData.price
    let offerprice1 = productData.offerprice
    let id = productData.productid
    const key = 'cgv-cart'
    let existingData = localStorage.getItem(key)
    
    //console.log("id",productData.productid)
    //console.log(productData)
    //console.log(costPrice)
    //console.log(price)

    useEffect(function(){
        fetchProductData()
        fetchSize()
        fetchColor()     
        setLoading(false)
    },[])


    const fetchProductData = async() => {
        var body = {productid: params.id}
        var result = await postData('product/displayproductbyid', body)
        if(result.status)
        {
            setProductData(result.result)
            if(JSON.parse(localStorage.getItem(result.result.productid)).item.productid === result.result.productid)
            {
                setGotoCart(true)
            }
            else
            {
                setGotoCart(false)
            }
        }
    }

    const fetchSize = async() => {
        var body = {productid: params.id}
        var result = await postData('size/displaysizebyproduct', body)
        setSizeData(result.result)
    }

    const fetchColor = async() => {
        var body = {productid: params.id}
        var result = await postData('color/displaycolorbyproduct', body)
        setColorData(result.result)
    }

    const fetchCostPrice = async(sid) => {
        var body = {sizeid: sid}
        var result = await postData('costprice/displaycostpricebysize', body)
        setCostPrice(result.result)
    }

    const fetchSizebySize =async(sid) => {
        var body = {sizeid: sid}
        var result = await postData('size/displaysizebysize', body)
        setSizeName(result.result)
    }

    const fetchColorbyColor =async(cid) => {
        var body = {colorid: cid}
        var result = await postData('color/displaycolorbycolor', body)
        setColorName(result.result)
    }

    const handleGiftWrapChange=(event)=>{
        setGiftWrap(event.target.value)
    }

    const handleChangeSize = (event) => {
        setSizeId(event.target.value)
        fetchCostPrice(event.target.value)
        fetchSizebySize(event.target.value)
    }

    const handleChangeColor = (event) => {
        setColorId(event.target.value)
        fetchColorbyColor(event.target.value)
    }

    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleMinus=()=>{
        var c=value-1
        if(c>=0)
        {setValue(c)}
    }

    const handlePlus=()=>{
        var c=value+1
        setValue(c)
    }

    const fillSizes = () => {
        return(
            sizeData.map((item)=>{
                return(
                    <MenuItem value={item.sizeid}>{item.sizename}</MenuItem>
                )
            })
        )
    }

    const fillColors = () => {
        return(
            colorData.map((item)=>{
                return(
                    <MenuItem value={item.colorid}>{item.colorname}</MenuItem>
                )
            })
        )
    }

    const handleBuyNow = (item) => {
        if( sizeData.length > 0 )
        {
            if( sizeId == null )
            {
                setMessage( "Select the Size Pls!" )
                {handleClick()}
            }
            else
            {
                if( userWhatsapp == '' )
                {
                    setMessage( "Enter your Whatsapp no. for Order Updates!" )
                    {handleClick()}
                }
                else
                {
                    /* var body = {item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice, uploadedFiles, filesWishMsg, filesName, filesMsg} */
                    var body = { item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice }
                    dispatch({ type: 'Add_Products', payload: [item.productid, body]})
                    setRefresh(!refresh)
                    navigate(`/cart`)
                }  
            }
        }
        else if( colorData.length > 0 )
        {
            if( colorId == null )
            {
                setMessage( "Select the Color Pls!" )
                {handleClick()}
            }
            else
            {
                if( userWhatsapp == '' )
                {
                    setMessage( "Enter your Whatsapp no. for Order Updates!" )
                    {handleClick()}
                }
                else
                {
                    /* var body = {item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice, uploadedFiles, filesWishMsg, filesName, filesMsg} */
                    var body = { item, giftWrap, userWhatsapp, size, sizeId, color, colorId, price1, offerprice1 }
                    dispatch({ type: 'Add_Products', payload: [item.productid, body]})
                    setRefresh(!refresh)
                    navigate(`/cart`)
                }  
            }
        }
        else
        {
            if( sizeId == null )
            {
                setMessage( "Select the Size Pls!" )
                {handleClick()}
            }
            else if( colorId == null )
            {
                setMessage( "Select the Color Pls!" )
                {handleClick()}
            }
            else
            {
                if( userWhatsapp == '' )
                {
                    setMessage( "Enter your Whatsapp no. for Order Updates!" )
                    {handleClick()}
                }
                else
                {
                    /* var body = {item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice, uploadedFiles, filesWishMsg, filesName, filesMsg} */
                    var body = { item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice }
                    dispatch({ type: 'Add_Products', payload: [item.productid, body]})
                    setRefresh(!refresh)
                    navigate(`/cart`)
                }  
            }
        }
    }

    const handleAddToCart = (item) => {
        if( sizeId == null )
        {
            setMessage( "Select the Size Pls!" )
            {handleClick()}
        }
        else
        {
            if( userWhatsapp == '' )
            {
                setMessage( "Enter your Whatsapp no. for Order Updates!" )
                {handleClick()}
            }
            else
            {
                var body = {item, giftWrap, userWhatsapp, size, sizeId, color, price}
                dispatch({ type: 'Add_Products', payload: [item.productid, body]})
                setRefresh(!refresh)
            }  
        }
    }

    const handleCart = (item) => {
        var body = { item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice }
        localStorage.setItem(item.productid, JSON.stringify(body))
        dispatch({ type: 'Add_Products', payload: [item.productid, localStorage.getItem(item.productid)]})
        
        console.log(JSON.parse(localStorage.getItem(item.productid)))
        //ret()
        setGotoCart(true)
        /* let data = new Set()
        let items = []
        if(existingData)
        {
            try
            {
                existingData = JSON.parse(existingData)
                console.log(existingData)
                existingData.find((element) => {
                    console.log(element.id)
                    if(element.id === id)
                    {
                        console.log("true")
                    }
                    else
                    {
                        console.log("false")
                        var body = { id, item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice }
                        existingData.push(body);
                        localStorage.setItem(key, JSON.stringify(existingData))
                        console.log("data updated")
                    }
                })
            }
            catch(e)
            {
                console.log("error occurs", e)
            }
        }
        else
        {
            var body = { id, item, giftWrap, userWhatsapp, size, sizeId, color, price, offerprice }
            items.push(body)
            localStorage.setItem(key, JSON.stringify(items))
            console.log("key added..!")
        } */
    }

    const imageAndButton = () => {
        return(
            <Grid container spacing={1} className={classes.rootcolumn}>
                <Grid item xs={9.5} className={classes.rootcolumn}>
                    <img src={`${ServerURL}/images/${productData.producticon}`} alt="product-images" className={classes.img} />
                </Grid>
                {/* <Grid item xs={4.7}>
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
                        onClick={()=>handleAddToCart(productData)}
                    >
                        {
                            productData.productid == items[0]
                            ?
                                <div>Go To Cart</div>
                            :
                                <div>Add To Cart</div>
                        }
                    </Button>
                    </Grid> */}
                    {/* <Grid item xs={9.35}>
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
                            onClick={()=>handleBuyNow(productData)}
                        >
                            BUY NOW
                        </Button>
                    </Grid> */}
                    {
                        gotoCart
                        ?
                        <Grid item xs={9.35}>
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
                                endIcon={<ShoppingBag />}
                                onClick={()=>handleCart(productData)}
                            >
                                Go to Cart
                            </Button>
                        </Grid>
                        :
                        <Grid item xs={9.35}>
                            <Button 
                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },
                                borderRadius:0,
                                backgroundColor:'#e52c86',
                                height:'8vh',
                                }}
                                variant="contained"
                                fullWidth
                                endIcon={<ShoppingBag />}
                                onClick={()=>handleCart(productData)}
                            >
                                Add to Cart
                            </Button>
                        </Grid>
                    }
                    {/* <Grid item xs={9.35}>
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
                            endIcon={<ShoppingBag />}
                            onClick={()=>handleCart(productData)}
                        >
                            Go to Cart
                        </Button>
                    </Grid> */}
            </Grid>
        )
    }

    const nameAndPrice = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.subname}>
                    {productData.subcategoryname}
                </Grid>
                <Grid item xs={12} className={classes.name}>
                    {productData.productname}
                    <Divider className={classes.divider} style={{ margin:'1% 0% 0% 0%' }} />
                </Grid>
                <Grid item xs={12} className={classes.margin}>
                    {
                        costPrice.offerprice || costPrice.price > 0
                        ?
                            costPrice.offerprice > 0
                            ?
                                <div>
                                    {
                                        giftWrap === 'With Gift Wrap'
                                        ?
                                            <span className={classes.price}>
                                                Rs. {parseInt(costPrice.offerprice)+parseInt(100)}/--
                                            </span>
                                        :
                                            <span className={classes.price}>Rs. {costPrice.offerprice}/--</span>
                                    }
                                    &nbsp;&nbsp;<s className={classes.cutprice}>Rs.{costPrice.price}</s>
                                    <span className={classes.percentoff}>
                                        {Math.round((costPrice.price-costPrice.offerprice)/costPrice.price*100)}% Off
                                    </span>
                                </div>
                            :
                                <div className={classes.price}>
                                    {
                                        giftWrap === 'With Gift Wrap'
                                        ?
                                            <span>Rs. {parseInt(costPrice.price)+parseInt(100)}/--</span>
                                        :
                                            <span>Rs. {costPrice.price}/--</span>
                                    }
                                </div>
                        :
                            productData.offerprice > 0
                            ?
                            <div>
                                {
                                    giftWrap === 'With Gift Wrap'
                                    ?
                                    <span className={classes.price}>Rs. {parseInt(productData.offerprice)+parseInt(100)}/--</span>
                                    :
                                    <span className={classes.price}>Rs. {productData.offerprice}/--</span>
                                }
                                &nbsp;&nbsp;<s className={classes.cutprice}>Rs.{productData.price}</s>
                                <span className={classes.percentoff}>
                                    {Math.round((productData.price-productData.offerprice)/productData.price*100)}% Off
                                </span>
                            </div>
                            :
                            <div className={classes.price}>
                                {
                                    giftWrap === 'With Gift Wrap'
                                    ?
                                        <span>Rs. {parseInt(productData.price)+parseInt(100)}/--</span>
                                    :
                                        <span>Rs. {productData.price}/--</span>
                                }
                            </div>
                    }
                </Grid>
            </Grid>
        )
    }

    const sizeAndColor = () => {
        return(
            <Grid container spacing={2} className={classes.margin}>
                {
                    sizeData.length > 0
                    ?
                        <Grid item xs={6}>
                            <FormControl sx={{ minWidth:120 }} size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sizeId}
                                    label="Size"
                                    onChange={handleChangeSize}
                                    //style={{ color: '#c6186d' }}
                                >
                                    {fillSizes()}
                                </Select>
                            </FormControl>
                        </Grid>
                    :
                        <></>
                }
                {
                    colorData.length === 1
                    ?
                        <></>
                    :
                        <Grid item xs={6}>
                            <FormControl sx={{ minWidth:120 }} size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={colorId}
                                    label="Color"
                                    onChange={handleChangeColor}
                                    //style={{ color: '#c6186d' }}
                                >
                                    {fillColors()}
                                </Select>
                            </FormControl>
                        </Grid>
                }
            </Grid>
        )
    }

    const handleCustomisation = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className={classes.customisation}>
                        • {productData.imageupload} Pics Required.
                    </div>
                    <div className={classes.customisation}>
                        • {productData.wishingmessage} Wishing Message Required.
                    </div>
                    <div className={classes.customisation}>
                        • {productData.nameupload} Name Required.
                    </div>
                </Grid>
            </Grid>
        )
    }

    const handleAboutProduct = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.aboutproduct} style={{ padding:10 }}>
                    <div className={classes.descheading}>Speciality of the Product</div>
                    {productData.aboutproduct}
                </Grid>
            </Grid>
        )
    }

    const handleRequirementProduct = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.aboutproduct} style={{ padding:10 }}>
                    <div className={classes.descheading}>Requirements</div>
                    {productData.requirement}
                </Grid>
            </Grid>
        )
    }

    const handleMakingTime = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.aboutproduct} style={{ padding:10 }}>
                    <div className={classes.descheading}>Making Time</div>
                    {productData.makingtime}
                </Grid>
            </Grid>
        )
    }
    
    const handleTrackingDetails= () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.aboutproduct} style={{ padding:10 }}>
                    <div className={classes.descheading}>Tracking Details</div>
                    <div>{productData.makingtime}</div>
                    <div>• You will receive Tracking Details on your Whatsapp.</div>
                    <div>• Delivered Products might a bit differ from the Above Image shown.</div>
                    <div>• Date of Delivery is not fixed as it is shipped via a Third-Party Courier companies.</div>
                    <div>• Please provide the correct Address Details.</div>
                    <div>• Sometimes delivery may not be possible on Sundays and National Holidays.</div>
                </Grid>
            </Grid>
        )
    }

    const handlePlaceOrder = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.aboutproduct} style={{ padding:10 }}>
                    <div className={classes.descheading}>Placing An Order</div>
                    <div>Step 1 - Choose option you need a product with or without gift wrap.</div>
                    <div>Step 2 - Provide your no. For order updates.</div>
                    <div>Step 3 - Click on buying it now, Once check again your order details.</div>
                    <div>Step 4 - Click on proceed to checkout then create your account.</div>
                    <div>Step 5 - Provide your address detail and click on continue shopping.</div>
                    <div>Step 6 - Choose the payment mode - COD / Prepaid.</div>
                    <div>Step 7 - Confirm your order and you will get an order no.</div>
                </Grid>
            </Grid>
        )
    }

    const handleCOD = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.aboutproduct} style={{ padding:10 }}>
                    <div className={classes.descheading}>Cash On Delivery</div>
                    <div>• Cash On Delivery is available.</div>
                    <div>• COD order takes 1-2 days extra in delivery than prepaid orders, because COD Order takes more time than Prepaid Order.</div>
                    <div>• Date of Delivery is not fixed as it is shipped via a Third-Party Courier companies.</div>
                    <div>• We suggest you, Make a Prepaid Orders if you want faster delivery.</div>
                </Grid>
            </Grid>
        )
    }
    
    const handlePolicy = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.aboutproduct} style={{ padding:10 }}>
                    <div className={classes.descheading}>Replacement Policy / Return Policy</div>
                    <div>• There is a certain process of return and replacement policy.</div>
                    <div>• Make a full video while opening the parcel.</div>
                    <div>• In case your Parcel is damaged or broken or having a issue regarding product, Make a Call/Whatsapp on 9109472941 within 24 hrs of delivery. After video confirmation, we will send you replacement without any charges.</div>
                    <div>• If opening video of parcel is not made, we will not be able to provide replacement.</div>
                    <Grid item xs={12} style={{ fontSize:15, padding:5 }}>
                        <span className={classes.descheading}>NOTE: </span>
                        <span style={{ fontWeight:500 }}>Refund will not the initiated in Breakage or Wrong Product only Replacement will be Done.</span>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    function handleAlert() {
        return(
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert severity="warning" sx={{ width: '100%' }}>
                    {message}
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
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            {/* <Grid item xs={12}>
                                <InfoHeader />
                            </Grid> */}
                            <Grid item xs={12} /* sx={{ margin: '2% 0% 0% 0%' }} */>
                                <MainHeader />
                            </Grid>
                            <Grid item xs={12}>
                                <CategoryHeader2 />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={classes.rootrow}>
                            <Grid item xs={5.3} className={classes.imggrid}>
                                {imageAndButton()}
                            </Grid>
            
                            <Grid item xs={6} style={{ margin:'1.5% 0% 0% 1%' }}>
                                {nameAndPrice()}
            
                                <Grid item xs={12} style={{ margin:'3% 0% 1.5% 0%' }}>
                                    <Divider />
                                </Grid>
            
                                <Grid container spacing={2} className={classes.margin}>
                                    {sizeAndColor()}
                                </Grid>
            
                                <Grid item xs={12} style={{ margin:'3% 0% 2% 0%' }}>
                                    <Divider />
                                </Grid>
            
                                <Grid container spacing={2} className={classes.margin}>
                                    <Grid item xs={6}>
                                        <FormControl size="small" fullWidth>
                                            <InputLabel id="demo-simple-select-label">Gift Wrap</InputLabel>
                                            <Select 
                                            labelId="demo-simple-select-label" 
                                            id="demo-simple-select"
                                            value={giftWrap}
                                            //autoWidth 
                                            label="Gift Wrap"
                                            onChange={handleGiftWrapChange}
                                            >
                                                <MenuItem fullWidth value='With Gift Wrap'>With Gift Wrap</MenuItem>
                                                <MenuItem fullWidth value='Without Gift Wrap'>Without Gift Wrap</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} style={{ margin:'0% 0% 0% 0%' }}>
                                        <CssTextField sx={{ input: { color: '#c6186d' } }} type='tel' onChange={(event)=>setUserWhatsapp(event.target.value)} size="small" label="Enter Whatsapp No. for Update" variant="outlined" fullWidth></CssTextField>
                                    </Grid>
                                </Grid>
            
                                <Grid item xs={12} className={classes.margin}>
                                    <div className={classes.descheading}>For Customisation : </div>
                                    {handleCustomisation()}
                                    {/* <div className={classes.descheading}>Finish all the details of your order, then send the requirements of order along with the Order ID</div>
                                    <div className={classes.descheading}>either on our Whatsapp - 9109472941 or on our Gmail - creativegiftsvilla01@gmail.com .</div> */}
                                    {/* <Divider sx={{ marginTop:2 }} /> */}
                                </Grid>
            
                                <Grid item xs={12} style={{ margin:'3% 0% 1.5% 0%' }}>
                                    <Divider className={classes.divider} style={{ margin:'1% 0% 0% 0%', height:5 }} />
                                </Grid>
            
                                <Grid item xs={12} className={classes.margin}>
                                    {handleAboutProduct()}
                                </Grid>
                                <Grid item xs={12} className={classes.margin}>
                                    {handleRequirementProduct()}
                                </Grid>
                                <Grid item xs={12} className={classes.margin}>
                                    {handleMakingTime()}
                                </Grid>
                            </Grid>
            
                            <Grid container spacing={2} className={classes.details}>
                                <Grid item xs={11.5} style={{ margin:'2% 0% 1.5% 0%' }}>
                                    <Divider className={classes.divider} style={{ margin:'1% 0% 0% 0%', height:5 }} />
                                </Grid>
                                <Grid item xs={11} className={classes.margin}>
                                    {handleTrackingDetails()}
                                </Grid>
                                <Grid item xs={11} className={classes.margin}>
                                    {handlePlaceOrder()}
                                </Grid>
                                <Grid item xs={11} className={classes.margin}>
                                    {handleCOD()}
                                </Grid>
                                <Grid item xs={11} className={classes.margin}>
                                    {handlePolicy()}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.margin}>
                            <Footer />
                        </Grid>
                        {handleAlert()}
                    </div>
            }
        </div>
    )

}