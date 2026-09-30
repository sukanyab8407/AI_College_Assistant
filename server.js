const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI College Assistant Backend is running"
    });
});

// Chat route
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.json({
                reply: "Please enter a question."
            });
        }

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.2",
                prompt: `You are an AI College Assistant.
Help students with college-related questions such as courses, subjects,
admissions, exams, projects, programming and career guidance.

Student question: ${userMessage}`,
                stream: false
            })
        });

        const data = await response.json();

        if (data.response) {
            res.json({
                reply: data.response
            });
        } else {
            res.json({
                reply: "Sorry, I could not generate a response."
            });
        }

    } catch (error) {
        console.error("Ollama Error:", error);

        res.status(500).json({
            reply: "AI server connection failed. Please check whether Ollama is running."
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});