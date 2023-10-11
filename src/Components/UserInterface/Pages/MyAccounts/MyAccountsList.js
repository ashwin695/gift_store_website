import React, { useEffect, useState } from "react";
import useStyles from "./MyAccountsListCss";
import { Grid, Paper } from "@mui/material";
import Man from "../../../Assets/Images/deliveryman.png"
import Bag from "../../../Assets/Images/cart.png"
import User from "../../../Assets/Images/user.png"
import Address from "../../../Assets/Images/address.png"
import Logout from "../../../Assets/Images/logout.png"
import { Link, useNavigate } from "react-router-dom";
import { logout, postData } from "../../../APIServices/FetchNodeServices";
import Swal from "sweetalert2";

export default function MyAccountsList(props)
{
    const classes = useStyles()
    const [customerData, setCustomerData] = useState([])

    var navigate = useNavigate()

    useEffect(function(){
        fetchCustomer()
    },[])

    const fetchCustomer = async() => {
        var body = {mobileno: props.mobileNo}
        var result = await postData('customer/displaydatabymobileno', body)
        //alert(JSON.stringify(result))
        if(result.result)
        {
            setCustomerData(result.data)
        }
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Please Refresh the Page',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const handleLogout = async() => {
        navigate(`/`)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logout Successfull',
            showConfirmButton: false,
            timer: 3000
        })
        localStorage.removeItem('id')
        /* var result = await logout('customer', localStorage.getItem('id'), customerData.mobileno)
        if(result.auth)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logout Successfull',
                showConfirmButton: false,
                timer: 3000
            })
            navigate(`/`)
            localStorage.removeItem('id')
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
        } */
    }

    const name = () => {
        return(
            <Grid item xs={11}>
                <Paper className={classes.row} elevation={5}>
                    <Grid item xs={3}>
                        <img src={Man} alt='courier-boy' className={classes.image} style={{ padding:'10% 10% 10% 20%' }} width="55%"></img>
                    </Grid>
                    <Grid item xs={5} sx={{ margin:'4% 0% 4% 2%' }}>
                        <div className={classes.fldtxt} style={{ fontWeight:600, color:'#e52c86' }}>Hello,</div>
                        <div className={classes.fldtxt}>{customerData.firstname}</div>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
    const orderHistory = () => {
        return(
            <Grid item xs={11}>
                <Link className={classes.link} to='/myaccounts/orderhistory'>
                    <Paper className={classes.row1} elevation={5}>
                        <Grid item xs={3}>
                            <img src={Bag} alt='shoppingbag' className={classes.image} style={{ padding:'20% 10% 20% 20%' }} width="50%"></img>
                        </Grid>
                        <Grid item xs={5} sx={{ margin:'1% 0% 1% 4%' }} className={classes.fldtxt2}>
                            Orders History
                        </Grid>
                    </Paper>
                </Link>
            </Grid>
        )
    }
    const myProfile = () => {
        return(
            <Grid item xs={11}>
                <Link className={classes.link} to='/myaccounts/personalinfo'>
                    <Paper className={classes.row1} elevation={5}>
                        <Grid item xs={3}>
                            <img src={User} alt='profile' className={classes.image} style={{ padding:'20% 10% 20% 20%' }} width="50%"></img>
                        </Grid>
                        <Grid item xs={5} sx={{ margin:'1% 0% 1% 4%' }} className={classes.fldtxt2}>
                            My Profile
                        </Grid>
                    </Paper>
                </Link>
            </Grid>
        )
    }
    const address = () => {
        return(
            <Grid item xs={11}>
                <Link className={classes.link} to='/myaccounts/address'>
                    <Paper className={classes.row1} elevation={5}>
                        <Grid item xs={3}>
                            <img src={Address} alt='address' className={classes.image} style={{ padding:'20% 10% 20% 20%' }} width="50%"></img>
                        </Grid>
                        <Grid item xs={5} sx={{ margin:'1% 0% 1% 4%' }} className={classes.fldtxt2}>
                            Address
                        </Grid>
                    </Paper>
                </Link>
            </Grid>
        )
    }
    const customerLogout = () => {
        return(
            <Grid item xs={11}>
                    <Paper className={classes.row1} elevation={5} onClick={()=>handleLogout()}>
                        <Grid item xs={3}>
                            <img src={Logout}alt='logout' className={classes.image} style={{ padding:'20% 10% 20% 20%' }} width="50%"></img>
                        </Grid>
                        <Grid item xs={5} sx={{ margin:'1% 0% 1% 4%' }} className={classes.fldtxt2}>
                            Logout
                        </Grid>
                    </Paper>
            </Grid>
        )
    }

    return(
        <Grid container spacing={1} sx={{ display:'flex', flexDirection:'column' }}>
            <Grid item xs={12} sx={{ margin:'5% 0% 0% 10%' }}>
                {name()}
            </Grid>
            <Grid item xs={12} sx={{ margin:'3% 0% 0% 10%'}}>
                {orderHistory()}
            </Grid>
            <Grid item xs={12} sx={{ margin:'3% 0% 0% 10%'}}>
                {myProfile()}
            </Grid>
            <Grid item xs={12} sx={{ margin:'3% 0% 0% 10%'}}>
                {address()}
            </Grid>
            <Grid item xs={12} sx={{ margin:'10% 0% 0% 10%'}}>
                {customerLogout()}
            </Grid>
        </Grid>
    )
}