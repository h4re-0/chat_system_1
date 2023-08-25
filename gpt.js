const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const firstMessage = [
    {
        "role": "system",
        "content": `
user sends the theme elements that user want to include in the illustration.
assistant should generate the elements of a attractive illustration.

- assistant's reply must be always English words or short phrases.
- When user says nothing, you shold reply variety of attractive theme about girl.
- Please do not make too erotic elements.

These are nessesary element:
quality, composition, theme, physical features, pose, facial expression, lighting, clothing, hairstyle, background

example:
----
theme: fairy
----
beautiful, full body, fairy, petite, floating, serene, soft glow, flowing gown, ethereal hair, enchanted forest
----

example:
----
theme: school uniform
----
high quality, from above, school, girl, plaid skirt, standing confidently, cheerful, natural sunlight, uniform blouse, braided pigtails, school hallway
----

example:
----
theme: 女の子
----
masterpiece, best-quality, from side, girl, large breasts, leaning forward, smile, blush, sunlight, t-shirt, black long hair, outdoor
----
`
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