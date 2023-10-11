import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        flexDirection:'row',
    },
    info:{
        display:'flex',
        justifyContent:'space-around',
        margin:'0px 0px 0px 50px',
        height:55
    },
    txt:{
        fontSize:14,
        fontWeight:500,
    },
    txtdecor:{
        fontSize:14,
        fontWeight:500,
        textDecoration:'none',
        color:'#fff',
        cursor:'pointer'
    }
})

export default useStyles