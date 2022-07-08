import { useState, useEffect } from "react";
import axios from "axios";

function UseRandom() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const quoteAPI = async () => {
    let arrayOfQuotes = [];
    try {
      const data = await axios.get("https://api.quotable.io/random");
      arrayOfQuotes = data.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    try {
      setQuote(arrayOfQuotes.content);
      setAuthor(arrayOfQuotes.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    quoteAPI();
  }, []);

  return (
    <div>
      {quote}
      {author}
    </div>
  );
}

export default UseRandom;
