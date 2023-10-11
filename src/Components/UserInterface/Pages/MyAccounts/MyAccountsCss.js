import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        backgroundColor:'whitesmoke'
    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    terms:{
        fontSize:14, 
        letterSpacing:1
    }
})

export default useStyles