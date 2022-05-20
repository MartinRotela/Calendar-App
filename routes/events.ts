import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validate";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/field-validator";
import {
    addEvent,
    deleteEvent,
    getEvents,
    putEvent,
} from "../controllers/events";
import { isDate } from "../helpers/is-date";

const router = Router();

router.use(validateJWT);

router.get("/", getEvents);

router.post(
    "/new",
    [
        check("title", "Title can not be empty").not().isEmpty(),
        check("start", "Invalid start date").custom(isDate),
        check("end", "Invalid end date").custom(isDate),
        fieldValidator,
    ],
    addEvent
);

router.put("/:id", putEvent);

router.delete("/:id", deleteEvent);

export { router as eventRouter };
