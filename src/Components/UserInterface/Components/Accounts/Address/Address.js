import React, { useState, useEffect, forwardRef } from "react";
import useStyles from "./AddressCss";
import { styled, alpha } from "@mui/material/styles";
import { Button, Grid, Paper, TextField, Box, List, Modal, Typography, Drawer, Divider, Snackbar, DialogContentText, DialogTitle } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiAlert from "@mui/material/Alert";
import { Call, Home, Edit, DeleteOutline, Close, AccountCircle, AddRounded, ArrowBackIosNew, CropSquareSharp, Done } from "@mui/icons-material"
import { postData } from "../../../../APIServices/FetchNodeServices";
import { useSelector } from "react-redux";
import PlusSign2 from '../../../../Assets/Images/plus-2.png'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid darkgrey",
    boxShadow: 24,
    p: 4,
};

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

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
    ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        borderBottom: '2px solid #e84393',
        overflow: 'hidden',
        borderRadius: 6,
        backgroundColor: theme.palette.mode === 'light' ? 'white smoke' : '#c6186d',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha('#c6186d', 0.35)} 0 0 0 2px`,
            borderColor: '#c6186d',
        },
    },
    '& label.Mui-focused': {
        color: '#c6186d',
    },
}));

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Address(props){
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = React.useState({ right: false });
    const [addressStatus, setAddressStatus] = useState({ status: false, data: [] });
    const [editAddressId, setEditAddressId] = useState();
    const [deleteAddressId, setDeleteAddressId] = useState();
    const [name, setName] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')
    const [messageWarning, setMessageWarning] = useState()
    const [messageSuccess, setMessageSuccess] = useState()
    const [openWarning, setOpenWarning] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [editName, setEditName] = useState('')
    const [editHouseNo, setEditHouseNo] = useState('')
    const [editAddress, setEditAddress] = useState('')
    const [editCity, setEditCity] = useState('')
    const [editState, setEditState] = useState('')
    const [editPincode, setEditPincode] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const mobileNo = props.mobileNo

    useEffect(function () {
        fetchAddress();
    }, []);

    const fetchAddress = async() => {
        var body = {customermobileno: mobileNo}
        var result = await postData('address/checkaddress', body)
        setAddressStatus({ status: result.result, data: result.data })
    }
    //console.log(addressStatus.data)

    const handleClickSuccess = () => {
        setOpenSuccess(true)
    }
    const handleClickWarning = () => {
        setOpenWarning(true)
    }
    const handleCloseWarning = () => {
        setOpenWarning(false)
    }
    const handleCloseSuccess = () => {
        setOpenSuccess(false)
    }
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
        {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    };

    const handleOpen = async(item) => {
        setOpen(true)
        setEditAddressId(item.addressid)
        setEditName(item.name)
        setEditHouseNo(item.houseno)
        setEditAddress(item.address)
        setEditCity(item.city)
        setEditState(item.state)
        setEditPincode(item.pincode)
        setEditPhone(item.billmobileno)
    }
    const handleClose = () => setOpen(false);

    const handleOpenDelete = (item) => {
        setOpenDelete(true)
        setDeleteAddressId(item.addressid)
    }

    const handleEditAddress = async() => {
        let body = { name: editName, houseno: editHouseNo, address: editAddress, city: editCity, state: editState, pincode: editPincode, phone: editPhone, addressid : editAddressId }
        let result = await postData('address/editaddress', body)
        if(result.result)
        {
            fetchAddress()
            setOpen(false)
            setMessageSuccess( "Address Updated Successfully" )
            {handleClickSuccess()}
        }
        else
        {
            setMessageWarning( "Server Error: Something went wrong..!!" )
            {handleClickWarning()}
        }
    }

    const handleDeleteAddress = async() => {
        let body = {addressid : deleteAddressId}
        let result = await postData('address/deleteaddress', body)
        if(result.result)
        {
            fetchAddress()
            setOpenDelete(false)
            setMessageSuccess( "Address Deleted Successfully" )
            {handleClickSuccess()}
        }
        else
        {
            setMessageWarning( "Server Error: Something went wrong..!!" )
            {handleClickWarning()}
        }
    }

    const handleAddressSubmit = async() => {
        if( name == '' || houseNo == '' || address == '' || city == '' || state == '' || pincode == '' || phone == '' )
        {
            setMessageWarning( "Please fill all the details." )
            {handleClickWarning()}
        }
        else
        {
            var body = { name: name, houseno: houseNo, address: address, city: city, state: state, pincode: pincode, billmobileno: phone, customermobileno: mobileNo }
            var result = await postData('address/insertaddress', body)
            if(result.result)
            {
                setMessageSuccess( "Address Saved" )
                {handleClickSuccess()}
                fetchAddress()
                setOpenDrawer({right:false})
            }
            else
            {
                setMessageWarning( "Server Error: Something went wrong!" )
                {handleClickWarning()}
            }
        }
        toggleDrawer('right', false)
    }

    function handleDelete(){
        return(
            <Dialog
                maxWidth="md"
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm Delete 
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to delete an Address ?
                </DialogContent>
                <DialogActions>
                    <Grid item xs={6}>
                        <Button
                            sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                borderColor: "#c6186d", 
                            },
                            borderColor:'#e52c86',
                            color:'#c6186d',
                            height:'4.2vh',
                            borderRadius:0,
                            }}
                            variant="outlined"
                            startIcon={<Close />}
                            fullWidth
                            onClick={() => setOpenDelete(false)}
                        >
                            No
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                            },
                            borderRadius:0,
                            backgroundColor:'#e52c86',
                            height:'4vh',
                            }}
                            className={classes.btnsubmit}
                            variant="contained"
                            fullWidth
                            startIcon={<Done />}
                            onClick={() => handleDeleteAddress()}
                        >
                            Yes
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        )
    }

    const addNewAddress = (anchor) => (
        <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }} role="presentation">
            <Grid container spacing={1.2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={3}>
                        <Grid item xs={2}>
                            <ArrowBackIosNew className={classes.arrow} onClick={toggleDrawer(anchor, false)} />
                        </Grid>
                        <Grid item xs={9} className={classes.drawerhead}>ADD NEW ADDRESS</Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <List sx={{ margin:"4% 0% 4% 0%"}}>
                        <Grid item xs={12} sx={{ margin:'4% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setName(event.target.value)} size="small" label="Name" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setHouseNo(event.target.value)} size="small" label="House/Flat/Office No." variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setAddress(event.target.value)} size="large" label="Colony/Area/Road Name" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setCity(event.target.value)} size="small" label="City" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setState(event.target.value)} size="small" label="State" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField sx={{ input: { color: '#c6186d' } }} type='text' onChange={(event)=>setPincode(event.target.value)} size="large" label="Pincode" variant="filled" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sx={{ margin:'6% 6% 6% 6%'}}>
                            <RedditTextField
                                sx={{ input: { color: '#c6186d' } }} 
                                type='tel' 
                                onChange={(event)=>setPhone(event.target.value)} 
                                size="small" 
                                label="Phone" 
                                variant="filled" 
                                fullWidth
                            />
                        </Grid>
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper1} elevation={10}>
                        <Grid item xs={12}>
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
                                onClick={handleAddressSubmit}
                            >
                                Ship to this Address
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );

    function showEditAddress(){
        return(
            <Dialog
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit Address
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='text' value={editName} onChange={(event)=>setEditName(event.target.value)} size="small" label="Name" variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={4}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='text' value={editHouseNo} onChange={(event)=>setEditHouseNo(event.target.value)} size="small" label="House/Flat/Office No." variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={8}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='text' value={editAddress} onChange={(event)=>setEditAddress(event.target.value)} size="small" label="Address" variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='text' value={editCity} onChange={(event)=>setEditCity(event.target.value)} size="small" label="City" variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='text' value={editState} onChange={(event)=>setEditState(event.target.value)} size="small" label="State" variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='text' value={editPincode} onChange={(event)=>setEditPincode(event.target.value)} size="small" label="Pincode" variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField sx={{ input: { color: '#c6186d' } }} type='tel' value={editPhone} onChange={(event)=>setEditPhone(event.target.value)} size="small" label="Phone" variant="outlined" fullWidth></CssTextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                },
                                borderRadius:0,
                                backgroundColor:'#e52c86',
                                height:'4vh',
                                }}
                                className={classes.btnsubmit}
                                variant="contained"
                                fullWidth
                                startIcon={<Edit />}
                                onClick={() => handleEditAddress()}
                            >
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                    borderColor: "#c6186d", 
                                },
                                borderColor:'#e52c86',
                                color:'#c6186d',
                                height:'4.2vh',
                                borderRadius:0,
                                }}
                                variant="outlined"
                                startIcon={<Close />}
                                fullWidth
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }

    function showAddress(){
        return(
            addressStatus.data.map(item => {
                return(
                    <Grid item xs={4} className={classes.addressbox} sx={{ margin:'0.5% 0% 0% 2%', display:'flex', flexDirection:'column' }}>
                        <Grid item xs={12} sx={{ display:'flex', flexDirection:'row' }}>
                            <AccountCircle fontSize="small" className={classes.icon} />
                            <span className={classes.addressdesc}>
                                {item.name}
                            </span>
                        </Grid>
                        <Grid item xs={12} sx={{ display:'flex', flexDirection:'row', margin:'2% 0% 0% 0%' }}>
                            <Call fontSize="small" className={classes.icon} />
                            <span className={classes.addressdesc}>
                                {item.billmobileno}
                            </span>
                        </Grid>
                        <Grid item xs={12} sx={{ display:'flex', flexDirection:'row', margin:'2% 0% 0% 0%' }}>
                            <Home fontSize="small" className={classes.icon} />
                            <div className={classes.addressdesc}>
                                {item.houseno}, {item.address}
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ display:'flex', flexDirection:'row', margin:'2% 0% 0% 7%' }}>
                            <div className={classes.addressdesc}>
                                {item.city}-{item.pincode}, {item.state}
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', margin:'5% 0% 0% 0%' }}>
                            <Grid item xs={5.5}>
                                <Button
                                    sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                    },
                                    borderRadius:0,
                                    backgroundColor:'#e52c86',
                                    height:'4vh',
                                    }}
                                    className={classes.btnsubmit}
                                    variant="contained"
                                    fullWidth
                                    startIcon={<Edit />}
                                    onClick={() => handleOpen(item)}
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={5.5}>
                                <Button
                                    sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                                        borderColor: "#c6186d", 
                                    },
                                    borderColor:'#e52c86',
                                    color:'#c6186d',
                                    height:'4.2vh',
                                    borderRadius:0,
                                    }}
                                    variant="outlined"
                                    startIcon={<DeleteOutline />}
                                    fullWidth
                                    onClick={() => handleOpenDelete(item)}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    function showInformation(){
        return(
            <Paper sx={{ margin:'3% 2% 2% 2%', padding:'1% 1% 1% 1%' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ margin:'2% 2% 0% 2%' }}>
                        <div className={classes.fnhd}>My Address</div>
                    </Grid>
                    <Grid item xs={11.5} sx={{ margin:'0.5% 0% 0% 2%' }}>
                        <Divider className={classes.divider}/>
                    </Grid>
                    <Grid item xs={12} className={classes.row}>
                        {
                            addressStatus.status
                            ?
                                showAddress()
                            :
                                <></>
                        }
                    </Grid>
                    <Grid item xs={3.5}
                        sx={{ ":hover": { bgcolor: "#fdf2f7", // theme.palette.primary.main
                        borderColor: "#c6186d", 
                        },
                        margin:'2% 0% 2% 3%', 
                        display:'flex', 
                        flexDirection:'column',
                        borderColor:'#e52c86',
                        color:'#c6186d',
                        }}
                        className={classes.plusbox}
                        onClick={toggleDrawer('right', true)}
                    >
                        <img src={PlusSign2} width="50" style={{ marginTop:10 }} />
                        <div style={{ margin: 20, fontSize: 18, fontWeight: 700 }}>Add Address</div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    function handleAlertWarning() {
        return(
            <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleCloseWarning}>
                <Alert severity="warning" sx={{ width: '100%' }}>
                    {messageWarning}
                </Alert>
            </Snackbar>
        )
    }

    function handleAlertSuccess() {
        return(
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {messageSuccess}
                </Alert>
            </Snackbar>
        )
    }

    return(
        <div>
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                {showInformation()}
            </Grid>
            <React.Fragment key={"right"}>
                <Drawer
                    anchor={"right"}
                    open={openDrawer["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                    {addNewAddress("right")}
                </Drawer>
            </React.Fragment>
            {handleAlertWarning()}
            {handleAlertSuccess()}
        </Grid>
        {showEditAddress()}
        {handleDelete()}
        </div>
    )
}