import React, { useState, useEffect } from "react";
import { getData, ServerURL } from "../../../APIServices/FetchNodeServices";
import { Grid, Box, ButtonBase, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import useStyles from "./OtherSubcategoryCss";
import { useNavigate } from 'react-router-dom';

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

export default function OtherSubcategory(props){
    const classes = useStyles()
    const [subcategoryList, setSubcategoryList] = useState([])

    var navigate = useNavigate()

    useEffect(function(){
        fetchSubcategoryList()
    },[])

    const fetchSubcategoryList = async() => {
        var result = await getData('subcategory/displayallsubcategories')
        setSubcategoryList(result.result)
    }

    const handleValue = (item) => {
        //navigate(`/products/${sname}`, {state: {subcategoryname: sname}})
        //props.history.push({pathname:`/products/${sname}`}, {subcategoryid:sname})
        props.onClick(item)
    }

    const otherSubcategory = () => {
        return(
            <Box className={classes.box}>
                {
                    subcategoryList.map((item, index) => ( index>=1 && index<=12 ? //index>=8 && index<=19 yahi krna hai jab products dal jaaye
                        <ImageButton
                            focusRipple
                            key={item.subcategoryname}
                            style={{
                                width: '16%',
                                height: '35vh',
                                margin:'5px 5px 5px 5px',
                            }}
                            onClick={()=>handleValue(item)}
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
                    :
                    <></>
                    ))
                }
            </Box>
        )
    }

    return(
        <div>
            <Grid item xs={12}>
                {otherSubcategory()}
            </Grid>
        </div>
    )
}