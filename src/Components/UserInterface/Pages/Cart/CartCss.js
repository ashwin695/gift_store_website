import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
    },
    img:{
        width:'25%',
    },
    desc:{
        fontSize:19,
        fontFamily:'serif',
        fontWeight:600,
        textAlign:'center'
    },
    head:{
        fontSize:30,
        fontFamily:'sans-serif',
        fontWeight:600
    },
    divider:{
        height:3,
        backgroundColor:'#e52c86',
    },
    cart:{
        display:'flex',
        margin:20
    },
    grid:{ 
        display:'flex', 
        flexDirection:'column',
        justifyContent:'space-between'
    },
    title:{
        fontFamily:'sans-serif',
        fontSize:17
    },
    cartimg:{
        width:'90%',
        height:'22vh',
        cursor:'pointer',
        display:'block'
    },
    /* imgdiv:{
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.5)',
        bottom:6,
        left:8,
        right:0,
        overflow:'hidden',
        width:'95.5%',
        height:'23vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
    }, */
    name:{
        fontSize:'1.4rem',  //22
        fontWeight:600,
        cursor:'pointer'
    },
    details:{
        fontSize:'0.87rem',  //14
        fontWeight:400,
        color:'GrayText'
    },
    details1:{
        fontSize:'0.86rem',  //14
        fontWeight:400
    },
    price:{
        fontSize:17,  //14
        fontWeight:400,
        color:'grey',
    },
    cutprice:{
        padding:'0% 0% 0% 1%',
        fontSize:15
    },
    subtotal:{
        fontSize:22,
        fontFamily:'serif',
        fontWeight:600,
        letterSpacing:1
    },
    subtotalcharge:{
        margin:'0% 0% 0% 8%',
        fontSize:22,
        fontFamily:'cursive',
        fontWeight:600,
        color:'#e52c86'
    },
    cartbtn:{
        display:'flex',
        justifyContent:'flex-end',
    }
    
})

export default useStyles