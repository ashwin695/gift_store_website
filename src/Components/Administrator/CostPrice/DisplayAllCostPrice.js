import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Grid, TextField, MenuItem } from "@mui/material";
import useStyles from "./DisplayAllCostPriceCss";
import { getData, postData } from "../../APIServices/FetchNodeServices";
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

export default function DisplayAllCostPrice(props){
    const classes = useStyles()
    const [costPriceData, setCostPriceData] = useState([])
    const [open, setOpen] = useState(false)
    const [costPriceId, setCostPriceId] = useState("")
    const [price, setPrice] = useState("")
    const [offerPrice, setOfferPrice] = useState("")
    const [stock, setStock] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryId, setSubcategoryId] = useState("")
    const [subcategoryList, setSubcategoryList] = useState([])
    const [productId, setProductId] = useState("")
    const [productList, setProductList] = useState([])
    const [sizeId, setSizeId] = useState("")
    const [sizeList, setSizeList] = useState([])

    useEffect(function(){
        fetchAllCostPriceData()
        fetchCategories()
        fetchSubcategories()
        fetchProducts()
        fetchSizes()
    },[])

    const fetchAllCostPriceData = async() => {
        var result = await getData('costprice/displayallcostprices')
        setCostPriceData(result.result)
    }

    const fetchCategories = async() => {
        var result = await getData('category/displayallcategories')
        setCategoryList(result.result)
    }

    const fetchSubcategories = async(cid) => {
        //var body = {categoryid:cid}
        //var result = await postData('subcategory/displaysubcategorybycategory', body)
        var result = await getData('subcategory/displayallsubcategories')
        setSubcategoryList(result.result)
    }

    const fetchProducts = async(sid) => {
        //var body = {subcategoryid:sid}
        //var result = await postData('product/displayproductbysubcategory', body)
        var result = await getData('product/displayallproducts')
        setProductList(result.result)
    }

    const fetchSizes = async(pid) => {
        //var body = {productid:pid}
        //var result = await postData('size/displaysizebyproduct', body)
        var result = await getData('size/displayallsizes')
        setSizeList(result.result)
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

    const fillProducts = () => {
        return(
            productList.map((item)=>{
                return(
                    <MenuItem value={item.productid}>{item.productname}</MenuItem>
                )
            })
        )
    }

    const fillSizes = () => {
        return(
            sizeList.map((item)=>{
                return(
                    <MenuItem value={item.sizeid}>{item.sizename}</MenuItem>
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
        fetchProducts(event.target.value)
    };

    const handleProductChange = (event) => {
        setProductId(event.target.value);
        fetchSizes(event.target.value)
    };

    const handleSizeChange = (event) => {
        setSizeId(event.target.value);
    };

    const handleOpen = (rowData) => {
        setOpen(true)
        setCostPriceId(rowData.costpriceid)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setCategoryId(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setSizeId(rowData.sizeid)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = async() => {
        setOpen(false)
        var body = {costpriceid: costPriceId, price: price, offerprice: offerPrice, stock: stock, sizeid: sizeId, categoryid: categoryId, subcategoryid: subcategoryId, productid: productId}
        var result = await postData('costprice/editcostpricedata', body)
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
        fetchAllCostPriceData()
    }

    const handleDelete = async() => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete the cost price?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
            }).then(async(res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
                var body = {costpriceid: costPriceId} 
                var result = await postData('costprice/deletecostprice', body)
                
            if(result.result)  
                {Swal.fire('Deleted!', '', 'success')
                fetchAllCostPriceData()
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
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <div className={classes.root}>
                            <div className={classes.subdiv}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} className={classes.row}>
                                        <div className={classes.image}>
                                            <img src={Gifts} alt="category-pic" width="30"></img>
                                        </div>
                                        <div className={classes.heading}>Cost Price Interface</div>
                                    </Grid>
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
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
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Products</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={productId}
                                            label="Products"
                                            onChange={handleProductChange}
                                            style={{ color: '#c6186d' }}
                                            >
                                            {fillProducts()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sizeId}
                                            label="Size"
                                            onChange={handleSizeChange}
                                            style={{ color: '#c6186d' }}
                                            >
                                            {fillSizes()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={stock} onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth></CssTextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={price} onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth></CssTextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={offerPrice} onChange={(event)=>setOfferPrice(event.target.value)} label="Offer Price" variant="outlined" fullWidth></CssTextField>
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
                                            Edit
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

    function DisplayCostPrice(){
        return(
            <MaterialTable style={{ padding: '0 5px 0 5px'}}
                title="LIST OF COST PRICES"
                columns={[
                    { title: 'Cost Price Id', field: 'costpriceid' },
                    { title: 'Category', render: (rowData) => (<div>{rowData.categoryname}</div>) },
                    { title: 'Subcategory', render: (rowData) => (<div>{rowData.subcategoryname}</div>) },
                    { title: 'Product', render: (rowData) => (<div>{rowData.productname}</div>) },
                    { title: 'Size', render: (rowData) => (<div>{rowData.sizename}</div>) },
                    { title: 'Price', field: 'price' },
                    { title: 'Offer Price', field: 'offerprice' },
                    { title: 'Stock', field: 'stock' },
                    
                ]}
                data={costPriceData}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Cost Price',
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
                {DisplayCostPrice()}
            </div>
            <div>
                {editForm()}
            </div>
        </div>
    )
}