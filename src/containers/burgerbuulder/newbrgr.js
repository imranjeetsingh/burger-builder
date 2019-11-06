// import React, {Component} from 'react';
// import {connect} from 'react-redux';

// import Aux from '../../hoc/Auxiliary/Auxiliary';
// import Burger from '../../components/burger/burger';
// import BuildControls from '../../components/burger/buildscontrols/buildscontrols';
// import Modal from '../../components/UI/Modal/Modal';
// import OrderSummary from '../../components/burger/Ordersummary/Ordersummary';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Axios from '../../axios-order';
// import ErrorHandler from '../../hoc/WithError/withError';
// import * as ActionType from '../../store/actions';

// const INGREDIENTS_PRICES = {
//     salad : 0.5,
//     cheese : 1,
//     meat : 10,
//     bacon : 3,
// }

// class BurgerBuilder extends Component{
//     state = {
//         totalPrice : 5,
//         purchasable : false,
//         purchasing : false,
//         loading : false,
//         error : false
//     }

//     componentDidMount(){
//         // Axios.get("https://react-burger-app-ab541.firebaseio.com/ingredients.json")
//         // .then(response =>{
//         //     this.setState({ingredients : response.data})
//         // }).catch(error =>{
//         //     this.setState({error:true})
//         // })
//     }

//     purchasehandler = () =>{
//         this.setState({purchasing : true});
//     }

//     purchaseCancelhandler = () =>{
//         this.setState({purchasing : false})
//     }

//     purchaseContinuehandler = () =>{
//         // alert("Have your Burger!!!")
        
//         const queryParams =[]
//         for(let i in this.props.ings){
//             queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.props.ings[i]))
//         }
//         queryParams.push('price='+this.state.totalPrice);
//         const queryString = queryParams.join('&');
//         this.props.history.push({
//             pathname: '/checkout',
//             search : '?'+queryString

//         })
//         // this.props.history.push("/checkout");
//     }

//     updatePurchaseable (ingredients) {
//         const sum = Object.keys(ingredients)
//                     .map(igKey =>{
//                         return ingredients[igKey]
//                     }).reduce((sum,el) =>{
//                         return sum+el
//                     },0)
//         this.setState({purchasable : sum>0});
//         // console.log(this.state.purchasable,sum)
//     }

//     addIngredientsHandler = (type) => {
//         const updatedCount = this.props.ings[type]+1;
//         const updatedIngredients = {
//             ...this.props.ings
//         }
//         updatedIngredients[type] = updatedCount;
//         const new_price = this.state.totalPrice+INGREDIENTS_PRICES[type];
//         this.setState(
//             {
//                 totalPrice: new_price, ingredients : updatedIngredients
//             }
//         )
//         this.updatePurchaseable(updatedIngredients);    
//     }

//     removeIngredientsHandler = (type) => {
//         const updatedCount = this.props.ings[type]-1;
//         const updatedIngredients = {
//                 ...this.props.ings
//             }
//         updatedIngredients[type] = updatedCount;
//         const new_price = this.state.totalPrice-INGREDIENTS_PRICES[type];
//         this.setState(
//             {
//                 totalPrice: new_price, ingredients : updatedIngredients
//             }
//         )
//         this.updatePurchaseable(updatedIngredients);
//     }

//     render(){
//         // console.log(this.props.ings)
//         const disableInfo = {
//             ...this.props.ings
//         }
//         for (let key in disableInfo){
//             disableInfo[key]=disableInfo[key]<=0;
//         }
//         let orderSummary =null;
        
//         let burger = this.state.error ? <p>Ingredients can't be loaded from database.</p> : <Spinner/>
//         if (this.props.ings) {
//             burger = (
//                 <Aux>
//                     <Burger ingredients={this.props.ings} />
//                     <BuildControls 
//                         ingredientsAdded={this.props.onIngredientAdded}
//                         ingredientsRemove={this.props.onIngredientRemoved}
//                         disabled={disableInfo}
//                         totalPrice={this.state.totalPrice}
//                         ordered={this.purchasehandler}
//                         purchaseable={this.state.purchasable} /></Aux>)
//             orderSummary = <OrderSummary ingredients={this.props.ings}
//                 purchaseCanceled={this.purchaseCancelhandler}
//                 purchaseContinued={this.purchaseContinuehandler}
//                 totalPrice={this.state.totalPrice} />
//             if (this.state.loading) {
//                 orderSummary = <Spinner />
//             }
//         }
       
//         return(
//             <Aux>
//                 <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelhandler}>
//                     {orderSummary}
//                 </Modal>
//                 {burger}
//             </Aux>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         ings : state.ingredients
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded : (ingName) => dispatch({type:ActionType.ADD_INGREDIENT,ingredientsName:ingName}),
//         onIngredientRemoved : (ingName) => dispatch({type:ActionType.REMOVE_INGREDIENT,ingredientsName:ingName})
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(BurgerBuilder,Axios));