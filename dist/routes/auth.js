"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const field_validator_1 = require("../middlewares/field-validator");
const jwt_validate_1 = require("../middlewares/jwt-validate");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post("/new", [
    (0, express_validator_1.check)("name", "Name can not be empty").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email can not be empty").isEmail(),
    (0, express_validator_1.check)("password", "Password must contain at least 6 characters").isLength({ min: 6 }),
    field_validator_1.fieldValidator,
], auth_1.newUser);
router.post("/", [
    (0, express_validator_1.check)("email", "Email can not be empty").isEmail(),
    (0, express_validator_1.check)("password", "Password must contain at least 6 characters").isLength({ min: 6 }),
    field_validator_1.fieldValidator,
], auth_1.login);
router.get("/renew", jwt_validate_1.validateJWT, auth_1.renewUser);
