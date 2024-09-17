import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./db/user_db.js";
import Document from "./models/user_model.js";
dotenv.config({
  path: "./.env",
});

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

connectdb();

app.get("/", (_, res) => {
  res.send("working nicely");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    credentials: true,
  },
});
const defaultValue = {};

io.on("connection", (socket) => {
  // console.log("User Connected", socket.id); for debugging purpose
  socket.on("get-documentad-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("lo
      try {
        if (!documentId) {
          console.error("DocumentId is not defined");
          return;
        }
        const document = await Document.findByIdAndUpdate(
          documentId,
          {
            data,
          },
          {
            new: true,
            upsert: true,
          }
        );
        await document.save();

        socket.to(documentId).emit("receive-changes", document.data);
      } catch (error) {
        console.error("Error saving document:", error.message);
      }
    });
  });

  const findOrCreateDocument = async (id) => {
    if (!id) return;
    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, data: defaultValue });
  };

  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconnected`);
  });
});

server.listen(3000, () => {
  console.log("server started");
});
