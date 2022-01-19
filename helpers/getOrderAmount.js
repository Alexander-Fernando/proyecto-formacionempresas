const getItemById = require("./getItemById");

module.exports = getOrderAmount = async items => {
    let amount = 0;

    for(let item of items){
        const itemDB  = await getItemById(item.id);
        let operacion = itemDB.precioProduc*item.cantidad;
        amount += operacion;
    }

    return amount
}