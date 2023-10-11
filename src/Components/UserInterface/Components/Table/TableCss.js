import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        padding:20,
        width:'80rem', 
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        textAlign:'center'
    },
    box:{
        display: 'flex', 
        flexWrap: 'wrap', 
        minWidth: 300, 
        width: '100%'
    }
})

export default useStyles