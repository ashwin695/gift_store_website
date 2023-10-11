import React, { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from "../../../Assets/Images/logo.png"
import { AccountCircleOutlined, LocalMallOutlined, NotificationsNoneOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft:'20%',
      /* marginLeft: theme.spacing(40), */
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

export function MainHeader(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    var navigate = useNavigate()
    var shoppingBag = useSelector(state =>state.cartbag)
    var keys = Object.keys(shoppingBag)
    //console.log("keys", keys)

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit" style={{color:'#000'}}>
                    <Badge badgeContent={keys.length} color="error">
                        <LocalMallOutlined /* onClick={toggleDrawer('right', true)} */ style={{fontSize:25}}/>
                    </Badge>
                </IconButton>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <NotificationsNoneOutlined />
                </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircleOutlined />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div sx={{display:'flex', flexDirection:'row' }}>
            <Box>
                <AppBar style={{ background:'#FFF' }} position="relative" elevation={0}>
                    <Toolbar>
                       {/*  <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr:10 , color:'#000'}}
                        >
                            <MenuIcon style={{fontSize:25}}/>
                        </IconButton> */}
                
                        {/*{headerCategories()}
                        {subDropdown()}*/}
                
                        <img 
                            src={logo}
                            width="7%"
                            style={{ padding:10, margin:'0% 0% 0% 5%' }}
                            onClick={()=>navigate(`/`)}
                            >
                        </img>
                
                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon style={{color:'#000'}} />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{ color:'#000', border:'1px solid', borderRadius:20}}
                            //style={{width:'170%'}}
                            />
                        </Search>
                
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit" style={{color:'#000'}}>
                                <Badge badgeContent={keys.length} color="error">
                                    <LocalMallOutlined onClick={()=>navigate(`/cart`)} style={{fontSize:28}}/>
                                </Badge>
                            </IconButton>
                
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                
                                color="inherit"
                                style={{color:'#000'}}
                            >
                                {/* {
                                    btn
                                    ?
                                        <AccountCircleOutlined onClick={()=>navigate(`/myaccounts`)} style={{fontSize:28}} />
                                    :
                                        <AccountCircleOutlined onClick={()=>navigate(`/accounts/login`)} style={{fontSize:28}} />
                                } */}
                                <AccountCircleOutlined onClick={()=>navigate(`/myaccounts`)} style={{fontSize:28}} />
                            </IconButton>
                
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            >
                            <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box>
        </div>
      );
}