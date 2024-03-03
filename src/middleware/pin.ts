import { NextFunction, Request, Response } from "express";
import { suBoard } from "../setup";

export function isPinBeingUsed(req: Request, res: Response, next: NextFunction) {
    const pin: number = Number.parseInt(req.params.p);
    
    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    if (suBoard.PINS.pwm.indexOf(pin) != -1) {
        return res.status(400).json({
            status: 400,
            message: `Pin ${pin}, is used`
        });
    }

    next();
}