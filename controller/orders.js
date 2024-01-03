const Order = require('../models/orders');

module.exports = {
  getOrders: async(page,limit) => {
    try {
      const respOrdersGet = await Order.find().limit(limit).skip((page - 1) * limit);

      const baseUrl = '/orders';
      const count = await Order.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const linkHeader = [
        `<${baseUrl}?page=1&limit=${limit}>; rel="first"`,
        page > 1 ? `<${baseUrl}?page=${page - 1}&limit=${limit}; rel="prev"` : `<${baseUrl}?page=${page}&limit=${limit}>; rel="prev"`,
        page < totalPages ? `<${baseUrl}?page=${page - -1}&limit=${limit}>; rel="next"`:`<${baseUrl}?page=${page}&limit=${limit}>; rel="next"`,
        `<${baseUrl}?page=${totalPages}&limit=${limit}>; rel="last"`,
      ].join(', ');

      return {respOrdersGet,linkHeader};
    } catch(error){
      // console.log('Error al buscar todas las ordenes:', error);
      throw error;
    }
  },

  getOrderByID: async(idOrderToGet) => {
    try {
      const orderByID = await Order.findById({"_id":idOrderToGet});
      // Temp coment console.log('c/o getOrderByID Orden en la collección: ', orderByID);
      return orderByID;
    } catch(error){
      // Temp coment console.log('Error al buscar orden por ID: ', error);
      return null;
    }
  },
  postOrder: async(newOrderData) =>{
    try {
      newOrderData.dateEntry = Date.now()
      return await Order(newOrderData).save()
    } catch(error){
      throw error;
    }
  },

  patchOrder: async(idOrderToUpdate, newOrderToUpdate)=>{
    try{
      const orderToUpdate = await module.exports.getOrderByID(idOrderToUpdate);
      // Temp coment console.log('c/o patchOrder: ',orderToUpdate);
      // Temp coment console.log('c/o newOrderToUpdate: ',newOrderToUpdate);
      if(orderToUpdate){
        newOrderToUpdate.dateProcessed = Date.now();
        const maya = await Order.findByIdAndUpdate({'_id': idOrderToUpdate},newOrderToUpdate)
        // Temp coment console.log('maya: ',maya);
        return await module.exports.getOrderByID(idOrderToUpdate)
      } else {
        return undefined
      }
    }catch(error){
      throw error;
    }
  },
  deleteOrder: async(idOrderToDelete) => {
    try {
      const orderToDelete = await module.exports.getOrderByID(idOrderToDelete);
      // Temp coment console.log('c/o deleteOrder orderToDelete: ', orderToDelete);

      if (orderToDelete){
        await Order.findOneAndDelete({ "_id": idOrderToDelete });
        const orderDeleted = await module.exports.getOrderByID(idOrderToDelete);
        // Temp coment console.log('c/o deleteOrder orderDeleted: ', orderDeleted);
        return (!orderDeleted ? orderToDelete: 'Error al borrar la orden')
      }else{
        return undefined;
      }
    }catch(error){
      throw new Error(`No se pudo borrar la orden con ID: ${idOrderToDelete}`);
    }
  }
}