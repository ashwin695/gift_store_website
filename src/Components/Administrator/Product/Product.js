import React, { useState, useEffect } from "react";
import useStyles from "./ProductCss";
import { styled } from "@mui/material/styles";
import { Grid, Button, TextField, Avatar, TextareaAutosize } from "@mui/material";
import Gifts from "../../Assets/Images/gifts.png";
import { getData, postData } from "../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";
import { ListAlt } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllProducts from "./DisplayAllProducts";

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

export default function Product(props){
    const classes = useStyles()
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [offerPrice, setOfferPrice] = useState("")
    const [stock, setStock] = useState("")
    const [saleStatus, setSaleStatus] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [requirement, setRequirement] = useState("")
    const [makingTime, setMakingTime] = useState("")
    const [imageUpload, setImageUpload] = useState("")
    const [nameUpload, setNameUpload] = useState("")
    const [messageUpload, setMessageUpload] = useState("")
    const [wishingMessage, setWishingMessage] = useState("")
    const [adminMessage, setAdminMessage] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryId, setSubcategoryId] = useState("")
    const [subcategoryList, setSubcategoryList] = useState([])
    const [subcategoryName, setSubcategoryName] = useState()
    const [productIcon, setProductIcon] = useState({fileName:"",bytes:""})

    const handleIcon=(event)=>{
        setProductIcon({fileName:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }

    useEffect(function(){
        fetchCategories()
    },[])

    const fetchCategories = async() => {
        var result = await getData('category/displayallcategories')
        setCategoryList(result.result)
    }

    const fetchSubcategories = async(cid) => {
        var body = {categoryid:cid}
        var result = await postData('subcategory/displaysubcategorybycategory', body)
        setSubcategoryList(result.result)
    }

    const fetchSubcategoryName = async(sid) => {
        var body = {subcategoryid: sid}
        var result = await postData('subcategory/displaysubcategorybysubcategory', body)
        setSubcategoryName(result.result)
    }

    const fillCategories = () => {
        return(
            categoryList.map((item)=>{
                return(
                    <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                )
            })
        )
    }

    const fillSubcategories = () => {
        return(
            subcategoryList.map((item)=>{
                return(
                    <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
                )
            })
        )
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
        fetchSubcategories(event.target.value)
    };

    const handleSubcategoryChange = (event) => {
        setSubcategoryId(event.target.value);
        fetchSubcategoryName(event.target.value)
    };

    const handleSaleStatusChange = (event) => {
        setSaleStatus(event.target.value);
    };

    const handleMessageUploadChange = (event) => {
        setMessageUpload(event.target.value);
    };

    const handleReset = () => {
        setProductName("")
        setPrice("")
        setOfferPrice("")
        setStock("")
        setSaleStatus("")
        setAboutProduct("")
        setRequirement("")
        setMakingTime("")
        setImageUpload("")
        setNameUpload("")
        setMessageUpload("")
        setWishingMessage("")
        setAdminMessage("")
        setCategoryId("")
        setSubcategoryId("")
        setProductIcon({fileName:"",bytes:""})
    }

    const handleSubmit = async() => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryid', subcategoryId)
        formData.append('subcategoryname', subcategoryName.subcategoryname)
        formData.append('productname', productName)
        formData.append('aboutproduct', aboutProduct)
        formData.append('requirement', requirement)
        formData.append('makingtime', makingTime)
        formData.append('salestatus', saleStatus)
        formData.append('imageupload', imageUpload)
        formData.append('nameupload', nameUpload)
        formData.append('messageupload', messageUpload)
        formData.append('wishingmessage', wishingMessage)
        formData.append('adminmessage', adminMessage)
        formData.append('price', price)
        formData.append('offerprice', offerPrice)
        formData.append('stock', stock)
        formData.append('producticon', productIcon.bytes)

        var result = await postData('product/productsubmit', formData, true)

        if(result.result)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Record Submitted Successfully',
                showConfirmButton: false,
                timer: 2000
            })
            handleReset()
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

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.row}>
                        <div className={classes.image}>
                            <img src={Gifts} alt="product-pic" width="30"></img>
                        </div>
                        <div className={classes.heading}>Product Interface</div>
                    </Grid>
                    <Grid item xs={6} className={classes.end}>
                        <Button 
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },}}
                            variant="contained" 
                            className={classes.btnsubmit}
                            onClick={()=>props.setComponent(<DisplayAllProducts setComponent={props.setComponent} />)}
                        >
                            <ListAlt />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Categories"
                            onChange={handleCategoryChange}
                            style={{ color: '#c6186d' }}
                            >
                            {fillCategories()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Subcategories</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subcategoryId}
                            label="Subcategories"
                            onChange={handleSubcategoryChange}
                            style={{ color: '#c6186d' }}
                            >
                            {fillSubcategories()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={productName} onChange={(event)=>setProductName(event.target.value)} label="Product Name" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextareaAutosize
                            className={classes.textarea}
                            aria-label="minimum height"
                            minRows={5}
                            value={aboutProduct}
                            placeholder="About Product"
                            style={{ maxWidth: 322,  width: 322, borderRadius:5 }}
                            onChange={(event)=>setAboutProduct(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextareaAutosize
                            className={classes.textarea}
                            aria-label="minimum height"
                            minRows={5}
                            value={requirement}
                            placeholder="Requirements"
                            style={{ maxWidth: 322,  width: 322, borderRadius:5 }}
                            onChange={(event)=>setRequirement(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextareaAutosize
                            className={classes.textarea}
                            aria-label="minimum height"
                            minRows={5}
                            value={makingTime}
                            placeholder="Making Time"
                            style={{ maxWidth: 322,  width: 322, borderRadius:5 }}
                            onChange={(event)=>setMakingTime(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={price} onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={offerPrice} onChange={(event)=>setOfferPrice(event.target.value)} label="Offer Price" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={stock} onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sale Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={saleStatus}
                            label="Sale Status"
                            onChange={handleSaleStatusChange}
                            style={{ color: '#c6186d' }}
                            >
                                <MenuItem value={"Trending"}>Trending</MenuItem>
                                <MenuItem value={"First's Choice"}>First's Choice</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={imageUpload} onChange={(event)=>setImageUpload(event.target.value)} label="Image Uploads" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={nameUpload} onChange={(event)=>setNameUpload(event.target.value)} label="Name Uploads" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Message/Text Upload</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={messageUpload}
                            label="Message/Text Upload"
                            onChange={handleMessageUploadChange}
                            style={{ color: '#c6186d' }}
                            >
                                <MenuItem value={"TextField"}>TextField</MenuItem>
                                <MenuItem value={"TextArea Box"}>TextArea Box</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={wishingMessage} onChange={(event)=>setWishingMessage(event.target.value)} label="Wishing Message" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={4}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={adminMessage} onChange={(event)=>setAdminMessage(event.target.value)} label="Any Message to Enter" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handleIcon(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                            <Button className={classes.button} fullWidth variant="text" component="span">Upload</Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="Picture" src={productIcon.fileName}></Avatar>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },}}
                            className={classes.btnsubmit}
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                borderColor: "#c6186d", 
                                },}}
                            className={classes.btnreset}
                            variant="outlined"
                            fullWidth
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}