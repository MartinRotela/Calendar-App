"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const jwt_validate_1 = require("../middlewares/jwt-validate");
const express_validator_1 = require("express-validator");
const field_validator_1 = require("../middlewares/field-validator");
const events_1 = require("../controllers/events");
const is_date_1 = require("../helpers/is-date");
const router = (0, express_1.Router)();
exports.eventRouter = router;
router.use(jwt_validate_1.validateJWT);
router.get("/", events_1.getEvents);
router.post("/new", [
    (0, express_validator_1.check)("title", "Title can not be empty").not().isEmpty(),
    (0, express_validator_1.check)("start", "Invalid start date").custom(is_date_1.isDate),
    (0, express_validator_1.check)("end", "Invalid end date").custom(is_date_1.isDate),
    field_validator_1.fieldValidator,
], events_1.addEvent);
router.put("/:id", events_1.putEvent);
router.delete("/:id", events_1.deleteEvent);
