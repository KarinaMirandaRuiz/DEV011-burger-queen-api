const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ---------- Define schema a of orders ---------- //
const odersSchema = new Schema({
  userId:{type:Schema.Types.ObjectId, ref:'users', required:true}, // Id
  client:String, // Clienta para quien se creó la orden
  products:[
    {
      qty: Number, // Cantidad
      product: {
        productId: {type:Schema.Types.ObjectId, ref: 'products'},
        name: String,
        price: Number,
        image: String, // URL a la imagen
        type: String, // Tipo/Categoría
        dateEntry: String // Fecha de creación
      }
    }
  ], // 
  status:{type:Schema.Types.ObjectId, ref:'statuses'}, // Estado de la orden [ pending, canceled, delivering, delivered ]
  dateEntry:String, // Fecha de creación
  dateProcessed:String // Fecha de cambio de `status` a `delivered`
});
const Order = mongoose.model('Order', odersSchema);

mongoose.connect('mongodb://127.0.0.1:27017/test');

module.exports = Order;


// Connect to MongoDB

/* //  Model based on the schema
const Order = mongoose.model('Order', orders);

// Example usage
const newOrder = new Order({
  name: 'John Doe',
  age: 25,
  email: 'john@example.com'
});

// Save the new person to the database
newOrder.save()
  .then(result => {
    console.log('Saved to MongoDB:', result);
  })
  .catch(error => {
    console.error('Error saving to MongoDB:', error);
  }); */