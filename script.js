// const searchBtn = document.querySelector(".sendBtn");
// const inputSec = document.querySelector("#input");
// const chats = document.querySelector(".chatSec");




// const sendMsg = () => {

//     if (inputSec.value.trim() === "") {
//         return;
//     }

//     const para = document.createElement("p");

//     para.textContent = inputSec.value;

//     chats.appendChild(para);

//     para.classList.add("userMsg");

//     const message = inputSec.value;

//     localStorage.setItem("userMessage",message);
//     console.log(localStorage.getItem("userMessage"));

//     inputSec.value = "";

//     return message;

  
// };



// const botMsg = (message) => {

//     const para = document.createElement("p");

//     para.innerHTML = marked.parse(message);

//     para.classList.add("botMsg");

//     chats.appendChild(para);

//     chats.scrollTop = chats.scrollHeight;
// };




// const apiDelay = () => {

//     const thinking = document.createElement("p");

//     thinking.textContent = "Thinking....";

//     thinking.classList.add("apiDelay");

//     chats.appendChild(thinking);

//     chats.scrollTop = chats.scrollHeight;

//     return thinking;
// };




// const handleMessage = async () => {

//     const message = sendMsg();

//     if (!message) {
//         return;
//     }

//     const delay = apiDelay();

//     try {

//         const response = await chatApi(message);

//         delay.remove();

//         botMsg(response);

//     } catch (error) {

//         delay.remove();

//         botMsg("Something went wrong. Please try again.");

      
//     }
// };




// searchBtn.addEventListener("click", handleMessage);




// inputSec.addEventListener("keydown", (e) => {

//     if (e.key === "Enter") {

//         handleMessage();

//     }

// });




// const chatApi = async (message) => {

//     try {

//         const api = await fetch(
//             "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json",
//                      "x-goog-api-key" :"AQ.Ab8RN6IQB6XO2LuGxqsZ1z5AetvrUmWkQdGd9U4BQZghNPgVOA"
                    
//                 },

//                 body: JSON.stringify({
//                  systemInstruction: {
//                  parts:[
//                      {
//                       text:`You are a helpful and friendly AI chatbot.

//                       Rules:
//                         - Give concise and direct answers.
//                         - Use simple English.
//                         - if anyone ask you who made you or who is your owner then tell him "Gurvesh Dhomne is made".
//                         - Answer naturally like a normal chatbot.
//                        `
//                      }
//                  ]
//                 },

//                    contents: [{
//                    parts: [{
//                 text:message
//             }
//         ]
//     }
// ]
//                 })
//             }
//         );

//         if (!api.ok) {

       

//             throw new Error(`HTTP Error: ${api.status}`);

    
//         }

//         const response = await api.json();

        

//         return response.candidates[0].content.parts[0].text;

//     } catch (error) {

//         throw error;
//     }
// };




// const themeBtn = document.querySelector(".themeBtn");

// themeBtn.addEventListener("click", () => {

//     document.body.classList.toggle("lightMode");


//     const icon = themeBtn.querySelector("i");


//     if (document.body.classList.contains("lightMode")) {

//         icon.classList.remove("fa-moon");

//         icon.classList.add("fa-sun");

//     } else {

//         icon.classList.remove("fa-sun");

//         icon.classList.add("fa-moon");

//     }

// });





// const newChatBtn = document.querySelector(".newChat");


// newChatBtn.addEventListener("click", () => {

//     chats.innerHTML = "";

//     inputSec.value = "";

//     inputSec.focus();

// });





// const promptBtns =
//     document.querySelectorAll(".promptBtn");


// promptBtns.forEach((button) => {

//     button.addEventListener("click", () => {

//         inputSec.value = button.textContent.trim();

//         inputSec.focus();

//     });

// });


// const saveMessage = localStorage.getItem("userMessage");
// console.log(saveMessage);
// if (saveMessage) {

//     const para = document.createElement("p");

//     para.textContent = saveMessage;

