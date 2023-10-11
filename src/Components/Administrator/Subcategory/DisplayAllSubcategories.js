import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Grid, TextField, Avatar, MenuItem } from "@mui/material";
import useStyles from "./DisplayAllSubcategoriesCss";
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

export default function DisplayAllSubcategories(props){
    const classes = useStyles()
    const [subcategoryData, setSubcategoryData] = useState([])
    const [open, setOpen] = useState(false)
    const [subcategoryId, setSubcategoryId] = useState("")
    const [subcategoryName, setSubcategoryName] = useState("")
    const [subcategoryDescription, setSubcategoryDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryIcon, setSubcategoryIcon] = useState({fileName:"",bytes:""})
    const [oldIcon, setOldIcon] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)
    const [uploadBtn,setUploadBtn]=useState(true)

    const handleIcon=(event)=>{
        setSubcategoryIcon({fileName:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        setBtnStatus(true)
        setUploadBtn(false)
    }

    useEffect(function(){
        fetchAllSubcategoryData()
        fetchCategories()
    },[])

    const fetchAllSubcategoryData = async() => {
        var result = await getData('subcategory/displayallsubcategories')
        setSubcategoryData(result.result)
    }

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

    const handleOpen = (rowData) => {
        setOpen(true)
        setSubcategoryId(rowData.subcategoryid)
        setSubcategoryName(rowData.subcategoryname)
        setSubcategoryDescription(rowData.subcategorydescription)
        setCategoryId(rowData.categoryid)
        setOldIcon(`${ServerURL}/images/${rowData.subcategoryicon}`)
        setSubcategoryIcon({fileName: `${ServerURL}/images/${rowData.subcategoryicon}`, bytes:''})
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setBtnStatus(false)
        setUploadBtn(true)
        setSubcategoryIcon({ fileName: oldIcon, bytes: ''})
        setOldIcon('')
    }

    const handleEdit = async() => {
        setOpen(false)
        var body = {subcategoryid: subcategoryId, subcategoryname: subcategoryName, subcategorydescription: subcategoryDescription, categoryid: categoryId}
        var result = await postData('subcategory/editsubcategorydata', body)
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
        fetchAllSubcategoryData()
    }

    const handleEditIcon = async() => {
        setOpen(false)
        setBtnStatus(false)
        setUploadBtn(true)
        var formData = new FormData()
        formData.append('subcategoryid', subcategoryId)
        formData.append('subcategoryicon', subcategoryIcon.bytes)

        var result = await postData('subcategory/editsubcategoryicon', formData, true)

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
        fetchAllSubcategoryData()
    }

    const handleDelete = async() => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete the subcategory?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
            }).then(async(res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
                var body = {subcategoryid: subcategoryId} 
                var result = await postData('subcategory/deletesubcategory', body)
                
            if(result.result)  
                {Swal.fire('Deleted!', '', 'success')
                fetchAllSubcategoryData()
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
                                <Grid container spacing={1}>
                                    <Grid item xs={12} className={classes.row}>
                                        <div className={classes.image}>
                                            <img src={Gifts} alt="subcategory-pic" width="30"></img>
                                        </div>
                                        <div className={classes.heading}>Subcategory Interface</div>
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
                                        <CssTextField value={subcategoryName} sx={{ input: { color: '#c6186d' } }} onChange={(event)=>setSubcategoryName(event.target.value)} label="Subcategory Name" variant="outlined" fullWidth></CssTextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CssTextField value={subcategoryDescription} sx={{ input: { color: '#c6186d' } }} onChange={(event)=>setSubcategoryDescription(event.target.value)} label="Subcategory Description" variant="outlined" fullWidth></CssTextField>
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
                                        <Avatar alt="Picture" src={subcategoryIcon.fileName}></Avatar>
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

    function displaySubcategory(){
        return(
            <MaterialTable style={{ padding: '0 5px 0 5px'}}
                title="LIST OF SUBCATEGORIES"
                columns={[
                    { title: 'Subcategory Id', field: 'subcategoryid' },
                    { title: 'Category', render: (rowData) => (<div>{rowData.categoryname}</div>) },
                    { title: 'Subcategory Name', field: 'subcategoryname' },
                    { title: 'Subcategory Description', field: 'subcategorydescription' },
                    { title: 'Image', render: (rowData) => <img alt="pic" src={`${ServerURL}/images/${rowData.subcategoryicon}`} width="100" height="100" style={{borderRadius:10}} /> },
                ]}
                data={subcategoryData}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Category',
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
                        fontSize: "1.0em",
                    },
                }}
            />    
        )
    }

    return(
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displaySubcategory()}
            </div>
            {editForm()}
        </div>
    )
}