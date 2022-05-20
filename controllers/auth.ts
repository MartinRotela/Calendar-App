import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { JWTGen } from "../helpers/jwt-gen";

export const newUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "There is another user with this email",
            });
        }

        user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await JWTGen(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Incorrect username or password",
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Incorrect username or password",
            });
        }
        const token = await JWTGen(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
};

export const renewUser = async (req: Request, res: Response) => {
    const { name, uid } = req.body;

    //JWT gen
    const token = await JWTGen(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token,
    });
};
