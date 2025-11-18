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

let cashInRegister: number = 100;
let nextOrderId: number = 1;
const orderQueue: Array<Order> = [];
let nextPizzaId: number = 1;

const menu: Array<Pizza> = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
]

function addNewPizza(pizzaObj: Pizza): void {
    pizzaObj.id = nextPizzaId++;
    menu.push(pizzaObj);
}

function placeOrder(pizzaName: string): Order | undefined {
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

function completeOrder(orderId: number): Order {
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

export function getPizzaDetail(identifier: string | number): Pizza | undefined{
    if(typeof identifier === "number"){
        return menu.find(pizza => pizza.id == identifier);  
    }
    else if(typeof identifier === "string"){
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase());
    }
    else{
        throw new TypeError(`${identifier} is not a string or a number`);
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)



