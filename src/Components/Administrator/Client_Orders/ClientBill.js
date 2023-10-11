import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Grid, TextField, Avatar, MenuItem, TextareaAutosize } from "@mui/material";
import useStyles from "./ClientOrdersCss";
import { getData, postData, ServerURL } from "../../APIServices/FetchNodeServices";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Gifts from "../../Assets/Images/gifts.png";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";

export default function DisplayAllClientOrders(){
    const classes = useStyles()
    const [billProduct, setBillProduct] = useState('')
    const [itemInvoice, setItemInvoice] = useState([])
    const [orderLength, setOrderLength] = useState('')
    const [billAddress, setBillAddress] = useState([])
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [cancel, setCancel] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [messageWarning, setMessageWarning] = useState()
    const [openWarning, setOpenWarning] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    var params = useParams()
    let navigate = useNavigate()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    useEffect(function(){
        fetchAllOrderData()
        fetchBillDatabyInvoice()
        fetchBillAddressbyInvoice()
    },[])

    const fetchAllOrderData = async() => {
        var body = { orderid: params.orderid }
        var result = await postData('order/displayorderbyid', body)
        setBillProduct(result.data)
    }

    const fetchBillDatabyInvoice = async() => {
        var body = { invoiceno: params.invoiceno }
        var result = await postData('order/orderbyinvoiceno', body)
        setItemInvoice(result.data)
        setOrderLength(result.data.length)
    }

    const fetchBillAddressbyInvoice = async() => {
        var body = { invoiceno: params.invoiceno }
        var result = await postData('order/orderbyinvoiceno', body)
        setBillAddress(result.data[0])
    }
}