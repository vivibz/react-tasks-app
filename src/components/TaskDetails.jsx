import React from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "./Button";
import './TaskDetails.css';

const TaskDetails = () => {
    const params = useParams();
    const history = useHistory();

    const handlBlackButtonClick = () => {
        history.goBack();
    }

    return (
        <div>
            <div className="back-button-container">
                <Button onClick={handlBlackButtonClick}>Voltar</Button>
            </div>
            <div className="task-details-container">
                <h2>{params.taskTitle}</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nemo neque quas porro iusto reprehenderit magnam labore non, illum, esse minus obcaecati necessitatibus ipsam quidem ab, ad doloremque libero. Eius!
                </p>
            </div>
        </div>
    );
};

export default TaskDetails;