import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    SetError("");
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        SetError("An erron has occured while fetching data");
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-lg w-fit p-4 mx-auto">
          <div className="my-4">
            <div className="text-xl mr-4 text-gray-500 ">Id:</div>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <div className="text-xl mr-4 text-gray-500 ">Title:</div>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <div className="text-xl mr-4 text-gray-500 ">Author:</div>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <div className="text-xl mr-4 text-gray-500 ">Publish Year:</div>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
