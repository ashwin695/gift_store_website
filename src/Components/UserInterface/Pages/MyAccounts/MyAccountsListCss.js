import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        flexDirection:'column',
    },
    image:{
        display:'flex',
        alignItems:'center'
    },
    margin:{
        margin:10,
        marginLeft:30
    },
    row:{
        display:'flex',
        flexDirection:'row',
    },
    row1:{
        display:'flex',
        flexDirection:'row',
        cursor:'pointer'
    },
    fldtxt:{
        display:'flex',
        padding:5,
        fontSize:15,
        letterSpacing:1,
        fontFamily:'sans-serif',
    },
    fldtxt2:{
        display:'flex',
        alignItems:'center',
        letterSpacing:1,
        fontFamily:'sans-serif'
    },
    link:{
        textDecoration:'none'
    }
})

export default useStyles