import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import useStyles from "./DisplayMainBannersCss";
import { getData, ServerURL } from "../../APIServices/FetchNodeServices";

export default function DisplayMainBanners(){
    const classes = useStyles()
    const [bannerList, setBannerList] = useState([])

    useEffect(function(){
        fetchAllBannerData()
    },[])

    const fetchAllBannerData = async() => {
        var result = await getData('banner/displayallbanners')
        setBannerList(result.result)
    }

    function displayTable(){
        return(
            <MaterialTable style={{ padding: '0 5px 0 5px'}}
                title="LIST OF MAIN BANNERS"
                columns={[
                    { title: 'Banner Id', field: 'mainbannerid' },
                    { title: 'Image', render: (rowData) => <img alt="pic" src={`${ServerURL}/images/${rowData.bannerimage}`} width="100" height="50" /> },
                ]}
                data={bannerList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Banner',
                        //onClick: (event, rowData) => handleOpen(rowData)
                    }
                ]}
                options={{
                    headerStyle: {
                      backgroundColor: '#e52c86',
                      color: '#FFF',
                      padding: 10
                    },
                    rowStyle: {
                        color:'#9E1357',
                        fontSize: "1.0em",
                    },
                }}
            />
        )
    }

    return(
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displayTable()}
            </div>
        </div>
    )
}