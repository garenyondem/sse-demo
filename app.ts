import express, { Request, Response } from "express";
import nanoid from "nanoid";
//@ts-ignore
import randomWords from "random-words";

function eventsHandler(req: Request, res: Response) {
    // Set & send required headers
    res.writeHead(200, {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        Connection: "keep-alive"
    });

    setInterval(() => {
        // emit
        res.write(ctorEventData("ping"));
        res.write(ctorEventData(randomWords(), "random-word"));
        res.write(ctorEventData(nanoid(5), "random-id"));
    }, 200);
}

function ctorEventData(body: string, event?: string) {
    const data = [];
    if (event) {
        data.push(`event: ${event}\n`);
    }
    data.push(`data: ${body}\n\n`);
    return data.join("");
}

const app = express();
app.use("/", express.static("public"));
app.get("/events", eventsHandler);
app.listen(3020);

console.log("localhost:3020");
