async function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Show user message
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = message;

    chatBox.appendChild(userMessage);

    input.value = "";

    // Temporary bot response
    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = "Thinking...";

    chatBox.appendChild(botMessage);

    try {

        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        botMessage.textContent = data.reply || "Sorry, I couldn't understand.";

    } catch (error) {

        botMessage.textContent =
            "❌ Backend connection failed. Please check whether the server is running.";

        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Press Enter to send
document.getElementById("userInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});