import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

const Post = () => {
  const location = useLocation();
  const slug = location.state;
  const navigate = useNavigate();
  const [post, SetPost] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`https://dev.to/api/articles/${slug}`);
        SetPost(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  return (
    <Layout>
      <article>
        <h1>{post.title}</h1>
        <div>{post.body_markdown}</div>
        <br />
        <button onClick={() => navigate(-1)}>Go back</button>
      </article>
    </Layout>
  );
};

export default Post;
