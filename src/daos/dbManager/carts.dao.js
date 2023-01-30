import { cartModel } from "../../models/carts.model.js";

class CartDao {
    async getAll(){
        return await cartModel.find()
    }
    async create(data){
        return await cartModel.create(data);
    }
    async delete(id){
        return await cartModel.findByIdAndDelete(id);
    }
}

export default new CartDao