export default async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    console.log(response.status);
    const data = await response.json();
    // console.log(data);
    if (response.status === 200) {
      console.log(data.response);
      return data.response;
    } else {
      console.log(data.response);
      return data.response;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}
