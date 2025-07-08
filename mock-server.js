import http from "http";
import url from "url";

const PORT = 3000;

// Временное хранилище для пользователей
const users = {};

// Утилита для логгирования
function log(...args) {
    console.log(`[${new Date().toISOString()}]`, ...args);
}

// Утилита для чтения тела POST-запроса
function getRequestBody(req, callback) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
        try {
            const parsed = JSON.parse(body);
            log('→ Body:', parsed);
            callback(parsed);
        } catch (err) {
            log('⚠️  Failed to parse body:', body);
            callback({});
        }
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    log(`➡️  ${method} ${path}`);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'POST' || method === 'OPTIONS') {
        if (path === '/register') {
            res.writeHead(200);
            res.end();
            log('✅ Register OK');
        } else if (path === '/chek') {
            getRequestBody(req, body => {
                const { user_id } = body;
                let responseEnergi = null;

                if (users.hasOwnProperty(user_id)) {
                    // пример логики: если энергия < 10, выдать 20
                    const currentEnergi = users[user_id].energi;
                    if (currentEnergi < 10) {
                        users[user_id].energi = 20;
                        responseEnergi = 20;
                    }
                }

                res.writeHead(200);
                res.end(JSON.stringify({ energi: responseEnergi }));
                log(`🔍 Chek user_id="${user_id}" → energi: ${responseEnergi}`);
            });
        } else if (path === '/data') {
            getRequestBody(req, body => {
                const { user_id } = body;
                let user = users[user_id];
                if (!user) {
                    user = { energi: 30, money: 50 };
                    users[user_id] = user;
                    log(`🆕 User created: ${user_id}`, user);
                } else {
                    log(`📤 Returning data for user_id="${user_id}"`, user);
                }

                const response = {
                    ...user,
                    max_energi: 100
                };

                res.writeHead(200);
                res.end(JSON.stringify(response));
            });
        } else if (path === '/save') {
            getRequestBody(req, body => {
                const { user_id, energi, money } = body;
                users[user_id] = { energi, money };
                res.writeHead(200);
                res.end();
                log(`💾 Saved data for user_id="${user_id}"`, users[user_id]);
            });
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not found' }));
            log(`❌ Unknown POST path: ${path}`);
        }
    } else {
        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        log(`❌ Method not allowed: ${method}`);
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Mock server is running on http://localhost:${PORT}`);
});
