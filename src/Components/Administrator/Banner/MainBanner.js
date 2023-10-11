import React, { useEffect, useState } from "react";
import useStyles from "./MainBannerCss";
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, Avatar } from "@mui/material";
import Banner from "../../Assets/Images/banner.png"
import { ListAlt } from "@mui/icons-material";
import { DropzoneArea } from 'material-ui-dropzone'
import { getData, postData } from "../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";
import DisplayMainBanners from "./DisplayMainBanners";

export default function MainBanner(props){
    const classes = useStyles()
    /* const [bannerImage, setBannerImage] = useState("") */
    const [categoryId, setCategoryId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryId, setSubcategoryId] = useState("")
    const [subcategoryList, setSubcategoryList] = useState([])
    const [subcategoryName, setSubcategoryName] = useState()
    const [bannerImage, setBannerImage] = useState({fileName:"",bytes:""})

    /* const handleSave = () => {
        setBannerImage()
    } */

    const handleIcon=(event)=>{
        setBannerImage({fileName:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
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
        console.log(event.target)
        setCategoryId(event.target.value);
        fetchSubcategories(event.target.value)
    };

    const handleSubcategoryChange = (event) => {
        setSubcategoryId(event.target.value);
        fetchSubcategoryName(event.target.value)
    };

    const handleReset = () => {
        setCategoryId("")
        setSubcategoryId("")
        setBannerImage({fileName:"",bytes:""})
    }

    const handleSubmit = async() => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryid', subcategoryId)
        formData.append('subcategoryname', subcategoryName.subcategoryname)
        formData.append('bannerimage', bannerImage.bytes)
        
        /* bannerImage.map((item, index)=>{
            formData.append("bannerimage" + index, item)
        }) */

        var result = await postData('banner/mainbannersubmit', formData, true)

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
                            <img src={Banner} alt="banner-pic" width="30"></img>
                        </div>
                        <div className={classes.heading}>Banner Interface</div>
                    </Grid>
                    <Grid item xs={6} className={classes.end}>
                        <Button 
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },}}
                            variant="contained" 
                            className={classes.btnsubmit}
                            onClick={()=>props.setComponent(<DisplayMainBanners setComponent={props.setComponent} />)}
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
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handleIcon(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                            <Button className={classes.button} fullWidth variant="text" component="span">Upload</Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="Picture" src={bannerImage.fileName}></Avatar>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <DropzoneArea
                            onChange={handleSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            maxFileSize={5000000}
                            filesLimit={6}
                        />
                    </Grid> */}
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