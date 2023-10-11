import React, { useState, useEffect } from "react";
import useStyles from "./MoreCollectionsCss";
import { styled } from "@mui/material/styles";
import { Grid, Box, ButtonBase, Typography } from "@mui/material";
import { ServerURL, getData } from "../../../APIServices/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import InfoHeader from "../../Components/Header/InfoHeader";
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import { MainHeader } from "../../Components/Header/MainHeader";
import CategoryHeader2 from "../../Components/Header/CategoryHeader2";
import Footer2 from "../../Components/Footer/Footer2";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
}));
const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});
const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));
const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
}));
const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function MoreCollection(){
    const classes = useStyles()
    const [subcategoryList, setSubcategoryList] = useState([])
    const [loading, setLoading] = useState(true)

    var navigate = useNavigate()

    useEffect(function(){
        fetchSubcategoryList()
        setLoading(false)
    },[])

    const fetchSubcategoryList = async() => {
        var result = await getData('subcategory/displayallsubcategories')
        setSubcategoryList(result.result)
    }

    const handleProducts = (value) => {
        navigate(`/products/${value.subcategoryid}/${value.subcategoryname}`, {state: {subcategory: value}})
    }

    const showAllSubcategory = () => {
        return(
            <Box className={classes.box}>
                {
                    subcategoryList.map((item, index) => (
                        <ImageButton
                            focusRipple
                            key={item.subcategoryid}
                            style={{
                                width: '18%',
                                height: '35vh',
                                margin:'1.5% 1% 1.5% 1%',
                            }}
                            onClick={()=>handleProducts(item)}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${ServerURL}/images/${item.subcategoryicon})` }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    color:'#fff',
                                    fontWeight:600, 
                                    fontSize:16
                                }}
                                >
                                    {item.subcategoryname}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    ))
                }
            </Box>
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
                            <Grid item xs={12} style={{ margin:'0px 0px 0px 0px' }}>
                                <CategoryHeader2 />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ padding:3, textAlign:'center' }}>
                            {showAllSubcategory()}
                        </Grid>
                        <Grid item xs={12} style={{ margin:'25px 0px 0px 0px' }}>
                            <Footer2 />
                        </Grid>
                    </div>
            }
        </div>
    )
}