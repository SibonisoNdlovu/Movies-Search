import { Review } from "../../api/models/review";
import moment from 'moment'

const ReviewCard = ({score, date, text, user}: Partial<Review>) => (
  <section className='review-card'>
      Score: {score}<br/><span/>
      Date: {moment(date).format('DD/MM/YYYY')}<br/><span/>
      Comment: {text}<br/><span/>
      By: {user}<br/><span/>
  </section>
);


export default ReviewCard;