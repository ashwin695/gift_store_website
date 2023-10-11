import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItems from './ListItems';
import { getData, getToken, isValidAuth, logout } from '../../APIServices/FetchNodeServices';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import ErrorIcon from "../../Assets/Images/error-icon.png"
import { Dna } from "react-loader-spinner";
import { css } from "@emotion/react"
import Swal from 'sweetalert2';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [authState, setAuthState] = useState(false)
  const [open, setOpen] = React.useState(true);
  const [view, setView] = useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = useState(true)

  var navigate = useNavigate()
  //var location = useLocation()
  //console.log(location.state.emailid)

  const handleClose = () => {
    setDialogOpen(false);
    navigate(`/admin`)
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const setComponent=(v)=>{
    setView(v)
  }
  
  useEffect(function(){
    checkAuth()
  })

  /* const checkAuth = async() => {
    var result = await isValidAuth('admin', localStorage.getItem('admin_user'))
    //alert(JSON.stringify(result))
    if(result.auth)
    {
      setAuthState(true)
      setLoading(false)
    }
    else
    {
      setAuthState(true)//false
      setLoading(false)
      setDialogOpen(false);//true
    }
  } */
  const checkAuth = async() => {
    //var result = await isValidAuth('customer', /* localStorage.getItem('id'), */ 9109472941,(iss mobileno ko customerid se fetch kr vana hai) localStorage.getItem('id'))
    var result = await getToken('admin', localStorage.getItem('admin_user'))
    //alert(JSON.stringify(result))

    //console.log("checkauth",result)


    if(result == null)
    {
        setAuthState(false)
        setLoading(false)
        setDialogOpen(true)
    }
    else
    {
        if(result.auth)
        {
            const token = result.token
            setTimeout(() => {
              checkAuthMobile(token) 
           }, 500);
        }
        //console.log("account",result)
    }
  }

  const checkAuthMobile = async(token) => {
    var result = await isValidAuth('admin', token)
    //alert(JSON.stringify(result))

    //console.log("checkAuthMobile", result)

    if(!result.auth)
    {
        setAuthState(false)
        setLoading(false)
        setDialogOpen(true)
        
    }
    else
    {
        setAuthState(true)
        setLoading(false)
    }
  }

  const handleLogout = async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout Successfull',
      showConfirmButton: false,
      timer: 3000
    })
    navigate(`/admin`)
    localStorage.removeItem('admin_user')
  }

  function dialog() {
    return(
      <div>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                <img src={ErrorIcon} alt='' width="20%" />
              </Grid>
              <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'2% 0% 0% 0%'}}>
                <div style={{ fontSize:20, fontWeight:600, color:'red', fontFamily:'sans-serif' }}>Not A Valid User, Signin Your Credentials First!.</div>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={handleClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  return (
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
            <div>
              {
                authState
                ?
                  <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: 'flex' }}>
                      <CssBaseline />
                      <AppBar position="absolute" open={open}>
                        <Toolbar
                          sx={{
                            pr: '24px', // keep right padding when drawer closed
                            backgroundColor:'#e52c86'
                          }}
                        >
                          <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                              marginRight: '36px',
                              ...(open && { display: 'none' }),
                            }}
                          >
                            <MenuIcon />
                          </IconButton>
                          <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                          >
                            Administrator Dashboard
                          </Typography>
                          <IconButton color="inherit">
                            <div style={{ fontSize:20, fontWeight:600 }} onClick={()=>handleLogout()}>Logout</div>
                          </IconButton>
                        </Toolbar>
                      </AppBar>
                      <Drawer variant="permanent" open={open}>
                        <Toolbar
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                          }}
                        >
                          <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                          </IconButton>
                        </Toolbar>
                        <Divider />
                        <ListItems component="nav" setComponent={setComponent} >
                          <Divider sx={{ my: 1 }} />
                        </ListItems>
                      </Drawer>
                      <Box
                        component="main"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? theme.palette.grey[100]
                              : theme.palette.grey[900],
                          flexGrow: 1,
                          height: '100vh',
                          overflow: 'auto',
                        }}
                      >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 9, mb: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              {view}
                            </Grid>
                          </Grid>
                          <Copyright sx={{ pt: 4 }} />
                        </Container>
                      </Box>
                    </Box>
                  </ThemeProvider>
                :
                  <div>
                      {dialog()}            
                  </div>
              }
            </div>
        }
      </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}