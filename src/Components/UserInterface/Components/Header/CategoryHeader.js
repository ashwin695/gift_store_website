import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Grid, Button, Divider, Menu, MenuItem } from "@mui/material";
import categoryHeaderStyles from "./CategoryHeaderCss";
import { ServerURL, getData, postData } from "../../../APIServices/FetchNodeServices";
import { useNavigate } from "react-router-dom";

export default function CategoryHeader(){
    const classes = categoryHeaderStyles()
    const [categoryData, setCategoryData] = useState([])
    const [subcategoryData, setSubcategoryData] = useState([])
    const [anchorElM, setAnchorElM] = React.useState(null)

    var navigate = useNavigate()
    const open = Boolean(anchorElM);

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

    const handlemouseover = (event) => {
        setAnchorElM(event.currentTarget);
        fetchSubCategories(event.currentTarget.value)
    }

    const handleDropdownClose = () => {
        setAnchorElM(null);
    };

    const showCategoryData = () => {
        return(
            categoryData.map((item)=>{
                return(
                    <Button 
                        sx={{ 
                            borderRadius:0,
                            height:'8vh',
                            margin:'0% 3% 0% 3%',
                            fontWeight:800,
                            fontSize:16,
                            letterSpacing:1,
                            color:'#e52c86'
                        }}
                        value={item.categoryid} 
                        onClick={handlemouseover}
                        >
                            {item.categoryname}
                    </Button>
                )
            })
        )
    }

    function showSubcategoryData() {
        return(
            <div>
                <Menu
                    anchorE1 = {anchorElM}
                    open = {open}
                    onClose = {handleDropdownClose}
                    onClick={handleDropdownClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'hidden',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    {
                        subcategoryData.map((item) => {
                            return(
                                <MenuItem>
                                    <img src={`${ServerURL}/images/${item.subcategoryicon}`} alt={`${ServerURL}/images/${item.subcategoryicon}`} width="30" style={{marginRight:10}}></img>
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
            <AppBar position="sticky" sx={{ backgroundColor: '#fff', textAlign:'center' }} elevation={0}>
                <Divider />
                <Toolbar>
                    <div style={{backgroundColor: 'pink', width:'100%' }}>
                        {showCategoryData()}
                        {showSubcategoryData()}
                    </div>
                    {/* <Grid item xs={12} style={{ width:1100, display:'flex', justifyContent:'center' }}> */}

                        {/* <div style={{ color:'#e52c86', margin:'0px 3% 0px 0%', fontWeight:600, fontSize:14.5, fontFamily:'sans-serif', letterSpacing:1, cursor:'pointer' }} onClick={()=>navigate(`/`)}>HOME</div> */}

                        {/*  {showCategoryData()}
                        {showSubcategoryData()} */}
                    {/* </Grid> */}
                </Toolbar>
                <Divider />
            </AppBar>
        </Box>
    )
}