//     para.classList.add("userMsg");

//     chats.appendChild(para);
// }

// let messages =[];
// messages.push("Hello");
// messages.push("How Are You");

// localStorage.setItem("messages",JSON.stringify(messages));

// console.log(messages);

// localStorage.getItem("messages");


// let savedmsg = localStorage.getItem("messages");
// const msg = JSON.parse(savedmsg);

// const message = inputSec.value;
// let messages = JSON.parse(localStorage.getItem("messages")) || [];
// messages.push(message);

// localStorage.setItem("messages", JSON.stringify(messages));




const searchBtn = document.querySelector(".sendBtn");
const inputSec = document.querySelector("#input");
const chats = document.querySelector(".chatSec");

const sendMsg = () => {

    if (inputSec.value.trim() === "") {
        return;
    }

    const message = inputSec.value.trim();

    const para = document.createElement("p");

    para.textContent = message;
    para.classList.add("userMsg");

    chats.appendChild(para);

    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.push({
        role: "user",
        content: message
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    inputSec.value = "";

    chats.scrollTop = chats.scrollHeight;

    return message;
};

const botMsg = (message) => {

    const para = document.createElement("p");

    para.innerHTML = marked.parse(message);

    para.classList.add("botMsg");

    chats.appendChild(para);

    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.push({
        role: "bot",
        content: message
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    chats.scrollTop = chats.scrollHeight;
};

const apiDelay = () => {

    const thinking = document.createElement("p");

    thinking.textContent = "Thinking....";

    thinking.classList.add("apiDelay");

    chats.appendChild(thinking);

    chats.scrollTop = chats.scrollHeight;

    return thinking;
};

const handleMessage = async () => {

    const message = sendMsg();

    if (!message) {
        return;
    }

    const delay = apiDelay();

    try {

        const response = await chatApi(message);

        delay.remove();

        botMsg(response);

    } catch (error) {

        delay.remove();

        botMsg("Something went wrong. Please try again.");

        console.log(error);
    }
};

searchBtn.addEventListener("click", handleMessage);

inputSec.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        handleMessage();

    }

});

const chatApi = async (message) => {

    try {

        const api = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": "My_Api_Key"
                },

                body: JSON.stringify({

                    systemInstruction: {
                        parts: [
                            {
                                text: `You are a helpful and friendly AI chatbot.

Rules:
- Give concise and direct answers.
- Use simple English.
- If anyone asks you who made you or who is your owner then tell him "Gurvesh Dhomne is made".
- Answer naturally like a normal chatbot.
- Use Markdown when formatting helps.
- Use **bold** for important words.
- Use headings and lists when useful.`
                            }
                        ]
                    },

                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if (!api.ok) {

            const errorData = await api.json();

            console.log("Gemini Error:", errorData);

            throw new Error(`HTTP Error: ${api.status}`);
        }

        const response = await api.json();

        return response.candidates[0].content.parts[0].text;

    } catch (error) {

        console.log(error);

        throw error;
    }
};

const themeBtn = document.querySelector(".themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("lightMode");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("lightMode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }
});

const newChatBtn = document.querySelector(".newChat");

newChatBtn.addEventListener("click", () => {

    chats.innerHTML = "";

    inputSec.value = "";

    localStorage.removeItem("messages");

    inputSec.focus();

});

const promptBtns = document.querySelectorAll(".promptBtn");

promptBtns.forEach((button) => {

    button.addEventListener("click", () => {

        inputSec.value = button.textContent.trim();

        inputSec.focus();

    });

});

const loadMessages = () => {

    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.forEach((message) => {

        const para = document.createElement("p");

        if (message.role === "user") {

            para.textContent = message.content;

            para.classList.add("userMsg");

        } else if (message.role === "bot") {

            para.innerHTML = marked.parse(message.content);

            para.classList.add("botMsg");

        }

        chats.appendChild(para);

    });

    chats.scrollTop = chats.scrollHeight;
};

loadMessages();