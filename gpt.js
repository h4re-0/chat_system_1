const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// first GPT messages (prompts)
const firstMessage = [
    {
        "role": "system",
        "content": `
user inputs the theme elements that user want to include in a illustration.
assistant should generate the elements of a attractive illustration associated with user input.

- assistant's reply must be always English words or short phrases.
- Please do not generate too graphic elements.

These are nessesary element:
quality, composition, theme, person(people), physical features, pose, facial expression, lighting, clothing, hairstyle, background

example:
----
[user]
theme: fairy
----
[assistant]
beautiful, full body, fairy, petite, elf ear, fairy wings, floating, serene, soft glow, flowing gown, ethereal blonde hair, enchanted forest
----
`
    }, {
        "role": "user",
        "content": "theme: school uniform"
    }, {
        "role": "assistant",
        "content": "high quality, from above, school, girl, medium breasts, plaid skirt, standing confidently, cheerful, natural sunlight, uniform blouse, braided pigtails, school hallway"
    }, {
        "role": "user",
        "content": "theme: 女の子"
    }, {
        "role": "assistant",
        "content": "masterpiece, best-quality, from side, girl, large breasts, leaning forward, smile, blush, sunlight, t-shirt, black long hair, outdoor"
    }
];

async function sendQuery(sendTheme) {
    const sendMessage = firstMessage;
    sendMessage.push({
        "role": "user",
        "content": `theme: ${sendTheme}`
    });

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: sendMessage,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    return response.choices[0].message.content;
}

module.exports = {
    sendQuery: sendQuery
}