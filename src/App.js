import { useEffect, useState } from "react";
import UploadFile from "./components/UploadFile";
import axios from "axios";
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const headers = {
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

function App() {
  const [fetched, setFetched] = useState(false);
  const [collection, setCollection] = useState([]);

  const fetchCollection = async () => {
    const response = await axios.get(
      "https://api.bytestorage.io/byte/v1/collection",
      headers
    );

    setCollection(response.data);
    setFetched(true);
  };

  useEffect(() => {
    if (!fetched) {
      fetchCollection();
    }
    // eslint-disable-next-line
  }, [fetched]);

  return (
    <div className="App">
      <UploadFile setFetched={setFetched} />

      <div>
        <h1>My Collection:</h1>
        {collection[0] &&
          collection.map((upload) => {
            return (
              <div key={upload._id}>
                <h3>{upload.name}</h3>
                <span>{upload.description}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
