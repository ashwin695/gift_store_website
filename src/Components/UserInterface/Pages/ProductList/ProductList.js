import React, { useState, useEffect } from "react";
import useStyles from "./ProductListCss";
import { MainHeader } from "../../Components/Header/MainHeader";
import CategoryHeader from "../../Components/Header/CategoryHeader";
import CategoryHeader2 from "../../Components/Header/CategoryHeader2";
import { postData, ServerURL } from "../../../APIServices/FetchNodeServices";
import { Grid, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import Footer2 from "../../Components/Footer/Footer2";
import ShortFooter from "../../Components/Footer/ShortFooter";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function ProductList(){
    const classes = useStyles()
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true)

    //var location = useLocation()
    var params = useParams()
    var navigate = useNavigate()

    useEffect(function(){
        fetchProducts()
    },[params])

    const fetchProducts = async() => {
        //var body = {subcategoryid: location.state.subcategory.subcategoryid}
        var body = {subcategoryid: params.id}
        var result = await postData('product/displayproductbysubcategory', body)
        if(result.status)
        {
            setAllProducts(result.result)
            setLoading(false)
        }
    }

    const handleProductView = (item) => {
        navigate(`/products/${params.id}/${params.name}/productview/${item.productid}/${item.productname}`)
    }

    const showProducts = () => {
        return(
            allProducts.map((item) => {
                return(
                    <Paper className={classes.paper} sx={{ 
                            ':hover': { 
                                boxShadow: 10, 
                                //color:'#c6186d' 
                                }, 
                            borderRadius:'8%' 
                            }}
                            onClick={()=>handleProductView(item)}
                            >
                        <Grid item xs={12} className={classes.imggrid}>
                            <img src={`${ServerURL}/images/${item.producticon}`} alt="product-icon" className={classes.productimg} />
                        </Grid>
                        <Grid item xs={12} className={classes.productname}>
                            {item.productname}
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            {
                                item.offerprice > 0
                                    ?
                                    <div>
                                        <span className={classes.price}>Rs.{item.offerprice}</span>
                                        &nbsp;<s className={classes.cutprice}>Rs.{item.price}</s>
                                    </div>
                                    :
                                    <div>{item.price}</div>
                            }
                        </Grid>
                    </Paper>
                )
            })
        )
    }

    return(
        <div>
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
                        <Grid container spacing={1} className={classes.rootrow}>
                            <Grid item xs={12}>
                                <MainHeader />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <CategoryHeader />
                            </Grid> */}
                            <Grid item xs={12}>
                                <CategoryHeader2 />
                            </Grid>
                            <Grid item xs={12} className={classes.showproduct}>
                                {showProducts()}
                            </Grid>
                        </Grid>
                        {/* <Footer /> */}
                        {/* <ShortFooter /> */}
                        <Footer2 />
                    </div>
            }
        </div>
    )
}