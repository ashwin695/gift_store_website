import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useStyles from "./HomeCss";
import InfoHeader from "../../Components/Header/InfoHeader";
import { MainHeader } from "../../Components/Header/MainHeader";
import CategoryHeader from "../../Components/Header/CategoryHeader";
import NewHeader from "../../Components/Header/NewHeader";
import { getData, ServerURL } from "../../../APIServices/FetchNodeServices";
import { Button, Grid } from "@mui/material";
import OtherSubcategory from "../../Components/Subcategory/OtherSubcategory";
import Table from "../../Components/Table/Table";
import { useNavigate } from 'react-router-dom';
import Footer from "../../Components/Footer/Footer";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import Footer2 from "../../Components/Footer/Footer2";
import CategoryHeader2 from "../../Components/Header/CategoryHeader2";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

var banner = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnFocus: false,
};
var subcategory = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    pauseOnFocus: false,
};

export default function Home(){
    const classes = useStyles()
    const [bannerList, setBannerList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [loading, setLoading] = useState(true)

    var navigate = useNavigate()

    useEffect(function(){
        fetchBannersList()
        fetchSubcategoryList()
        setLoading(false)
    },[])

    const fetchBannersList = async() => {
        var result = await getData('banner/displayallbanners')
        setBannerList(result.result)
    }

    const bannerSlider = () => {
        return bannerList.map((item)=>{
            return(
                <div>
                    <img src={`${ServerURL}/images/${item.bannerimage}`} alt="slider-pic" onClick={()=>handleProducts(item)} width="100%" height="450" style={{ cursor:'pointer' }} />
                </div>
            )
        })
    }

    const fetchSubcategoryList = async() => {
        var result = await getData('subcategory/displayallsubcategories')
        setSubcategoryList(result.result)
    }

    const handleProducts = (value) => {
        navigate(`/products/${value.subcategoryid}/${value.subcategoryname}`, {state: {subcategory: value}})
    }
    
    const subcategorySlider = () => {
        return subcategoryList.map((item)=>{
            return(
                <div>
                    <span className={classes.center}>
                        <img src={`${ServerURL}/images/${item.subcategoryicon}`} alt="gifts-pic" onClick={()=>handleProducts(item)} className={classes.roundpic} ></img>
                    </span>
                    <span onClick={()=>handleProducts(item)} className={classes.roundname}>{item.subcategoryname}</span>
                </div>
            )
        })
    }

    function description(){
        return(
            <Grid container sapcing={1}>
                <Grid item xs={12} className={classes.desctext}>
                    WE MADE YOUR DREAMS FOR YOUR LOVED ONES
                </Grid>
                <Grid item xs={12} className={classes.text}>
                    ... We Believe In Creating A Perfect Gift For Your Someone Special ...
                </Grid>
            </Grid>
        )
    }

    function description2(){
        return(
            <Grid container spaing={1}>
                <Grid item xs={12} className={classes.desctext2}>
                    "The Manner Of Giving Is Worth More Than The Gift"
                </Grid>
                <Grid item xs={12} className={classes.text2}>
                    ... Shop For Your Loving Ones ...
                </Grid>
            </Grid>
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
                                <InfoHeader />
                            </Grid>
                            <Grid item xs={12} style={{ margin:'25px 0px 0px 0px' }}>
                                <MainHeader />
                            </Grid>
                            {/* <Grid item xs={12} style={{ margin:'0px 0px 0px 0px' }}>
                                <CategoryHeader />
                            </Grid>
                            <Grid item xs={12} style={{ margin:'0px 0px 0px 0px' }}>
                                <NewHeader />
                            </Grid> */}
                            <Grid item xs={12} style={{ margin:'0px 0px 0px 0px' }}>
                                <CategoryHeader2 />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider {...banner}>
                                {bannerSlider()}
                            </Slider>
                        </Grid>
                        <Grid item xs={12} style={{ padding:10, marginTop: 40 }}>
                            <Slider {...subcategory}>
                                {subcategorySlider()}
                            </Slider>
                        </Grid>
                        <Grid item xs={12}>
                            {description()}
                        </Grid>
                        <Grid item xs={12} style={{ padding:10 }}>
                            <OtherSubcategory onClick={(value)=>handleProducts(value)} />
                        </Grid>
                        <Grid item xs={12} style={{ display:'flex', justifyContent:'center', padding:20 }}>
                            <Button
                                sx={{ ":hover": { bgcolor: "#c6186d", // theme.palette.primary.main
                                    },
                                    borderColor:'#e52c86',
                                    borderRadius:50,
                                    backgroundColor:'#e52c86',
                                    height:'8vh',
                                    width:'30%',
                                    fontSize:18,
                                    fontWeight:600
                                }}
                                className={classes.morebtn}
                                variant="contained"
                                onClick={()=>navigate('/morecollection')}
                            >
                                MORE COLLECTION
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {description2()}
                        </Grid>
                        <Grid item xs={12} className={classes.table}>
                            <Table />
                        </Grid>
                        {/* <Grid item xs={12} style={{ margin:'25px 0px 0px 0px' }}>
                            <Footer />
                        </Grid> */}
                        <Grid item xs={12} style={{ margin:'25px 0px 0px 0px' }}>
                            <Footer2 />
                        </Grid>
                    </div>
            }
        </div>
    )
}