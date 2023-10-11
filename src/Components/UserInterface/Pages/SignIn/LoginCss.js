import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
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
    resend:{
        color:'red',
        fontSize:12,
        fontWeight:600,
        cursor:'pointer',
        textAlign:'start'
    },
    note:{
        textAlign:'center',
        fontSize:14,
        fontWeight:600,
        margin:'4% 15% 4% 15%',
        color:'grey'
    }
})

export default useStyles