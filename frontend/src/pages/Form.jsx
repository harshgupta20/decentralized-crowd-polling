import { useState } from "react";
import axios from "axios";

const FormComponent = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({ text: "", image: "", option: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a png image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/test`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded-lg w-96">
      <input
        type="text"
        name="text"
        placeholder="Enter text"
        value={formData.text}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="file"
        accept="image/png"
        onChange={handleImageChange}
        className="border p-2 w-full"
      />
      <select
        name="option"
        value={formData.option}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
