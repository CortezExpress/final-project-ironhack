const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
        name: { 
            type: String 
        },
        price: {
            type: Number
        },
        description: {
            type: String
          },
        image: { 
            type: String 
        },
        cart: { 
            type: Schema.Types.ObjectId,
            ref: 'ShoppingCart'
        } 
    },
    {
        timestamps: true
    }
);

const Accessory =mongoose.model('Accessory', AccessorySchema);

module.exports = Accessory;
