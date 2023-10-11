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
    note:{
        fontSize:14,
        textAlign:'start'
    },
    note1:{
        fontSize:14,
        fontWeight:600,
        textAlign:'start'
    },
    change:{
        fontSize:13,
        fontWeight:600,
        textAlign:'start',
        color:'red',
        cursor:'pointer'
    }
})

export default useStyles