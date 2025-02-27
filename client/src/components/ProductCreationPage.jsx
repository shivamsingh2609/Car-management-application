
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProductCreationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("tags", JSON.stringify(formData.tags.split(",")));

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cars/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Car Created",
        text: response.data.message,
        confirmButtonText: "OK",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create car. Please try again.",
        confirmButtonText: "Retry",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center ">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold">🚗 Add a New Car</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">Car Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-control border-2 shadow-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">Car Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control border-2 shadow-sm"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label fw-semibold">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="form-control border-2 shadow-sm"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label fw-semibold">Upload Car Images</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              className="form-control border-2 shadow-sm"
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 fw-bold" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreationPage;

