const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeatSchema = new Schema({
        name: { 
            type: String 
        },
        price: {
            type: Number
        },
        type: {
            type: String,
            enum : ['Poultry', 'Beef', 'Lamb'],
            default : ''
          },
        image: { 
            type: String 
        },
        shoppingCart: { 
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'ShoppingCart'
        } 
    },
    {
        timestamps: true
    }
);

const Meat =mongoose.model('Meat', MeatSchema);

module.exports = Meat;
