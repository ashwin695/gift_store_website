import React, { useState, useEffect } from "react";
import useStyles from "./MyAccountsCss";
import { Grid } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import OrderHistory from "../../Components/Accounts/OrderHistory/OrderHistory";
import PersonalInfo from "../../Components/Accounts/PersonalInfo/PersonalInfo";
import InfoHeader from "../../Components/Header/InfoHeader";
import { MainHeader } from "../../Components/Header/MainHeader";
import MyAccountsList from "./MyAccountsList";
import { isValidAuth, postData } from "../../../APIServices/FetchNodeServices";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import CustomerBill from "../../Components/Accounts/OrderHistory/CustomerBill";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CategoryHeader2 from "../../Components/Header/CategoryHeader2";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function MyAccounts2()
{
    const classes = useStyles()
    const [mobileNo, setMobileNo] = useState()
    const [loading, setLoading] = useState(true)
    const [customerData, setCustomerData] = useState([])

    //var customer = useSelector(state => state.customer)
    //var customerDetails = Object.values(customer)[0]
    //var customerEmailid = customerDetails.emailid

    console.log(customerData)

    var navigate = useNavigate()
    var dispatch = useDispatch()

    useEffect(function(){
        fetchCustomerById()
    },[])
    useEffect(function(){
        checkAuth()
    })

    const checkAuth = async() => {
        //var result = await isValidAuth('customer', /* localStorage.getItem('id'), */ 9109472941,(iss mobileno ko customerid se fetch kr vana hai) localStorage.getItem('id'))
        var result = await isValidAuth('customer', localStorage.getItem('id'), customerData.mobileno)
        //alert(JSON.stringify(result))

        //console.log("account",result)


        if(result.auth)
        {
            setMobileNo(result.data.mobileno)
            //setMobileNo(localStorage.getItem('cart_items'))
            dispatch({ type: 'Add_Customer', payload: [result.data.mobileno, result.data] })
            setLoading(false)
        }
        else
        {
            navigate(`/accounts/login`)
            setLoading(false)
        }
    }

    const fetchCustomerById = async() => {
        var body = {id: localStorage.getItem('id')}
        var result = await postData('customer/displaycustomerbyid', body)
        //alert(JSON.stringify(result.data))
        //setCustomerData(result.data)
        if(result.result)
        {
            setCustomerData(result.data)
            setMobileNo(customerData.mobileno)
            //console.log(customerData)
            checkAuth()
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
            {
                loading
                ?
                    <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>
                        <Dna
                            visible={loading}
                            height="150"
                            width="200"
                            ariaLabel="dna-loading"
                            wrapperStyle={override}
                            wrapperClass="dna-wrapper"
                        />
                    </Grid>
                :
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={12}>
                            <InfoHeader />
                        </Grid>
                        <Grid Item xs={12} style={{ margin:'25px 0px 0px 0px' }}>
                            <MainHeader />
                        </Grid>
                        <Grid item xs={12}>
                            <CategoryHeader2 />
                        </Grid>
                    </Grid>
                    {/* <Grid container spacing={1} className={classes.rootrow}>
                        <Grid item xs={12}>
                            <InfoHeader />
                        </Grid>
                        <Grid item xs={12} style={{ margin:'25px 0px 0px 0px' }}>
                            <MainHeader />
                        </Grid>
                        <Grid item xs={12} style={{ margin:'0px 0px 0px 0px' }}>
                            <CategoryHeader2 />
                        </Grid>
                    </Grid> */}
                    <Grid container spacing={1} sx={{ display:'flex' }}>
                        <Grid item xs={3.5} /* sx={{ position:'fixed' }} */>
                            <MyAccountsList mobileNo={mobileNo} />
                        </Grid>
                        <Grid item xs={8.2} /* sx={{ marginLeft:'auto' }} */>
                            <Routes>
                                <Route element={<OrderHistory mobileNo={mobileNo} />} path="/orderhistory" />
                                <Route element={<CustomerBill mobileNo={mobileNo} />} path="/orderhistory/bill/:orderid/:invoiceno" />
                                <Route element={<PersonalInfo mobileNo={mobileNo} />} path="/personalinfo" />
                                <Route element={<PersonalInfo />} path="/address" />
                            </Routes>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.terms} sx={{ margin:'3% 0% 3% 0%' }}>
                        <div className={classes.center}>
                            <span>By continuing you agree to our</span>
                            <span style={{color:'red', cursor:'pointer'}}>&nbsp;Terms of service</span>
                        </div>
                        <div className={classes.center}>
                            <span>and</span>
                            <span style={{color:'red', cursor:'pointer'}}>&nbsp;Privacy & Legal Policy.</span>
                        </div>
                    </Grid>
                </div>
            }
        </div>
    )
}