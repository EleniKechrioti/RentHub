// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: String,
//     password: String,
//     // cart:{
//     //     cartItems:[
//     //         {
//     //             title:String,
//     //             cost:Number,
//     //             quantity:Number,
//     //             image:String
//     //         }
//     //     ],
//     //     totalcost:Number
//     // }


    
// });

// const user = mongoose.model('user',userSchema);


// module.exports = user;


exports.User = class {
    /**
     * Constructs an instance of the user class
     * @param {string} username the user's name
     * @param {string} password the user's password
     */
    constructor(username, password){
        this.username=username;
        this.password=password;
        this.sessionId=undefined;
        this.favorites=[];
    }

    /**
     * gets a user's cart size
     * @returns a JS object that contains the user's cart size
     */
    getFavoritesSize(){
        return {'size': this.favorites.length};
    }

    /**
     * Empties the user's favorites list, called by the server every time a new sessionId is assigned to a user
     */
    emptyFavorites(){
        this.favorites=[];
    }

    /**
     * Adds item to user's favorites
     * @param {Object} listing the listing to be added to the favorites
     */
    addTofavorites(listing){
        const index = this.favorites.findIndex(object => object.product.id === listing.product.id);
        if(index === -1){
            this.favorites.push(item);
        }
    }
}