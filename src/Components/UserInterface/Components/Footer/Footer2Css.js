import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        flexDirection:'column'
    },
    rootcol:{
        display:'flex', 
        flexDirection:'column',
        alignItems:'center',
    },
    img:{
        width:'20%',
    },
    tagline:{
        fontFamily:'sans-serif', 
        fontSize:14, 
        color:'#e52c86', 
        fontWeight:600
    },
    heading:{
        color:'#e52c86',
        fontWeight:700,
        margin:'10% 0% 0% 0%'
    },
    head:{
        display:'flex', 
        justifyContent:'center',
        color:'#000',
        fontWeight:600,
        fontFamily:'sans-serif',
        fontSize:18
    },
    menu:{
        fontFamily:'sans-serif',
        margin:'8% 0% 0% 0%',
        color:'grey',
        //fontWeight:600,
        fontSize:14
    },
    ideastitle:{
        fontSize:'2rem',
        fontWeight:600,
        fontFamily:'sans-serif',
    },
    center:{
        display:'flex', 
        justifyContent:'center',
        flexDirection:'column'
    },
    copyright:{
        color:'grey',
        fontSize:15,
        fontWeight:500,
    }
})

export default useStyles