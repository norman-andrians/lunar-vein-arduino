import { Request, Response } from "express";
import { board } from "../setup";
import { ChannelPins, digitalValue, voltage } from ".";
import { Led } from "johnny-five";


export async function readLed (req: Request, res: Response) {
    const { p } = req.params;
    const pin: number = Number.parseInt(p);

    const pinState: digitalValue = board.pins[pin].value == 1 ? 'ON' : 'OFF';

    return res.status(200).json({
        status: 200,
        pin_state: {
            [pin]: pinState
        }
    });
}

export async function writeLed (req: Request, res: Response) {
    const { p, a } = req.params;
    const act: string = a.toLocaleLowerCase();
    const pin: number = Number.parseInt(p);

    let state: digitalValue;
    let volt: voltage;

    try {
        switch (act) {
            case 'on':
                state = 'ON';
                volt = 1;
                console.log(`${req.hostname} | ${pin} | LED: ${state}`);
                break;
            case 'off':
                state = 'OFF';
                volt = 0;
                console.log(`${req.hostname} | ${pin} | LED: ${state}`);
                break;
            default:
                console.log(`${req.hostname} | ${pin} | LED: INVALID ACT`);
                return res.status(400).json({
                    status: 400,
                    message: `Invalid act ${act}`
                });
        }

        board.digitalWrite(pin, volt);

        res.status(200).json({
            status: 200,
            message: `Success changed pin ${pin} to state ${state}`
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};


export async function readRgbLed (req: Request, res: Response) {
    const r: number = Number.parseInt(req.body.r);
    const g: number = Number.parseInt(req.body.g);
    const b: number = Number.parseInt(req.body.b);

    const rgbPins: number[] = Object.values({ r, g, b });

    for (let i = 0; i < rgbPins.length; i++) {
        const pin = rgbPins[i];
        if (Number.isNaN(pin)) {
            return res.status(400).json({
                status: 400,
                message: `Invalid pin ${pin} param, it should be integer`
            });
        }
    }

    const led = new Led.RGB({
        pins: {
            red: r,
            green: g,
            blue: b
        },
        isAnode: true
    })

    led.red = new Led(r);
    led.green = new Led(g);
    led.blue = new Led(b);

    return res.status(200).json({
        status: 200,
        pin_state: {
            [r]: led.red.isOn,
            [g]: led.green.isOn,
            [b]: led.blue.isOn
        }
    });
}

export async function writeRgbLed (req: Request, res: Response) {
    const r: ChannelPins = req.body.r;
    const g: ChannelPins = req.body.g;
    const b: ChannelPins = req.body.b;

    const rgbLeds: ChannelPins[] = Object.values({ r, g, b });
    
    try {
        rgbLeds.forEach(led => {
            if (Number.isNaN(led.pin)) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid pin ${led.pin} param, it should be integer`
                });
            }
        })

        const led = new Led.RGB({
            pins: {
                red: r.pin,
                green: g.pin,
                blue: b.pin
            },
            isAnode: true
        })

        led.red = new Led(r.pin);
        led.green = new Led(g.pin);
        led.blue = new Led(b.pin);

        if (r.value == true) led.red.on(); else led.red.off();
        if (g.value == true) led.green.on(); else led.green.off();
        if (b.value == true) led.blue.on(); else led.blue.off();

        const pins: string = rgbLeds.map(c => c.pin.toString()).join(", ");
        const values: string = rgbLeds.map(c => `${c.value}`).join(", ");

        res.status(200).json({
            status: 200,
            message: `Success changed pins ${pins} to state ${values}`
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};