import React, { useState, useEffect } from "react";
import useStyles from "./SizeCss";
import { styled } from "@mui/material/styles";
import { Grid, Button, TextField } from "@mui/material";
import Gifts from "../../Assets/Images/gifts.png";
import { postData, getData } from "../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";
import { ListAlt } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllSizes from "./DisplayAllSizes";

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

export default function Size(props){
    const classes = useStyles()
    const [sizeName, setSizeName] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryId, setSubcategoryId] = useState("")
    const [subcategoryList, setSubcategoryList] = useState([])
    const [productId, setProductId] = useState("")
    const [productList, setProductList] = useState([])

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

    const fetchProducts = async(sid) => {
        var body = {subcategoryid:sid}
        var result = await postData('product/displayproductbysubcategory', body)
        setProductList(result.result)
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
    };

    const handleReset = () => {
        setSizeName("")
        setCategoryId("")
        setSubcategoryId("")
        setProductId("")
    }

    const handleSubmit = async() => {
        var body = {sizename: sizeName, categoryid: categoryId, subcategoryid: subcategoryId, productid: productId}
        var result = await postData('size/sizesubmit', body)
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
        handleReset()
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.row}>
                        <div className={classes.image}>
                            <img src={Gifts} alt="category-pic" width="30"></img>
                        </div>
                        <div className={classes.heading}>Size Interface</div>
                    </Grid>
                    <Grid item xs={6} className={classes.end}>
                        <Button 
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },}}
                            variant="contained" 
                            className={classes.btnsubmit}
                            onClick={()=>props.setComponent(<DisplayAllSizes setComponent={props.setComponent} />)}
                        >
                            <ListAlt />
                        </Button>
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
                    <Grid item xs={12}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={sizeName} onChange={(event)=>setSizeName(event.target.value)} label="Capacity / Size (Height x Width)" variant="outlined" fullWidth></CssTextField>
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