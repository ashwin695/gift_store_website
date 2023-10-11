import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
    },
    fnhd:{
        fontWeight:700,
        fontSize:23,
        color:'#e52c86'
    },
    fnsubhd:{
        fontWeight:600,
        fontSize:15
    },
    divider:{
        backgroundColor:'#e52c86',
        height:1
    },
    addressbox:{
        border:'solid',
        borderColor:'#ecf0f1',
        borderWidth:1,
        padding:10
    },
    row:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    icon:{
        color:'#e52c86'
    },
    addressdesc:{
        margin:'0% 0% 0% 4%', 
        fontSize:14,
    },
    plusbox:{
        
        padding: 20,
        border: "dashed",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        margin: 10
    },
    paper:{
        padding:10, 
        borderRadius:10, 
        display:'flex', 
        flexDirection:'row'
    },
    arrow:{
        color:'#e52c86',
        cursor:'pointer'
    }, 
    paper1:{
        padding:7, 
        display:'flex', 
        flexDirection:'row',
    },
})

export default useStyles