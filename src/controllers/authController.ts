import UserService from "../service/user.service";

exports.register = async (
  req: { body: { studentid: any; password: any } },
  res: {
    [x: string]: any; json: (arg0: { status: boolean; success: string }) => void 
},
  next: any
) => {
  try {
    // ! request to client
    const { studentid, password } = req.body;

    if (!studentid || !password) {
      return res.status(400).json({ error: "studentid and password are required." });
    }
    // ! use function in UserService
    const successRes = await UserService.registerUser(studentid, password);
    res.json({ status: true, success: "User Registered Successfully" });
  } catch (error) {
    throw error;
    return res.status(500).json({ error: "Internal server error." });
  }
};
