import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getData, postData } from "../../../APIServices/FetchNodeServices";
import logo from "../../../Assets/Images/logo.png"
import { useSelector } from "react-redux";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function RazorpayPaymentGateway()
{
    var location = useLocation()
    var navigate = useNavigate()
    var data = location.state.response
    var d = new Date()
    var a = new Date()
    var day=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var month=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    a.setDate(a.getDate()+10)
    var customer = useSelector(state => state.customer)
    var customerDetails = Object.values(customer)[0]

    var shoppingBag = useSelector(state => state.cartbag)
    var products = Object.values(shoppingBag)
    //console.log(products)

    var deliveryAddress = useSelector(state => state.deliveryaddress)
    var address = Object.values(deliveryAddress)[0]

    var subTotal = products.reduce((a,b)=>getTotalPrice(a,b),0)
    function getTotalPrice(p1,p2){
        var price = !p2.price
                    ?
                        p2.offerprice1 > 0
                        ?
                            parseInt(p2.offerprice1)*parseInt(p2.qty)
                        :
                            parseInt(p2.price1)*parseInt(p2.qty)
                    :
                        p2.offerprice > 0
                        ?
                            parseInt(p2.offerprice)*parseInt(p2.qty)
                        :
                            parseInt(p2.price)*parseInt(p2.qty)
        return( price + p1 )
    }
    //console.log(subTotal)

    const payableAmount = () => {
        if(subTotal < 500)
        {
            return(
                <span>{parseInt(subTotal) + parseInt(150)}</span>
            )
        }
        else
        {
            return(
                <span>{parseInt(subTotal)}</span>
            )
        }
    }

    const delivery = location.state.delivery

    const finalAmt = payableAmount().props.children
    let invoice = location.state.invoiceno
    const finalInvoice = () => {
        const numericPart = parseInt(invoice.match(/\d+/)[0]);
      
        const newNumericPart = numericPart + 1;
      
        const nonNumericPart = invoice.replace(/\d+/, '');
      
        const resultString = nonNumericPart + newNumericPart;

        return resultString
    }
    console.log("final",finalInvoice())

    /* const invoiceGenerator=()=>{
        var v=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        var invoice="CGV"
        for(var i=1; i<=6; i++)
        {
          invoice += v[parseInt(Math.random()*9)]
        }
        return invoice
    } */

    const handleSubmitOrder = async(response) => {
        var body = {
            orderdate: d.getFullYear() + "/" + [d.getMonth()+1] + "/" + d.getDate() + "--" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            cartbag: products, 
            deliverycharge: delivery,
            amount: finalAmt, 
            name: address.name, 
            houseno: address.houseno, 
            address: address.address, 
            city: address.city, 
            state: address.state, 
            pincode: address.pincode, 
            mobileno: address.billmobileno, 
            emailid: customerDetails.emailid, 
            customermobileno: customerDetails.mobileno, 
            invoiceno: finalInvoice(), 
            paymentmode: 'Online Payment', 
            transactionid: response.razorpay_payment_id, 
            orderstatus: 'Order Placed', 
            expecteddeliverydate: day[a.getDay()]+", "+month[a.getMonth()]+" "+a.getDate()+", "+a.getFullYear(),
        }
        var result = await postData('order/ordersubmit', body)
        if(result.result)
        {
            //alert(result.result)
            //console.log("order placed", result.data)
            //navigate(`/orderplacedsuccessfull/${body.invoiceno}`, { replace: true })
            window.location.replace(`/orderplacedsuccessfull/${body.invoiceno}`);
        }
        else
        {
            console.log("error", result.data)
            navigate(`/cart`)
        }

    }

    const options = {
        key: "rzp_test_N2OV8JJIw2gh8i", // Enter the Key ID generated from the Dashboard
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Creative Gifts Villa",
        description: "Test Transaction",
        image: logo,
        order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response){
            var result = await postData('order/verifypayment', {response: response})
            if(result.result)
            {
                //alert(JSON.stringify(response))
                handleSubmitOrder(response)
            }
            else
            {
                console.log(response)
                navigate(`/cart`)
            }

        },
        prefill: {
            name: address.name,
            email: customerDetails.emailid,
            contact: address.billmobileno
        },
        notes: {
            address: "Gwalior, (M.P.)"
        },
        theme: {
            color: '#e52c86'
        }
    }

    const openPayModel = async() => {
        var rzp = new window.Razorpay(options)
        await rzp.open()
    }

    const razorPay = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div style={{ color:"#e52c86", fontSize:25, fontWeight:600, padding:20 }}>Redirecting to Razorpay....</div>
                </Grid>
                <Grid item xs={12}>
                    {openPayModel()}
                </Grid>
            </Grid>
        )
    }

    return(
        <div>
            <center>
                {razorPay()}
            </center>
        </div>
    )
}