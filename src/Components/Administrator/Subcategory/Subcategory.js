import React, { useState, useEffect } from "react";
import useStyles from "./SubcategoryCss";
import { styled } from "@mui/material/styles";
import { Grid, Button, TextField, Avatar } from "@mui/material";
import Gifts from "../../Assets/Images/gifts.png";
import { getData, postData } from "../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";
import { ListAlt } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllSubcategories from "./DisplayAllSubcategories";

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

export default function Subcategory(props){
    const classes = useStyles()
    const [subcategoryName, setSubcategoryName] = useState("")
    const [subcategoryDescription, setSubcategoryDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryIcon, setSubcategoryIcon] = useState({fileName:"",bytes:""})

    const handleIcon=(event)=>{
        setSubcategoryIcon({fileName:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }

    useEffect(function(){
        fetchCategories()
    },[])

    const fetchCategories = async() => {
        var result = await getData('category/displayallcategories')
        setCategoryList(result.result)
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

    const handleChange = (event) => {
        setCategoryId(event.target.value);
    };

    const handleReset = () => {
        setSubcategoryName("")
        setSubcategoryDescription("")
        setCategoryId("")
        setSubcategoryIcon({fileName:"",bytes:""})
    }

    const handleSubmit = async() => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryname', subcategoryName)
        formData.append('subcategorydescription', subcategoryDescription)
        formData.append('subcategoryicon', subcategoryIcon.bytes)

        var result = await postData('subcategory/subcategorysubmit', formData, true)
        let errr = result.err

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
                text: result.sqlMessage,
                showConfirmButton: true,
                timer: 3000
            })
            //console.log(result)
        }
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.row}>
                        <div className={classes.image}>
                            <img src={Gifts} alt="subcategory-pic" width="30"></img>
                        </div>
                        <div className={classes.heading}>Subcategory Interface</div>
                    </Grid>
                    <Grid item xs={6} className={classes.end}>
                        <Button 
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },}}
                            variant="contained" 
                            className={classes.btnsubmit}
                            onClick={()=>props.setComponent(<DisplayAllSubcategories setComponent={props.setComponent} />)}
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
                            onChange={handleChange}
                            style={{ color: '#c6186d' }}
                            >
                            {fillCategories()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={subcategoryName} onChange={(event)=>setSubcategoryName(event.target.value)} label="Subcategory Name" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} value={subcategoryDescription} onChange={(event)=>setSubcategoryDescription(event.target.value)} label="Subcategory Description" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handleIcon(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                            <Button className={classes.button} fullWidth variant="text" component="span">Upload</Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="Picture" src={subcategoryIcon.fileName}></Avatar>
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