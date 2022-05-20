"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.putEvent = exports.addEvent = exports.getEvents = void 0;
const Event_1 = require("../models/Event");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield Event_1.Event.find().where("uid").equals(req.body.uid);
    res.status(200).json({
        ok: true,
        events,
    });
});
exports.getEvents = getEvents;
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_1.Event(req.body);
    try {
        const savedEvent = yield event.save();
        return res.status(200).json({
            ok: true,
            event: savedEvent,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.addEvent = addEvent;
const putEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        const event = Event_1.Event.findById(eventId);
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: "The event does not exist",
            });
        }
        const newEvent = yield Event_1.Event.findByIdAndUpdate(eventId, req.body, {
            new: true,
        });
        res.status(200).json({
            ok: true,
            newEvent,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.putEvent = putEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        const event = Event_1.Event.findById(eventId);
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: "The event does not exist",
            });
        }
        const newEvent = yield Event_1.Event.findByIdAndDelete(eventId);
        res.status(200).json({
            ok: true,
            newEvent,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.deleteEvent = deleteEvent;
