import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    mainContainer:{
        display: 'flex',
        width: '100wh',
        justifyContent: 'center'
    },
    box:{
        width: '105%',
        height: '30%',
        borderRadius: 10,
        marginTop: 0
    },
    row:{
        display:'flex',
        flexDirection:'row'
    },
    image:{
        padding:5
    },
    heading:{
        padding:5,
        fontSize:20,
        fontWeight:500,
        letterSpacing:1
    },
    inputStyle:{
        display:'none'
    },
    center:{
        display:'flex',
        justifyContent:"center",
        alignItems:'center'
    },
    button:{
        color:'#c6186d'
    },
    btnsubmit:{
        backgroundColor:'#e52c86'
    },
    btnreset:{
        borderColor:'#e52c86',
        color:'#c6186d'
    },
    end:{
        display:'flex',
        justifyContent:'flex-end'
    }
})

export default useStyles