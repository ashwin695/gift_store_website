import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    mainContainer:{
        display: 'flex',
        width: '130wh',
        justifyContent: 'center'
    },
    box:{
        width: '150%',
        height: '30%',
        borderRadius: 10,
        marginTop: 0
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
    row:{
        display:'flex',
        flexDirection:'row'
    },
    col:{
        display:'flex',
        flexDirection:'column'
    },
    center:{
        display:'flex',
        justifyContent:"center",
        alignItems:'center'
    },
    end:{
        display:'flex',
        justifyContent:'flex-end'
    },
    head:{
        fontWeight:600,
        margin:'0% 0% 1% 0%'
    },
    details:{
        fontSize:14,
        padding:'0% 0% 1% 1%'
    },
    grid:{ 
        display:'flex', 
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        //border: 'solid 1px #636e72',
        padding:'0.7% 0.7% 0.7% 0.7%',
        margin:'1% 1% 1% 1%',
        //color:'#636e72',
        fontWeight:600,
        fontSize:16,
        fontFamily:'sans-serif',
        //letterSpacing:1
    },
    grid1:{
        display:'flex', 
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-between',
        //border: 'solid 1px #636e72',
    },
    cartimg:{
        width:'80%',
        //height:'22vh',
        cursor:'pointer',
        display:'block',
        borderRadius:10
    },
    name:{
        fontSize:'1rem',  //22
        fontWeight:600,
        cursor:'pointer'
    },
    sizecolor:{
        fontSize:'0.87rem',  //14
        fontWeight:400,
        color:'GrayText',
        padding:'0% 0% 0% 0.5%'
    },
    sizecolor1:{
        fontSize:'0.86rem',  //14
        fontWeight:400
    },
    price:{
        fontSize:'0.87rem',  //14
        fontWeight:400,
        color:'grey',
    },
    cutprice:{
        fontSize:'0.87rem',
        padding:'0% 0% 0% 1%',
    },
    divider:{
        backgroundColor:'#e52c86',
        height:2
    },
    payment:{
        fontWeight:600,
        fontSize:14,
        padding:'0% 0% 1% 1%',
        color:'grey',
    },
    paymentdetails:{
        fontWeight:400,
    }
})

export default useStyles