// storage.js
const SYNAPSE_KEY = 'synapse_global_data';
const OLD_KEY = 'nonogram_v1_progress'; // המפתח הישן מהגרסאות הקודמות

const StorageManager = {
    getAllData() {
        let data = localStorage.getItem(SYNAPSE_KEY);
        if (!data) {
            // בדיקה: האם יש מידע ישן שצריך להציל?
            const oldData = localStorage.getItem(OLD_KEY);
            if (oldData) {
                console.log("Found old data, migrating...");
                const parsedOld = JSON.parse(oldData);
                const newData = {
                    'nonogram-app': {
                        currentLevel: parsedOld.completedIds ? Math.max(...parsedOld.completedIds, 0) + 1 : 1,
                        completedIds: parsedOld.completedIds || []
                    }
                };
                localStorage.setItem(SYNAPSE_KEY, JSON.stringify(newData));
                // אופציונלי: localStorage.removeItem(OLD_KEY); // מוחק את הישן אחרי ההעברה
                return newData;
            }
            return {};
        }
        return JSON.parse(data);
    },

    getGameData(gameId) {
        const allData = this.getAllData();
        return allData[gameId] || { currentLevel: 1, completedIds: [] };
    },

    saveLevelWin(gameId, levelId) {
        const allData = this.getAllData();
        if (!allData[gameId]) {
            allData[gameId] = { currentLevel: 1, completedIds: [] };
        }

        const game = allData[gameId];
        if (!game.completedIds.includes(levelId)) {
            game.completedIds.push(levelId);
            if (levelId >= game.currentLevel) {
                game.currentLevel = levelId + 1;
            }
        }

        localStorage.setItem(SYNAPSE_KEY, JSON.stringify(allData));
    }
};