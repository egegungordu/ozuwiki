import axios from 'axios';
import FormData from 'form-data';

// upload to imgur and return url
const uploadImage = async (file) => {
  // cant figure out image upload with imgur...
  return "image link";

  try {
    axios.defaults.baseURL = 'https://api.imgur.com/3/';
    console.log(file)
    const data = new FormData();
    data.append('image', file);
    const response = await axios({
      method: 'post',
      url: 'image',
      data: data,
      headers: {
        Authorization: 'Client-ID 03fc2ad9fc29223',
        "Content-Type": "multipart/form-data",
        "Content-Length": file.size,
      }
    });
    console.log(response)
    return response.data.data.link;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadImage };