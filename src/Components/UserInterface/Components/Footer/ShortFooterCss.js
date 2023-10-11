import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        flexDirection:'column'
    },
    bg:{
        background:'#ecf0f1'
    },
    temp:{
        margin:50, 
        display:'flex', 
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    circlebg:{
        background:'grey',
        borderRadius:'50%', 
        width:60, 
        height:60, 
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center'
    },
    footertitle:{
        margin:15, 
        fontWeight:700, 
        fontFamily:'serif', 
        color:'#636e72'
    },
    footerdesc:{
        margin:15, 
        fontSize:15, 
        fontFamily:'cursive', 
        color:'#636e72'
    }
})

export default useStyles