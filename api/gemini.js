export default async function handler(req, res) {
    // Получаем ключ из параметров запроса
    const { key } = req.query;
    if (!key) {
        return res.status(400).json({ error: "API key is missing" });
    }

    // Формируем прямой URL к Google
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

    try {
        // Делаем ЧИСТЫЙ запрос от лица сервера Vercel (без твоего IP)
        const googleRes = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body) // Передаем твой промпт
        });

        // Возвращаем ответ тебе
        const data = await googleRes.json();
        res.status(googleRes.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
