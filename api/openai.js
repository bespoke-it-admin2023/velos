// api/openai.js
const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Method Not Allowed' });
    }

    const { conversationHistory } = req.body;

    if (!conversationHistory) {
        return res.status(400).send({ error: 'Conversation history is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Access your API key securely

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini', // or 'gpt-4' if you have access
            messages: conversationHistory,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        // Send back the response data from OpenAI
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error.message);
        res.status(500).send({ error: 'Error communicating with OpenAI API' });
    }
};