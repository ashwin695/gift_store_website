import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    fnhd:{
        fontWeight:700,
        fontSize:23,
        color:'#e52c86'
    },
    divider:{
        backgroundColor:'#e52c86',
        height:2
    },
    root:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    lnth:{
        fontSize:17,
        fontWeight:600,
        color:'#e52c86'
    },
    row:{
        margin:4,
        fontSize:15,
    },
    center:{
        display:'flex',
        justifyContent:'center'
    },
    end:{
        display:'flex',
        justifyContent:'end'
    },
    btn:{
        border:'none',
        backgroundColor:'transparent',
        height:'12vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    orderhistoryimg:{
        width:'100%', //22%
        height:'11vh',
        cursor:'pointer',
        padding:'0% 0% 0% 0%'
    },
    productname:{
        fontWeight:500,
        fontSize:16, //18
        //color:'#2c3e50',
        fontFamily:'sans-serif',
        overflow:'hidden',
        textOverflow:'ellipsis'
    },
})

export default useStyles