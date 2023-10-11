import React,{useEffect,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { postData, getData, ServerURL } from '../../../APIServices/FetchNodeServices';
import { useNavigate, Link } from "react-router-dom";
import { Divider, Grid } from '@mui/material';
import { ArrowBackIos, ArrowDownward, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export default function CategoryHeader2(){
    const [categoryData, setCategoryData] = useState([])
    const [subcategoryData, setSubcategoryData] = useState([])
    const [anchorElM, setAnchorElM] = React.useState(null);
    const [mouseHover, setMouseHover] = useState(false)

    var navigate = useNavigate()
    const mopen = Boolean(anchorElM);

    useEffect(function(){
        fetchCategoryData()
    },[])

    const fetchCategoryData = async() => {
        var result = await getData('category/displayallcategories')
        setCategoryData(result.result)
    }

    const fetchSubCategories = async(categoryid) => {
        var body = {categoryid: categoryid}
        var result = await postData('subcategory/displaysubcategorybycategory', body)
        setSubcategoryData(result.result)
    }

    const handleClick = (event) => {
        setAnchorElM(event.currentTarget);
        fetchSubCategories(event.currentTarget.value)
        setMouseHover(true)
    }

    const handleClose = () => {
        setAnchorElM(null);
        setMouseHover(false)
    };

    const handleProducts = (value) => {
        navigate(`/products/${value.subcategoryid}/${value.subcategoryname}`)
    }

    const showCategoryData = () => {
        return categoryData.map((item, index) => {
            return(
                index < 5
                ?
                <Button 
                    sx={{ 
                        borderRadius:0,
                        height:'8vh',
                        margin:'0% 3% 0% 3%',
                        //marginLeft: 2,
                        fontWeight:800,
                        fontSize:16,
                        letterSpacing:1,
                        color:'#e52c86',
                    }}
                    value={item.categoryid} 
                    //onMouseEnter={handleClick}
                    onClick={handleClick}
                    >
                        {item.categoryname}
                        {/* {
                            mouseHover
                            ?
                            <KeyboardArrowDown sx={{ margin: '10px' }} />
                            :
                            <KeyboardArrowUp sx={{ margin: '10px' }} />
                        } */}
                </Button>
                :
                <></>
            )
        })
    }

    const showSubcategoryData = () => {
        return(
            <div>
                <Menu
                    sx={{
                        mt:0.1,
                        ml:10
                    }}
                    anchorEl={anchorElM}
                    open={mopen}
                    onClick={handleClose}
                    onMouseDown={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                        style: {
                          maxHeight: 100 * 4.5,
                          width: '25ch',
                        },
                    }}
                >
                    {
                        subcategoryData.map((item) => {
                            return(
                                <MenuItem onClick={()=>handleProducts(item)}>
                                    {item.subcategoryname}
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ backgroundColor: '#fff' }} position='sticky' elevation={0}>
                <Divider />
                <Toolbar sx={{ textAlign:'center' }}>
                    <Grid item xs={3} sx={{ display:'flex', justifyContent:'end', color:'#e52c86', margin:'0px 3% 0px 0%', fontWeight:600, fontSize:14.5, fontFamily:'sans-serif', letterSpacing:1 }}>
                        <div style={{ cursor:'pointer' }} onClick={()=>navigate(`/`)}>HOME</div>
                    </Grid>
                    <Grid item xs={9} sx={{ textAlign:'start' }}>
                        {showCategoryData()}
                        {showSubcategoryData()}
                    </Grid>
                </Toolbar>
                <Divider />

            </AppBar>
        </Box>
    )
}