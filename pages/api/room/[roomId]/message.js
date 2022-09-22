import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    else return res.json({ ok: true, messages: rooms[roomIdx].messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    //read request body
    const text = req.body.text;
    //create new id
    const newId = uuidv4();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    else if (typeof req.body.text !== "string")
      return res.status(404).json({ ok: false, message: "Invalid text input" });
    else {
      const newmess = {
        messageId: newId,
        text: req.body.text,
      };
      rooms[roomIdx].messages.push(newmess);
      writeDB(rooms);
      return res.json({ ok: true, message: newmess });
    }
  }
}
