import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Textarea } from "./components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Input } from "./components/ui/input";

const socket = io("http://192.168.29.68:3000");

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingContent, setExistingContent] = useState("");

  useEffect(() => {
    socket.on("documentUpdate", (updatedDocument) => {
      if (updatedDocument.title === title) {
        setContent(updatedDocument.content);
        setExistingContent(updatedDocument.content);
      }
    });

    return () => {
      socket.off("documentUpdate");
    };
  }, [title]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit("updateDocument", { title, content: newContent });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title) return;

    try {
      const response = await axios.post("http://192.168.29.68:3000/documents", {
        title,
      });
      setTitle(response.data.title);
      setExistingContent(response.data.content || "");
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div className="dark:bg-premiumDark-900 dark:text-white min-h-screen">
      <button
        onClick={() => {
          document.documentElement.classList.toggle("dark");
        }}
        className="dark:bg-premiumDark-700 dark:text-white p-2 m-4 rounded"
      >
        Dark Mode
      </button>
      <Card className="dark:bg-premiumDark-800 dark:text-white">
        <CardHeader className="flex items-center justify-between dark:bg-premiumDark-700 dark:text-white">
          <div
            style={{
              display: "flex",
              justifyItems: "start",
              alignItems: "start",
              width: "30%",
            }}
          >
            <Input
              placeholder="Document Title"
              value={title}
              onChange={handleTitleChange}
              className="dark:bg-premiumDark-600 dark:text-white p-2 rounded"
            />
            <button
              onClick={handleSubmit}
              className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
          <div className="w-1/2">
            <CardTitle className="dark:text-white">Doc Editor</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="dark:bg-premiumDark-700 dark:text-white">
          <Textarea
            onChange={handleContentChange}
            className="dark:bg-premiumDark-600 dark:text-white"
            value={(existingContent && existingContent) || (content && content)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
