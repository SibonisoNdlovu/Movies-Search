import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { uuid } from '../../utils/utils';
import { Review } from "../../api/models/review";
import "./reviewModal.scss";

function Modal({ setOpenModal, addReviewToList }) {
  const {id} =useParams();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const  handleSubmit = (async () => {
    try {
      var review = {
        id: uuid(),
        filmId: id,
        text: comment,
        user: 'Siboniso',
        score: rating
      };

      api.addReview(review).then(res =>{
        addReviewToList(res)
        setOpenModal(false);
      })
    } catch({err}) {
      console.log(err);
    }
  });

  return (
    <section className="modalBackground">
      <section className="modalContainer">
        <section className="titleCloseBtn">
          <button onClick={() => { setOpenModal(false);}}> X </button>
        </section>
        <section className="title">
          <h2>Add Review!!!</h2>
        </section>
        <section className="body">
        Comment: <textarea maxLength={200} onChange={(e) => setComment(e.currentTarget.value)} />
        <input border="1" type="range" min="1" max="10" value={rating} onChange={(e) => setRating(e.currentTarget.value)}/> <span/>{rating}
        </section>
        <section className="footer">
          <button onClick={() => { handleSubmit()}}>Submit</button>
        </section>
      </section>
    </section>
  );
}

export default Modal;