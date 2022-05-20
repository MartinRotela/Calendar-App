import { Router } from "express";
import { login, newUser, renewUser } from "../controllers/auth";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/field-validator";
import { validateJWT } from "../middlewares/jwt-validate";

const router = Router();

router.post(
    "/new",
    [
        check("name", "Name can not be empty").not().isEmpty(),
        check("email", "Email can not be empty").isEmail(),
        check(
            "password",
            "Password must contain at least 6 characters"
        ).isLength({ min: 6 }),
        fieldValidator,
    ],
    newUser
);

router.post(
    "/",
    [
        check("email", "Email can not be empty").isEmail(),
        check(
            "password",
            "Password must contain at least 6 characters"
        ).isLength({ min: 6 }),
        fieldValidator,
    ],
    login
);

router.get("/renew", validateJWT, renewUser);

export { router as authRouter };
