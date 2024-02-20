import mongoose, { Collection } from "mongoose";
import bcrypt from 'bcrypt';
interface Users {
    studentid: string;
    password: string;
    role: string;
  }

const usersSchema = new mongoose.Schema(
    {
      studentid: { type: String, required: true, lowercase:true },
      password: { type: String, required: true },
      role: { type: String, required: true,default: 'student' },
    },
    { collection: "users" }
  );

usersSchema.pre('save',async function () {
    try {
        var _user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(_user.password,salt);

        _user.password = hashpass;
    } catch (error) {
        throw error;
    }
})

  
interface UsersDocument extends mongoose.Document {
    studentid: string;
    password: string;
    role: string;
    set(x: Users): this; // Define `set` as an instance method
  }

const User = mongoose.model<UsersDocument>("User", usersSchema);

// Extend the model with the `set` method
User.prototype.set = function (x: Users) {
    this.studentid = x.studentid;
    this.password = x.password;
    this.role = x.role;
    return this.save(); // Save the document to the database
  };

  // Usage:
const user = new User();
//todo.set({ title: "Some title", description: "Some description" });
export default User;
export { User };
