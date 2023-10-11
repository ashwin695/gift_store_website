const initialState = {
    cartbag:{},
    customer:{},
    deliveryaddress:{},
    customisation:{}
}

export default function RootReducer(state = initialState, action)
{
    switch(action.type)
    {
        case "Add_Products":
            state.cartbag[action.payload[0]] = action.payload[1]
            console.log("REDUX", state.cartbag);
            return { cartbag: state.cartbag, customer: state.customer, deliveryaddress: state.deliveryaddress, customisation: state.customisation }
        case "Delete_Products":
            delete state.cartbag[action.payload[0]]
            return { cartbag: state.cartbag, customer: state.customer, deliveryaddress: state.deliveryaddress, customisation: state.customisation }
        case "Add_Customer":
            state.customer[action.payload[0]] = action.payload[1]
            return { cartbag: state.cartbag, customer: state.customer, deliveryaddress: state.deliveryaddress, customisation: state.customisation }
        case "Delivery_Address":
            state.deliveryaddress[action.payload[0]] = action.payload[1]
            //console.log("cartbag", state.cartbag );
            //console.log("customer", state.customer );
            //console.log("deliveryaddress", state.deliveryaddress );
            return { cartbag: state.cartbag, customer: state.customer, deliveryaddress: state.deliveryaddress, customisation: state.customisation }
        case "Add_Customisation":
            state.customisation[action.payload[0]] = action.payload[1]
            console.log("REDUX", state.customisation);
            return { cartbag: state.cartbag, customer: state.customer, deliveryaddress: state.deliveryaddress, customisation: state.customisation }
        default:
            return { cartbag: state.cartbag, customer: state.customer, deliveryaddress: state.deliveryaddress, customisation: state.customisation }
    }
}