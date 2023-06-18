import { useState } from "react";
import axios from "axios";
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const headers = {
  headers: {
    "content-type": "multipart/form-data",
    authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export default function UploadFile({ setFetched }) {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFile = (files) => {
    setFile(files[0]);
    setName(files[0].name);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("fileType", file?.type ? file.type : "other");
      formData.append("fileSize", file.size);

      await axios.put(
        "https://api.bytestorage.io/byte/v1/file",
        formData,
        headers
      );
    } catch (err) {
      console.log(err);
    } finally {
      setFile("");
      setName("");
      setDescription("");
      setFetched(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div>
        <input
          required
          id="upload"
          placeholder="Select File"
          onChange={(event) => handleFile(event.target.files)}
          type="file"
        />
        <br />
        <br />
        <input
          required
          id="description"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <br />

      <button type="submit">Submit</button>
    </form>
  );
}
