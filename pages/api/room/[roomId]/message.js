import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    const rmessages = rooms[roomIdx].messages;
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    else {
      const result = rmessages.map((x) => ({
        messageId: x.messageId,
        text: x.text,
      }));
      return res.json({ ok: true, messages: result, idx: roomIdx });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();
  }
}

// export default function todoRoute(req, res) {
//   if (req.method === "GET") {
//     const todolist = readDB();
//     return res.json({ ok: true, todolist: todolist });
//   } else if (req.method === "POST") {
//     const todolist = readDB();
//     const newTodo = {
//       id: uuidv4(),
//       title: req.body.title,
//       completed: req.body.completed,
//     };
//     todolist.push(newTodo);
//     writeDB(todolist);
//     return res.json({ ok: true });
//   }

//   if (req.method === "DELETE") {
//     const todolist = readDB();
//     const id = req.query.id;
//     const todoIdx = todolist.findIndex((x) => x.id === id);
//     if (todoIdx === -1)
//       return res.status(404).json({ ok: false, message: "Todo is not found" });

//     todolist.splice(todoIdx, 1);
//     writeDB(todolist);
//     return res.json({ ok: true });
//   } else if (req.method == "PUT") {
//     const todolist = readDB();
//     const id = req.query.id;
//     const todoIdx = todolist.findIndex((x) => x.id === id);
//     if (todoIdx === -1)
//       return res.status(404).json({ ok: false, message: "Todo is not found" });
//     if (todolist[todoIdx].completed === true)
//       todolist[todoIdx].completed = false;
//     else todolist[todoIdx].completed = true;
//     writeDB(todolist);
//     return res.json({ ok: true, todo: todolist[todoIdx] });
//   }
