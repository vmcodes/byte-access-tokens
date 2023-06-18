# Byte Storage

## How to manage content via API

<br>

### After registering for your plan:

- Create a collection from the primary dashboard.
- Next, navigate to the `Keys` page.
- From there, scroll down to `Access Tokens` and select a collection to create a token for.
- Then make sure to save the value of this token to be used later, ideally in a `.env` file.

<br>

### Integrating with your application

<br>

## React Upload Example

```javascript
import { useState } from "react";
import axios from "axios";
const ACCESS_TOKEN = "ENTER TOKEN VALUE HERE";
const headers = {
  headers: {
    "content-type": "multipart/form-data",
    authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export default function UploadFile() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFile = () => {
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
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <label htmlFor="upload">Select File</label>
      <input
        required
        id="upload"
        placeholder="Select File"
        onChange={(event) => handleFile(event.target.files)}
        type="file"
      />

      <label htmlFor="upload">Description</label>
      <input
        required
        id="description"
        placeholder="Description"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

<br>

## React Fetch Collection Example

```javascript
import { useEffect, useState } from "react";
import axios from "axios";
const ACCESS_TOKEN = "ENTER TOKEN VALUE HERE";
const headers = {
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export default function FetchCollection() {
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
  }, [fetched]);

  return (
    <div>
      <h1>My Collection:</h1>
      <div>
        {collection[0] &&
          collection.map((upload) => {
            return <h3 key={upload._id}>{upload.name}</h3>;
          })}
      </div>
    </div>
  );
}
```

<br>

## API Response Example

```json
[
  {
    "_id": "648f6b3379d396477d5e27de",
    "collectionId": "64867536839c5cf6fb89cf15",
    "address": "QmUwUZSHU9dehU64vN6nxDtMzfapjureafsHyCDCBus519",
    "name": "12.png",
    "description": "Test Upload Byte Dev GW",
    "fileType": "image/png",
    "fileSize": 1029743,
    "createdAt": "2023-06-18T20:38:11.327Z",
    "updatedAt": "2023-06-18T20:38:11.327Z",
    "__v": 0
  }
]
```
