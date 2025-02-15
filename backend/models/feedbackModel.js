const db = require("../config/db");

const Feedback = {
    getAllFeedbacks: (callback) => {
        db.query("SELECT * FROM feedback", (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = Feedback;