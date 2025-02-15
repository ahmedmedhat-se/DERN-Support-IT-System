const Feedback = require("../models/feedbackModel");

exports.getFeedbacks = (req, res) => {
    Feedback.getAllFeedbacks((err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results);
    });
};