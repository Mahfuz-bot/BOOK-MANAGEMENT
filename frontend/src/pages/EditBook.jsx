import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setPublishYear(res.data.publishYear);
        setLoading(false);
        // enqueueSnackbar("Edit successfully", { variant: "success" });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // alert("An error happend.plz chk console");
        enqueSnackbar("An error happend plz chk console", { variant: "error" });
      });
  }, []);

  const handleEditBook = () => {
    setError("");
    setSuccess("");

    if (!title || !author || !publishYear) {
      setError("All fields are required");
      return;
    }
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setSuccess("Book created successfully");
        setLoading(false);
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.log(error);
        setError("An error has occured plz chk the console");
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      {error && <div className="text-red-400 text-xl">{error}</div>}
      {success && <div className="text-green-400 text-xl">{success}</div>}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[700px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className="text-xl  mr-4 text-gray-500">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 rounded-md border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">
            Publish Year
          </label>
          <input
            type="text"
            value={publishYear}
            id="publishYear"
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
          />
        </div>
        <button
          className="p-2 bg-sky-300 w-ful hover:bg-sky-600 hover:text-white rounded-md"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
