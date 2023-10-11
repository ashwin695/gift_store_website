import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        flexDirection:'column'
    },
    rootrow:{
        display:'flex',
        flexDirection:'row'
    },
    showproduct:{
        display:'flex', 
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    paper:{
        display:'flex',
        flexDirection:'column',
        width:'20%',
        height:'80%',
        margin:10,
    },
    imggrid:{
        width:'100%',
        height:'80%',
    },
    productimg:{
        width:'100%',
        height:'100%',
        borderRadius:'8% 8% 0% 0%',
        cursor:'pointer'
    },
    productname:{
        textAlign:'center',
        fontWeight:500,
        overflow:'hidden',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis',
        width:'90%',
    },
    center:{
        textAlign:'center'
    },
    price:{
        fontSize:18,
        fontWeight:700
    },
    cutprice:{
        fontWeight:500
    }
})

export default useStyles