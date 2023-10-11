import React,{useEffect,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { postData, getData, ServerURL } from '../../../APIServices/FetchNodeServices';


export default function NewHeader(){
    const [categoryData, setCategoryData] = useState([])
    const [subcategoryData, setSubcategoryData] = useState([])
    const [anchorElM, setAnchorElM] = React.useState(null);

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

    const handlemClick = (event) => {
      //alert(event.currentTarget.value)
      //setCategoryId(event.currentTarget.value)
      setAnchorElM(event.currentTarget);
      fetchSubCategories(event.currentTarget.value)
    };

    const handlemClose = () => {
        setAnchorElM(null);
    };

    const mainMenu=()=>{
        return categoryData.map((item,index)=>{
            return(index<=5? 
              <>
              <Button value={item.categoryid} onClick={handlemClick} style={{color:'#000', marginLeft:15, fontWeight:'600',fontSize:16}}>
                    {item.categoryname}
                </Button>
               
            {/* <Grid spacing={2}>
             <Grid item xs={12}>
                <Button value={item.categoryid} onClick={handlemClick} style={{color:'#000', marginLeft:15, fontWeight:'600',fontSize:16}}>
                    {item.categoryname}
                </Button>
             </Grid>
            </Grid> */}
             </>
            :<></>)
        })
    }

    function subMenu() {
        return(
            <div>
        <Menu
          anchorEl={anchorElM}
          open={mopen}
          onClose={handlemClose}
          onClick={handlemClose}
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
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >

          { subcategoryData.map((item)=>{
             return(
              <MenuItem>
              <img src={`${ServerURL}/images/${item.subcategoryicon}`} width="20" style={{marginRight:10}} />
              {item.subcategoryname}
            </MenuItem>
             )
          })}

        </Menu>
      </div>
        )
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{background:'#FFF'}} position="sticky">
                <Toolbar>
                    <div style={{ display:'flex', }}>
                        {mainMenu()}
                        {subMenu()}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}