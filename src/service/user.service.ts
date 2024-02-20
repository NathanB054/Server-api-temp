import User from '../models/real_users_model';
class UserService {
    static async registerUser(studentid: any,password: any){
        try {
            // ! create user by real_users_model
            

            const createUser = new User({studentid,password,role:'student'});
            return await createUser.save();
        } catch (error) {
            throw error;
        }
    }
}
export default UserService;
export { UserService };