import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  if (req.method === "DELETE") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
    const messIdx = rooms[roomIdx].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    if (messIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });

    rooms[roomIdx].messages.splice(messIdx, 1);
    writeDB(rooms);
    return res.json({ ok: true });
  }
}
