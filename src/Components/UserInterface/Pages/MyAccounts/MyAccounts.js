import React, { useState, useEffect } from "react";
import useStyles from "./MyAccountsCss";
import { Grid } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import OrderHistory from "../../Components/Accounts/OrderHistory/OrderHistory";
import PersonalInfo from "../../Components/Accounts/PersonalInfo/PersonalInfo";
import InfoHeader from "../../Components/Header/InfoHeader";
import { MainHeader } from "../../Components/Header/MainHeader";
import MyAccountsList from "./MyAccountsList";
import { getToken, isValidAuth, postData } from "../../../APIServices/FetchNodeServices";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import CustomerBill from "../../Components/Accounts/OrderHistory/CustomerBill";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CategoryHeader2 from "../../Components/Header/CategoryHeader2";
import Address from "../../Components/Accounts/Address/Address";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function MyAccounts(){
    const classes = useStyles()
    const [mobileNo, setMobileNo] = useState()
    const [loading, setLoading] = useState(true)
    const [customerData, setCustomerData] = useState({})

    var navigate = useNavigate()
    var dispatch = useDispatch()

    useEffect(function(){
        checkAuth()
    },[])

    const checkAuth = async() => {
        //var result = await isValidAuth('customer', /* localStorage.getItem('id'), */ 9109472941,(iss mobileno ko customerid se fetch kr vana hai) localStorage.getItem('id'))
        var result = await getToken('customer', localStorage.getItem('id'))
        //alert(JSON.stringify(result))

        //console.log("checkauth",result)


        if(result == null)
        {
            navigate(`/accounts/login`)
            setLoading(false)
        }
        else
        {
            if(result.auth)
            {
                const token = result.token
                fetchCustomerById(token)
            }
            //console.log("account",result)
        }
    }

    const fetchCustomerById = async(token) => {
        var body = {id: localStorage.getItem('id')}
        var result = await postData('customer/displaycustomerbyid', body)
        //alert(JSON.stringify(result.data))

        //console.log("fetchCustomerById",result)

        if(!result.result)
        {
            checkAuth()
        }
        else
        {
            setCustomerData(result.data)
            setMobileNo(result.data.mobileno)
            let mobile = result.data.mobileno
            setTimeout(() => {
               checkAuthMobile(token, mobile) 
            }, 500);
        }
    }

    const checkAuthMobile = async(token, mobile) => {
        //var result = await isValidAuth('customer', /* localStorage.getItem('id'), */ 9109472941,(iss mobileno ko customerid se fetch kr vana hai) localStorage.getItem('id'))
        var result = await isValidAuth('customer', token, mobile)
        //alert(JSON.stringify(result))

        //console.log("checkAuthMobile", result)

        if(!result.auth)
        {
            navigate(`/accounts/login`)
            setLoading(false)
            
        }
        else
        {
            dispatch({ type: 'Add_Customer', payload: [result.data.mobileno, result.data] })
            setLoading(false)
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
                                <Route element={<Address mobileNo={mobileNo} />}  path="/address" />
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