import React from "react";
import { Link } from "react-router-dom";

const Card = ({ props }) => {
  return (
    <Link to={`/blog/ ${props._id}`}>
      <div className="flex px-3 py-3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src={props.image}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.title}</div>
            <p className="text-gray-700 text-base">{props.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
