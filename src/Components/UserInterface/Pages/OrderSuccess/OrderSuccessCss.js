import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
    },
    paper1:{
        display:'flex',
        borderRadius:0,
        padding:5
    },
    paper2:{
        display:'flex',
        borderRadius:0,
        padding:18
    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    amtfont:{
        fontSize:25, 
        fontWeight:600,
        fontFamily:'sans-serif'
    },
    orderno:{
        fontWeight:600, 
        fontSize:17
    },
    checkorder:{
        fontSize:20, 
        fontWeight:600,
        fontFamily:'sans-serif'
    },
    ordersbox:{
        display:'flex', 
        flexDirection:'column',
        alignItems:'center'
    },
    img:{
        display:'flex', 
        justifyContent:'end', 
        alignItems:'center'
    }, 
    deliveryhead:{
        fontWeight:700,
        fontSize:20,
        fontFamily:'sans-serif'
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
    orderitems:{
        display:'flex',
        flexDirection:'row',
        padding:10,
        fontSize:18, 
        fontWeight:600
    },
    productname:{
        fontWeight:600,
        fontSize:18, 
        margin:'0% 0% 2% 0%'
    },
    bold:{
        fontSize:13.5,
        fontWeight:600
    }, 
    details:{
        fontWeight:400,
        fontSize:13
    },
    productdetails:{
        fontWeight:500,
        fontSize:13,
        color:'gray'
    },
    bold1:{
        margin:'5% 0% 0% 0%',
        fontSize:13.5,
        fontWeight:600
    },
    status:{
        fontSize:13.5,
        fontWeight:600
    },  
    orderstatus:{
        fontWeight:700,
        fontSize:15,
        color:'#e52c86'
    },
    price:{
        fontWeight:550,
        fontSize:16,
        fontFamily:'sans-serif',
        //color:'#2c3e50'
    },
    cutprice:{
        padding:'0% 0% 0% 0%',
        fontSize:13
    },
    discount:{
        color: '#27ae60',
        fontSize:16,
        fontWeight:700
    },
    percentoff:{
        backgroundColor:'#e52c86', 
        color:'#fff', 
        fontSize:13, 
        fontWeight:800, 
        padding:'1.5% 4% 1.5% 4%', 
        margin:'0% 0% 0% 4%'
    },
    end:{
        display:'flex', 
        flexDirection:'column', 
        alignItems:'flex-end'
    },
    amtdesc:{
        fontSize:18,
        fontWeight:700
    },
    cancelhead:{
        fontSize:20,
        color:'#e52c86',
        fontWeight:600
    },
    cancelname:{
        fontWeight:600,
        color:'#2f3640'
    },
    cancelled:{
        fontFamily:'sans-serif', 
        color:'grey', 
        paddingTop:10
    }
})

export default useStyles