import { messaggeModel } from "../../models/mesagges.model.js";

class MessaggeDao {
    async getAll(){
        return await messaggeModel.find();
    }
    async addMessagge(data){
        return await messaggeModel.create(data);
    }
}

export default new MessaggeDao