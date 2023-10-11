import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Grid, TextField, Avatar, MenuItem, TextareaAutosize } from "@mui/material";
import useStyles from "./DisplayAllProductsCss";
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
import Swal from "sweetalert2";

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

export default function DisplayAllProducts(props){
    const classes = useStyles()
    const [productData, setProductData] = useState([])
    const [open, setOpen] = useState(false)
    const [productId, setProductId] = useState("")
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
    const [productIcon, setProductIcon] = useState({fileName:"",bytes:""})
    const [oldIcon, setOldIcon] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)
    const [uploadBtn, setUploadBtn]=useState(true)

    const handleIcon=(event)=>{
        setProductIcon({fileName:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        setBtnStatus(true)
        setUploadBtn(false)
    }

    useEffect(function(){
        fetchAllProductData()
        fetchCategories()
        fetchSubcategories()
    },[])

    const fetchAllProductData = async() => {
        var result = await getData('product/displayallproducts')
        setProductData(result.result)
    }

    const fetchCategories = async() => {
        var result = await getData('category/displayallcategories')
        setCategoryList(result.result)
    }

    const fetchSubcategories = async(cid) => {
        var body = {categoryid:cid}
        var result = await postData('subcategory/displaysubcategorybycategory', body)
        setSubcategoryList(result.result)
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
    };

    const handleSaleStatusChange = (event) => {
        setSaleStatus(event.target.value);
    };

    const handleMessageUploadChange = (event) => {
        setMessageUpload(event.target.value);
    };

    const handleOpen = (rowData) => {
        setOpen(true)
        setProductId(rowData.productid)
        setProductName(rowData.productname)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setSaleStatus(rowData.salestatus)
        setAboutProduct(rowData.aboutproduct)
        setRequirement(rowData.requirement)
        setMakingTime(rowData.makingtime)
        setImageUpload(rowData.imageupload)
        setNameUpload(rowData.nameupload)
        setMessageUpload(rowData.messageupload)
        setWishingMessage(rowData.wishingmessage)
        setAdminMessage(rowData.adminmessage)
        setCategoryId(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        setOldIcon(`${ServerURL}/images/${rowData.producticon}`)
        setProductIcon({fileName: `${ServerURL}/images/${rowData.producticon}`, bytes:''})
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setBtnStatus(false)
        setUploadBtn(true)
        setProductIcon({ fileName: oldIcon, bytes: ''})
        setOldIcon('')
    }

    const handleEdit = async() => {
        setOpen(false)
        var body = {productid: productId, productname: productName, price: price, offerprice: offerPrice, stock: stock, salestatus: saleStatus, aboutproduct: aboutProduct, requirement: requirement, makingtime: makingTime, imageupload: imageUpload, nameupload: nameUpload, messageupload: messageUpload, wishingmessage: wishingMessage, adminmessage: adminMessage, categoryid: categoryId, subcategoryid: subcategoryId}
        var result = await postData('product/editproductdata', body)
        if(result.result)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Record Edited Successfully',
                showConfirmButton: false,
                timer: 2000
            })
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
        fetchAllProductData()
    }

    const handleEditIcon = async() => {
        setOpen(false)
        setBtnStatus(false)
        setUploadBtn(true)
        var formData = new FormData()
        formData.append('productid', productId)
        formData.append('producticon', productIcon.bytes)

        var result = await postData('product/editproducticon', formData, true)

        if(result.result)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Icon Edited Successfully',
                showConfirmButton: false,
                timer: 2000
            })
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
        fetchAllProductData()
    }

    const handleDelete = async() => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete the product?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
            }).then(async(res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
                var body = {productid: productId} 
                var result = await postData('product/deleteproduct', body)
                
            if(result.result)  
                {Swal.fire('Deleted!', '', 'success')
                fetchAllProductData()
            }
            else
                Swal.fire('Server Error!', '', 'error')
            } else if (res.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    function editForm(){
        return (
            <div>
                <Dialog
                    maxWidth="lg"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <div className={classes.root}>
                            <div className={classes.subdiv}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} className={classes.row}>
                                        <div className={classes.image}>
                                            <img src={Gifts} alt="product-pic" width="30"></img>
                                        </div>
                                        <div className={classes.heading}>Product Interface</div>
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
                                            style={{ maxWidth: '100%',  width: '100%', borderRadius:5 }}
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
                                            style={{ maxWidth: '100%',  width: '100%', borderRadius:5 }}
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
                                            style={{ maxWidth: '100%',  width: '100%', borderRadius:5 }}
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
                                        {
                                            uploadBtn ? 
                                            <label htmlFor="contained-button-file">
                                                <input onChange={(event)=>handleIcon(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                                                <Button className={classes.button} fullWidth variant="text" component="span">Upload</Button>
                                            </label>
                                            :
                                            <></>
                                        }
                                        {
                                            btnStatus ?
                                            <div className={classes.center}>
                                                <Grid item xs={5}>
                                                    <Button className={classes.button} onClick={handleEditIcon} fullWidth>Save</Button>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Button className={classes.button} onClick={handleCancel} fullWidth>Cancel</Button>
                                                </Grid>
                                            </div>
                                            :
                                            <></>
                                        }
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
                                            onClick={handleEdit}
                                        >
                                            EDIT
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
                                            onClick={handleDelete}
                                        >
                                            DELETE
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.button} onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    function displayProduct(){
        return(
            <MaterialTable style={{ padding: '0 5px 0 5px'}}
                title="LIST OF PRODUCTS"
                columns={[
                    { title: 'Product Id', field: 'productid' },
                    { title: 'Category', render: (rowData) => (<div>{rowData.categoryname}</div>) },
                    { title: 'Subcategory', render: (rowData) => (<div>{rowData.subcategoryname}</div>) },
                    { title: 'Product Name', field: 'productname' },
                    //{ title: 'About', field: 'aboutproduct' },
                    //{ title: 'Requirement', field: 'requirement' },
                    //{ title: 'Making Time', field: 'makingtime' },
                    //{ title: 'Sale Status', field: 'salestatus' },
                    { title: 'Price', field: 'price' },
                    { title: 'Offer Price', field: 'offerprice' },
                    { title: 'Name Uploads', field: 'nameupload' },
                    { title: 'Image Upload', field: 'imageupload' },
                    //{ title: 'Message', field: 'messageupload' },
                    { title: 'Wishing Message', field: 'wishingmessage' },
                    //{ title: 'Admin Message', field: 'adminmessage' },
                    { title: 'Image', render: (rowData) => <img alt="pic" src={`${ServerURL}/images/${rowData.producticon}`} width="100" height="100" style={{borderRadius:10}} /> },
                ]}
                data={productData}
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

    return(
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displayProduct()}
            </div>
            <div>
                {editForm()}
            </div>
        </div>
    )
}