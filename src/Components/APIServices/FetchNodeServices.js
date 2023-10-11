import axios from "axios"
const ServerURL = "http://localhost:5000"

//used when submitting data with image and queries contain parameters
const postData = async(url,body,isFile=false)=>{
    try{
        const headers={
            headers:{"content-type":isFile?"multipart/form-data":"application/json"}
        }
    
        var response= await axios.post(`${ServerURL}/${url}`,body,headers)
        var result=await response.data 
        return(result)
    }
    catch(error)
    {   
        console.log("postData",error)
        let err = await error.response.data.msg
        //return err
        return(false)
    }
     
    }

//to read the all data
const getData = async(url) => {
    try
    {
        var response = await fetch(`${ServerURL}/${url}`)
        var result = await response.json()
        return result
    }
    catch(e)
    {   
        console.log("getData",e)
        return null
    }
}

const getToken = async(url, body) => {
    try
    {
        var response = await fetch(`${ServerURL}/${url}/getToken`, {
            headers: { 'apibody': body }
        })
        var result = await response.json()
        return(result)
    }
    catch(e)
    {
        return null
    }
}

// check a token weather it is valid or not
const isValidAuth = async(url, token, raw) => {
    try
    {   
        //var token = await getToken(url, body)
        var response = await fetch(`${ServerURL}/${url}/isUserAuth`, {
            //headers: {'authorization': localStorage.getItem("token")}
            headers: { 'authorization': token, 'raw': raw }
        })
        var result = await response.json()
        return result
    }
    catch(e)
    {
        return null
    }
}

const logout = async(url, body, raw) => {
    try
    {   
        var token = await getToken(url, body)
        //alert("my",token)
        var response = await fetch(`${ServerURL}/${url}/logout`, {
            //headers: {'authorization': localStorage.getItem("token")}
            headers: { 'authorization': token, 'logoutapi': body, 'raw': raw }
        })
        var result = await response.json()
        return result
    }
    catch(e)
    {
        return null
    }
}

export { ServerURL, getData, postData, isValidAuth, logout, getToken }