import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Divider, Grid } from '@mui/material';
import Category from '../Category/Category';
import Subcategory from '../Subcategory/Subcategory';
import MainBanner from '../Banner/MainBanner';
import Size from '../Size/Size';
import Color from '../Color/Color';
import Product from '../Product/Product';
import CostPrice from '../CostPrice/CostPrice';
import ClientOrders from '../Client_Orders/ClientOrders';

export default function ListItems(props){
  const handleClick = (view) => {
    props.setComponent(view)
  }

  return(
  <Grid container spacing={1}>
    <Grid item xs={12}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Category" onClick={()=>handleClick(<Category setComponent={props.setComponent} />)} />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Subcategory" onClick={()=>handleClick(<Subcategory setComponent={props.setComponent} />)} />
    </ListItemButton>
    
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Product" onClick={()=>handleClick(<Product setComponent={props.setComponent} />)} />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Size" onClick={()=>handleClick(<Size setComponent={props.setComponent} />)} />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Colors" onClick={()=>handleClick(<Color setComponent={props.setComponent} />)} />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Cost Price" onClick={()=>handleClick(<CostPrice setComponent={props.setComponent} />)} />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Main Banner" onClick={()=>handleClick(<MainBanner setComponent={props.setComponent} />)} />
    </ListItemButton>

    <Divider />

    <ListSubheader component="div" inset>
      Client Side
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Client Orders" onClick={()=>handleClick(<ClientOrders setComponent={props.setComponent} />)} />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
    </Grid>
  </Grid>
  )
};