import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    space:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    icon:{
        cursor:'pointer'
    },
    head:{
        fontSize:30,
        fontWeight:600,
        fontFamily:'serif'
    },
    center:{
        display:'flex',
        justifyContent:'center'
    },
    terms:{
        margin:'3% 0% 0% 0%',
        fontSize:13,
        textAlign:'center'
    }
})

export default useStyles