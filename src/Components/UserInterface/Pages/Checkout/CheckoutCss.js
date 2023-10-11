import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center'
    },
    row:{
        display:'flex',
        flexDirection:'row'
    },
    head:{
        fontFamily: 'sans-serif',
        fontWeight: 600,
        color: '#e52c86',
        margin:'2% 2% 2% 1%'
    },
    col:{
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'flex-start',
    },
    qtybag:{
        display:'flex', 
        justifyContent:'flex-start',
        padding:10,
        fontWeight:700,
        color:'#e52c86'
    },
    scroll:{
        display:'flex', 
        flexDirection:'column', 
        overflowY:'scroll', 
        height:295
    },
    checkoutimg:{
        width:'100%', //22%
        height:'15vh',
        cursor:'pointer',
        padding:'0% 3% 0% 1%'
    },
    block:{
        margin:'2% 2% 2% 2%', 
        padding:'2% 2% 2% 2%'
    },
    productname:{
        fontWeight:500,
        fontSize:17, //18
        margin:'1% 0% 2% 3%', //margin:'0% 0% 2% 0%'
        //color:'#2c3e50',
        fontFamily:'sans-serif'
    },
    bold:{
        fontSize:13.5,
        fontWeight:600
    }, 
    details:{
        fontWeight:500,
        fontSize:13,
        color:'gray'
    },
    bold1:{
        margin:'5% 0% 0% 0%',
        fontSize:13.5,
        fontWeight:600
    }, 
    price:{
        fontWeight:550,
        fontSize:14,
        fontFamily:'sans-serif',
        //color:'#2c3e50'
    },
    cutprice:{
        padding:'0% 0% 0% 0%',
        fontSize:13
    },
    discount:{
        color: '#27ae60',
        fontSize:15
    },
    billing:{
        display:'flex',
        justifyContent:"center",
        fontWeight:600,
        fontSize:18
    },
    bill:{
        display:'flex',
        fontSize:16,
        fontWeight:600
    },
    billdesc:{
        fontSize:16,
        fontWeight:600,
        marginLeft:'auto',
        margin:'0% 3% 0% 0%',
    },
    pay:{
        display:'flex',
        fontSize:18,
        fontWeight:600
    },
    paydesc:{
        fontSize:18,
        fontWeight:600,
        marginLeft:'auto'
    },
    percentoff:{
        backgroundColor:'#e52c86', 
        color:'#fff', 
        fontSize:12, 
        fontWeight:700, 
        padding:'2% 4% 2% 4%', 
        margin:'0px 0px 0px 20px'
    },
    drawerhead:{
        display:'flex', 
        justifyContent:'center',
        alignItems:'center',
        fontWeight:600, 
        fontFamily:'sans-serif', 
        fontSize:18, 
        color:'#e52c86'
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
        padding:10, 
        display:'flex', 
        flexDirection:'row'
    },
    name:{
        fontWeight:600,
        fontSize:17,
        padding:2,
        color:'#2f3640'
    },
    address:{
        fontSize:15,
        padding:2.5,
        color:'#636e72',
        fontFamily:'sans-serif'
    },
    icon:{
        padding:10,
        display:'flex'
    }
})

export default useStyles