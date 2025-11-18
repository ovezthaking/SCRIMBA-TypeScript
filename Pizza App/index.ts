type Pizza = {
    id: number,
    name: string,
    price: number
}

type Order = {
    id: number,
    pizza: Pizza,
    status: "ordered" | "completed"
}

const menu: Array<Pizza> = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
]

let cashInRegister: number = 100
let nextOrderId: number = 1
const orderQueue: Array<Order> = []

function addNewPizza(pizzaObj: Pizza) {
    menu.push(pizzaObj)
}

function placeOrder(pizzaName: string) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza){
        console.error(`${pizzaName} does not exist in the menu`);
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number) {
    const order = orderQueue.find(order => order.id === orderId)
    if(!order){
        /*
        console.error(`No order with ID:${orderId}`);
        return
        */
       throw new Error(`No order with ID:${orderId}`);
    }
    order.status = "completed"
    return order
}

function getPizzaDetail(identifier: string | number){
    let pizza;
    if(identifier != identifier.toString()){
        pizza = menu.find(pizza => pizza.id == identifier);  
    }
    else if(identifier == identifier.toString()){
        pizza = menu.find(pizza => pizza.name === identifier);
    }
    else{
        throw new Error(`${identifier} not found`);
    }
    if (!pizza){
        throw new Error(`pizza does not exist`);
    }
    return pizza
}

addNewPizza({ id: 5, name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ id: 6, name: "BBQ Chicken", price: 12 })
addNewPizza({ id: 7, name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)\



