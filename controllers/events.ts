import { Request, Response } from "express";
import { Event } from "../models/Event";

export const getEvents = async (req: Request, res: Response) => {
    const events = await Event.find().where("uid").equals(req.body.uid);
    res.status(200).json({
        ok: true,
        events,
    });
};

export const addEvent = async (req: Request, res: Response) => {
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save();

        return res.status(200).json({
            ok: true,
            event: savedEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error",
        });
    }
};

export const putEvent = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    try {
        const event = Event.findById(eventId);
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: "The event does not exist",
            });
        }
        const newEvent = await Event.findByIdAndUpdate(eventId, req.body, {
            new: true,
        });
        res.status(200).json({
            ok: true,
            newEvent,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error",
        });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    try {
        const event = Event.findById(eventId);
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: "The event does not exist",
            });
        }
        const newEvent = await Event.findByIdAndDelete(eventId);
        res.status(200).json({
            ok: true,
            newEvent,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error",
        });
    }
};
