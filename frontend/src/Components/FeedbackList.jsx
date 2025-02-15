import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/feedbacks")
            .then(response => {
                setFeedbacks(response.data);
            })
            .catch(error => console.error("Error fetching feedbacks:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">User Feedback</h2>
            <div className="row">
                {feedbacks.length > 0 ? (
                    feedbacks.map(feedback => (
                        <div className="col-md-4 mb-3" key={feedback.feedback_id}>
                            <div className="card shadow-lg p-3">
                                <div className="card-body">
                                    <h5 className="card-title">Rating: ⭐ {feedback.rating}/5</h5>
                                    <p className="card-text">{feedback.comments}</p>
                                    <small className="text-muted">
                                        User ID: {feedback.user_id} | Request ID: {feedback.request_id}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No feedbacks available.</p>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;