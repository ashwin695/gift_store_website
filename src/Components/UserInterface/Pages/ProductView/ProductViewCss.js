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
    rootcolumn:{
        display:'flex',
        justifyContent:'end',
        flexDirection:'column',
    },
    imggrid:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'end',
        width:'50%',
        height:'50%',
        padding:20,
        //position:'sticky'
    },
    img:{
        width:'100%',
        height:'65vh',
        margin:'3% 0% 0% 2%'
    },
    btnsubmit:{
        backgroundColor:'#e52c86',
        height:45,
        borderRadius:0
    },
    btnreset:{
        borderColor:'#e52c86',
        color:'#c6186d'
    },
    subname:{
        color:'grey',
        fontSize:16,
        fontWeight:600,
        fontFamily:'sans-serif',
        padding:'1% 0% 0% 0%'
    },
    name:{
        fontSize:28,
        fontWeight:600,
        fontFamily:'serif',
        padding:'1% 0% 0% 1%'
    },
    margin:{
        padding:'1.5% 0% 0% 1%'
    },
    price:{
        fontSize:30,
        fontWeight:700,
        fontFamily:'serif'
    },
    cutprice:{
        padding:'0% 0% 0% 1%',
        fontSize:20
    },
    imageUploadStyles:{
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        padding: '1%'
    },
    divider:{
        height:3,
        backgroundColor:'#e52c86',
    },
    aboutproduct:{
        border:'solid 2px #bdc3c7',
        display:'block',
        whiteSpace:'pre-line',
        fontSize:14
    },
    descheading:{
        fontWeight:700, 
        color:'#000', 
        fontSize:16,
        //margin:5,
    },
    details:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        padding:'2% 0% 0% 1%'
    },
    percentoff:{
        backgroundColor:'#e52c86', 
        color:'#fff', 
        fontSize:16, 
        fontWeight:700, 
        padding:10, 
        margin:'0px 0px 0px 20px'
    },
    customisation:{
        display:'block',
        whiteSpace:'pre-line',
        fontSize:14,
        margin:'0.5% 0% 0% 0%'
    },
    inputStyle:{
        display:'none'
    },
    textarea:{
        color: '#c6186d',
        borderColor: '#e84393',
        borderWidth: 2,
        fontSize:15,
        fontFamily:'inherit',
        '&:hover': {
            borderColor: '#c6186d',
            borderLeftWidth: 6,
        },
    },
    value:{
        fontSize:22,
        fontWeight:600,
        color:'#c6186d',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'serif',
        margin:'20px 0px 0px 0px'
    }
})

export default useStyles