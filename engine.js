// משתני מערכת לזמן
let elapsedTime = 0;
let timerInterval = null;

/**
 * פונקציה לבדיקת ניצחון
 * משווה בין הפתרון הנכון לבין המצב הנוכחי של הלוח
 */
function checkWin(solution, currentBoard) {
    for (let r = 0; r < solution.length; r++) {
        for (let c = 0; c < solution[r].length; c++) {
            // אם בתא מסוים צריך להיות שחור (1) אבל הוא לא מסומן, המשתמש עוד לא ניצח
            if (solution[r][c] === 1 && currentBoard[r][c] !== 1) {
                return false;
            }
        }
    }
    return true;
}

/**
 * מחולל רמזים עבור הלוח (המספרים בצדדים)
 * מחזיר אובייקט עם מערכי רמזים לשורות ולעמודות
 */
function generateNonogramData(grid) {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowHints = [];
    for (let r = 0; r < numRows; r++) {
        rowHints.push(getLineHints(grid[r]));
    }

    const colHints = [];
    for (let c = 0; c < numCols; c++) {
        const colArray = [];
        for (let r = 0; r < numRows; r++) {
            colArray.push(grid[r][c]);
        }
        colHints.push(getLineHints(colArray));
    }

    return { rowHints, colHints };
}

/**
 * פונקציית עזר לחישוב רצפים של 1 במערך
 * לדוגמה: [1,1,0,1] -> [2,1]
 */
function getLineHints(line) {
    const hints = [];
    let count = 0;
    for (let val of line) {
        if (val === 1) {
            count++;
        } else {
            if (count > 0) {
                hints.push(count);
                count = 0;
            }
        }
    }
    if (count > 0) hints.push(count);
    return hints.length > 0 ? hints : [0];
}

/**
 * ניהול זמן - התחלה
 */
function startTimer() {
    stopTimer(); // ליתר ביטחון, איפוס טיימר קודם
    elapsedTime = 0;
    timerInterval = setInterval(() => {
        elapsedTime++;
    }, 1000);
}

/**
 * ניהול זמן - עצירה
 */
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

/**
 * פורמט זמן מובן למשתמש (00:00)
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}