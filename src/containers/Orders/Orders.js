import React, {Component} from 'react';

import Order from '../../components/Order/order';
import Axios from '../../axios-order';
import WithErrorHandler from '../../hoc/WithError/withError';

class Orders extends Component{

    state ={
        orders : [],
        loading : true
    }

    componentDidMount(){
        Axios.get("/order.json")
        .then(res => {
            const fetchedData = []
            for(let key in res.data){
                    fetchedData.push({
                        ...res.data[key],
                        id:key
                    })
            }
            console.log(fetchedData)
            this.setState({loading:false,orders:fetchedData})
        })
        .catch(err =>{
            this.setState({loading:false})
        })
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price}
                    />
                ))}
            </div>
        )
    }
}

export default WithErrorHandler(Orders, Axios);