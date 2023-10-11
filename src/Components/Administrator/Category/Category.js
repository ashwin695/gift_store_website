import React, { useState } from "react";
import useStyles from "./CategoryCss";
import { styled } from "@mui/material/styles";
import { Grid, Button, TextField, Avatar } from "@mui/material";
import Gifts from "../../Assets/Images/gifts.png";
import { postData } from "../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";
import { ListAlt } from '@mui/icons-material';
import DisplayAllCategories from "./DisplayAllCategories";

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

export default function Category(props){
    const classes = useStyles()
    const [categoryName, setCategoryName] = useState("")
    const [categoryIcon, setCategoryIcon] = useState({fileName:"",bytes:""})

    const handleIcon=(event)=>{
        setCategoryIcon({fileName:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }

    const handleReset = () => {
        setCategoryName("")
        setCategoryIcon({fileName:"",bytes:""})
    }
    
    const handleSubmit = async() => {
        var formData = new FormData()
        formData.append('categoryname', categoryName)
        formData.append('categoryicon', categoryIcon.bytes)

        var result = await postData('category/categorysubmit', formData, true)

        if(result.result)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Record Submitted Successfully',
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
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.row}>
                        <div className={classes.image}>
                            <img src={Gifts} alt="category-pic" width="30"></img>
                        </div>
                        <div className={classes.heading}>Category Interface</div>
                    </Grid>
                    <Grid item xs={6} className={classes.end}>
                        <Button 
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },}}
                            variant="contained" 
                            className={classes.btnsubmit}
                            onClick={()=>props.setComponent(<DisplayAllCategories setComponent={props.setComponent} />)}
                        >
                            <ListAlt />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField sx={{ input: { color: '#c6186d' } }} onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" variant="outlined" fullWidth></CssTextField>
                    </Grid>
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handleIcon(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                            <Button className={classes.button} fullWidth variant="text" component="span">Upload</Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="Picture" src={categoryIcon.fileName}></Avatar>
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
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}