import { UserContext } from "@/context/UserContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";

const Review = ({ placeId }) => {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const [reviews, setReviews] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const {data} = await axios.post("/review", { placeId, content });
    // console.log(res);
    setContent("");
    setLoading(false);
  }

  useEffect(() => {
    async function getReviews() {
      const { data } = await axios.get(`/review/${placeId}`);
      setReviews(data);
      // console.log(res);
    }
    getReviews();
  }, [loading]);

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold my-2">Reviews</h2>
      {user && (
        <form className="flex gap-2" onSubmit={submitHandler}>
          <input
            placeholder="Enter your reviews"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-500 rounded-full px-4 py-1 w-1/2 "
          />
          <button
            type="submit"
            className="px-4 py-1 bg-primary text-white rounded-full "
          >
            Post
          </button>
        </form>
      )}
      <div className="flex my-4 flex-wrap gap-4">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div className="border border-gray-400 rounded-2xl p-4 w-[47%]">
              <h2 className="font-semibold text-xl"><i className="fa-solid fa-circle-user mr-2"></i>{review.userId.fullName}</h2>
              <p className="my-2 text-wrap">{review.content}</p> 
              <p className="text-xs">{differenceInCalendarDays(
                  new Date(Date.now()),
                  new Date(review.createdAt)
                )} Days ago</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Review;
