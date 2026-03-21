// storage.js - "הכספת" של האפליקציה
const SYNAPSE_KEY = 'synapse_global_data';

const StorageManager = {
    // מביא את כל המידע מהזיכרון
    getAllData() {
        const data = localStorage.getItem(SYNAPSE_KEY);
        return data ? JSON.parse(data) : {};
    },

    // מביא התקדמות של משחק ספציפי
    getGameData(gameId) {
        const allData = this.getAllData();
        return allData[gameId] || { currentLevel: 1, completedIds: [] };
    },

    // שומר ניצחון בשלב
    saveLevelWin(gameId, levelId) {
        const allData = this.getAllData();
        if (!allData[gameId]) {
            allData[gameId] = { currentLevel: 1, completedIds: [] };
        }

        const game = allData[gameId];
        if (!game.completedIds.includes(levelId)) {
            game.completedIds.push(levelId);
            // מקדם את השלב הנוכחי רק אם סיימנו את השלב הכי גבוה שלנו
            if (levelId >= game.currentLevel) {
                game.currentLevel = levelId + 1;
            }
        }

        localStorage.setItem(SYNAPSE_KEY, JSON.stringify(allData));
        console.log(`Saved win for ${gameId}, level ${levelId}. Next level: ${game.currentLevel}`);
    }
};