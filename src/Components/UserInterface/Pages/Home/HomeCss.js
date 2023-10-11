import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        flexDirection:'column'
    },
    rootrow:{
        display:'flex',
        flexDirection:'row'
    },
    roundpic:{
        width:'85%',
        borderRadius:100,
        margin:'5px 0px 0px 0px', 
        padding:5,
        cursor: 'pointer'
    },
    roundname:{
        display:'flex',
        justifyContent:'center',
        fontSize:16,
        fontWeight:500,
        textAlign:'center',
        cursor: 'pointer'
    },
    center:{
        display:'flex',
        justifyContent:'center',
    },
    desctext:{
        display:'flex',
        justifyContent:'center',
        padding:'40px 0px 5px 0px',
        fontSize:25,
        fontWeight:500,
        fontFamily:'serif',
        letterSpacing:1
    },
    text:{
        display:'flex',
        justifyContent:'center',
        padding:'5px 0px 20px 0px',
        fontSize:17,
        fontWeight:500,
        fontFamily:'serif',
        wordSpacing:1,
        color:'#000'
    },
    desctext2:{
        display:'flex',
        justifyContent:'center',
        padding:'30px 0px 5px 0px',
        fontSize:25,
        fontWeight:500,
        fontFamily:'serif',
        letterSpacing:1
    },
    text2:{
        display:'flex',
        justifyContent:'center',
        padding:'5px 0px 20px 0px',
        fontSize:19,
        fontWeight:500,
        fontFamily:'serif',
        wordSpacing:1,
        color:'#000'
    },
    table:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        padding:10, 
        flexWrap:'wrap'
    }
})

export default useStyles