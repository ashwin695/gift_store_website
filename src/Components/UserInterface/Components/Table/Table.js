import React from "react";
import useStyles from "./TableCss";
import { styled } from '@mui/material/styles';
import { Grid, Paper, Box, ButtonBase, Typography } from "@mui/material";
import CorporateGifts from '../../../Assets/Images/corporategifts.jpg'
import Festivals from '../../../Assets/Images/festivals.jpg'
import { useNavigate } from "react-router-dom";

const images = [
    {
      url: '/static/media/corporategifts.bc531b979ce81f1b6c82.jpg',
      title: 'Corporate Gifts',
      subcategoryid: 8,
      subcategoryname: 'Corporate Gifts'
    },
    {
      url: '/static/media/festivals.380cf3b3194573457022.jpg',
      title: 'Festivals',
    }
]
//console.log(CorporateGifts)
//console.log(Festivals)
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
    opacity: 0.0,
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

export default function Table(){
    const classes = useStyles()
    const navigate = useNavigate()

    const handleCorporate = () => {
        //navigate(`/products/${value.subcategoryid}/${value.subcategoryname}`)
        navigate(`/products/${8}/${'Corporate Gifts'}`)
    }

    const handleFestivals = () => {
        //navigate(`/products/${value.categoryid}/${value.categoryname}`)
        navigate(`/category_products/${3}/${'Festival'}`)
    }

    /* function showTable(){
        return(
            <Box className={classes.box}>
                {images.map((image) => (
                    <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: '47%',
                        height: 300,
                        margin:'0px 10px 0px 20px'
                    }}
                    >
                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
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
                            fontSize:45,
                            fontFamily:'sans-serif'
                        }}
                        >
                        {image.title}
                        <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                    </ImageButton>
                ))}
            </Box>
        )
    } */

    function showCorporateGifts(){
        return(
            <Box className={classes.box}>
                <ImageButton
                    focusRipple
                    key='Corporate Gifts'
                    style={{
                        width: '100%',
                        height: 300,
                        margin:'0px 10px 0px 20px'
                    }}
                    onClick={()=>handleCorporate()}
                >
                    <ImageSrc style={{ backgroundImage: `url(${CorporateGifts})` }} />
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
                            fontSize:45,
                            fontFamily:'sans-serif'
                        }}
                        >
                            Corporate Gifts
                    <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                    </Image>
                </ImageButton>
            </Box>
        )
    }

    function showFestivals(){
        return(
            <Box className={classes.box}>
                <ImageButton
                    focusRipple
                    key='Festivals'
                    style={{
                        width: '100%',
                        height: 300,
                        margin:'0px 10px 0px 20px'
                    }}
                    onClick={()=>handleFestivals()}
                >
                    <ImageSrc style={{ backgroundImage: `url(${Festivals})` }} />
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
                            fontSize:45,
                            fontFamily:'sans-serif'
                        }}
                    >
                        Festivals
                        <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                        </Image>
                </ImageButton>
            </Box>
        )
    }

    return(
        <div>
            <Grid item xs={12}>
                <Paper className={classes.root} style={{ borderRadius:20 }} elevation={5}>
                    {showCorporateGifts()}
                    {showFestivals()}
                </Paper>
            </Grid>
        </div>
    )
}