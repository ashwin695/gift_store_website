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
        width:'25%',
    },
    tagline:{
        fontFamily:'sans-serif', 
        fontSize:14, 
        color:'#c6186d', 
        fontWeight:600
    },
    heading:{
        color:'#c6186d',
        fontWeight:700,
        margin:'10% 0% 0% 0%'
    },
    head:{
        color:'#c6186d',
        fontWeight:700,
        margin:'3% 0% 0% 0%',
        fontFamily:'serif',
        fontSize:18
    },
    menu:{
        fontFamily:'serif',
        margin:'2% 0% 0% 0%',
        fontSize:15,
        color:'#c6186d',
        fontWeight:600
    },
})

export default useStyles