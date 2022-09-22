import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  if (req.method === "DELETE") {
    const rooms = readDB();
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
    mess = rooms[roomIdx].messages;
    const messIdx = mess.findIndex((x) => x.messageId === messageId);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    else if (messIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    else {
      mess.splice(messIdx, 1);
      writeDB(rooms);
      return res.json({ ok: true });
    }
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
