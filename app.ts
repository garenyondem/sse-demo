import express, { Request, Response } from "express";
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
        res.write(`data: ${randomWords()}\n\n`);
    }, 200);
}

const app = express();
app.use("/", express.static("public"));
app.get("/events", eventsHandler);
app.listen(3020);

console.log("localhost:3020");
