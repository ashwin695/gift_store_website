import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Grid, TextField, Avatar } from "@mui/material";
import useStyles from "./DisplayAllCategoriesCss";
import { getData, postData, ServerURL } from "../../APIServices/FetchNodeServices";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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

export default function DisplayAllCategories(props){
    const classes = useStyles()
    const [categoryData, setCategoryData] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryId, setCategoryId] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [categoryIcon, setCategoryIcon] = useState({fileName:"",bytes:""})
    const [oldIcon, setOldIcon] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)
    const [uploadBtn,setUploadBtn]=useState(true)

    const handleIcon=(event)=>{
        setCategoryIcon({fileName:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        setBtnStatus(true)
        setUploadBtn(false)
    }

    useEffect(function(){
        fetchAllCategoryData()
    },[])

    const fetchAllCategoryData = async() => {
        var result = await getData('category/displayallcategories')
        setCategoryData(result.result)
    }

    const handleOpen = (rowData) => {
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setOldIcon(`${ServerURL}/images/${rowData.categoryicon}`)
        setCategoryIcon({fileName: `${ServerURL}/images/${rowData.categoryicon}`, bytes:''})
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setBtnStatus(false)
        setUploadBtn(true)
        setCategoryIcon({ fileName: oldIcon, bytes: ''})
        setOldIcon('')
    }

    const handleEdit = async() => {
        setOpen(false)
        var body = {categoryid: categoryId, categoryname: categoryName}
        var result = await postData('category/editcategorydata', body)
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
        fetchAllCategoryData()
    }

    const handleEditIcon = async() => {
        setOpen(false)
        setBtnStatus(false)
        setUploadBtn(true)
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('categoryicon', categoryIcon.bytes)

        var result = await postData('category/editcategoryicon', formData, true)

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
        fetchAllCategoryData()
    }

    const handleDelete = async() => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete the category?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
            }).then(async(res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
                var body = {categoryid: categoryId} 
                var result = await postData('category/deletecategory', body)
                
            if(result.result)  
                {Swal.fire('Deleted!', '', 'success')
                fetchAllCategoryData()
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
                                            <img src={Gifts} alt="category-pic" width="30"></img>
                                        </div>
                                        <div className={classes.heading}>Category Interface</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CssTextField value={categoryName} sx={{ input: { color: '#c6186d' } }} onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" variant="outlined" fullWidth></CssTextField>
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
                                        <Avatar alt="Picture" src={categoryIcon.fileName}></Avatar>
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
        );
    }

    function displayCategory(){
        return(
            <MaterialTable style={{ padding: '0 5px 0 5px'}}
                title="LIST OF CATEGORIES"
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Category Name', field: 'categoryname' },
                    { title: 'Image', render: (rowData) => <img alt="pic" src={`${ServerURL}/images/${rowData.categoryicon}`} width="30" height="30" /> },
                ]}
                data={categoryData}
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
                {displayCategory()}
            </div>
            {editForm()}
        </div>
    )
}