import Services from "../Services";
import Installations from "../Installations";
import FeedbackList from "../FeedbackList"

function Homepage() {
    return (
        <>
            <div className="homepage">
                <Services />
                <Installations />
                <FeedbackList />
            </div>
        </>
    );
}

export default Homepage;