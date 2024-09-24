import { Admin } from "../models/admin.model.js";

const loginController = async (req, res) => {
    try{
        const { username , password } = req.body;

        const user = await Admin.findOne({username});
        if(!user){
            return res.status(400).json({error: "Invalid username"});
        }
        const isPasswordCorrect = (password === user.password) ? true: false;
        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid password"});
        }

        return res.status(200).json({
            _id: user._id,
            username: user.username,
        });
    }
    catch(error){
        console.error("Error in Login Controller !!!\n", error);
        return res.status(500).json({
            error: "Internal Server Error !!"
        })
    }
}

const registerController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await Admin.findOne({username});
        if(existingUser){
            return res.status(400).json({error: "User already exist !"});
        }

        if(password.length < 6){
            return res.status(400).json({error: "Password must be atleast 6 character long !"});
        }

        const newUser = new Admin({
            username,
            password
        });

        if(newUser){
            await newUser.save();

            return res.status(200).json({
                _id: newUser._id,
                username: newUser.username
            })
        }
        else{
            return res.status(400).json({
                error: "Invalid User data"
            })
        }
    } catch (error) {
        console.log("Error in Register Controller !\n", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

const logoutController = (req, res) => {
    try {
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in Logout Controller !!!\n", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { loginController, registerController, logoutController };