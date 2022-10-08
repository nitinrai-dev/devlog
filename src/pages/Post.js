import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { Container } from "../components/Styles/GlobalStyle";
import styled from "styled-components";

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
  }, [slug]);
  return (
    <Layout>
      <StyleArticle>
        <Container>
          <article>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body_html }}></div>
            <br />
            <button onClick={() => navigate(-1)}>Go back</button>
          </article>
        </Container>
      </StyleArticle>
    </Layout>
  );
};

export default Post;

const StyleArticle = styled.section`
  padding-block: 4rem;
  min-height: calc(100vh - 144px);
  & article {
    background: #fff;
    border-radius: 8px;
    padding: 1.5rem;
  }

`