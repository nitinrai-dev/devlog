import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "../components/Styles/GlobalStyle";
import styled from "styled-components";
import Layout from "../components/Global/Layout";

const Post = () => {
  const location = useLocation();
  const slug = location.state;
  const navigate = useNavigate();
  const [path, setPath] = useState(slug);
  const [post, SetPost] = useState({});

  useEffect(() => {
    const localPath = window.localStorage.getItem('page_path');
    setPath(JSON.parse(localPath));
  }, [])

  useEffect(() => {
    window.localStorage.setItem('page_path', JSON.stringify(slug));
    const fetch = async () => {
      try {
        const { data } = await axios.get(`https://dev.to/api/articles/${path}`);
        SetPost(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [slug, path]);
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
    background: ${({ theme }) => theme.light};
    border-radius: 8px;
    padding: 1.5rem;
    width: min(70rem, 100%);
    margin-inline: auto;
    & > div h1 {
      font-size: 2rem;
    }
    & p {
      font-size: 1.25rem;
    }
    & blockquote {
      border-left: 6px solid ${({ theme }) => theme.background};
      padding-left: 1rem;
      margin-bottom: 1rem;
      margin-left: 1rem;
      & p {
        font-size: 1.6rem;
      }
      &.ltag__twitter-tweet {
      width: min(45rem, 100%);
      margin-inline: auto;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      padding: 0;
      & .ltag__twitter-tweet__main {
        padding: 1rem;
        & a {
          text-decoration: none !important;
        }
      }
    }
    }
    & button {
      background: ${({ theme }) => theme.accent3};
      color: #fff;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    & img, video {
      max-width: 100%;
    }
    & ul {
      padding-left: 15px;
      & li {
        font-size: 1.25rem;
      }
    }
    & a {
      color: ${({ theme }) => theme.accent3};
      font-weight: 400;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
    }
    & .ltag__link {
      display: flex;
      width: min(55rem, 100%);
      margin: 1rem auto;
      border: 2px solid ${({ theme }) => theme.text};
      padding: 1rem;
      border-radius: 6px;
      gap: 1rem;
      & .ltag__link__link {
        text-decoration: none !important;
        & h3 {
          font-size: 1.2rem;
          color: #777;
        }
        & .ltag__link__pic img {
          border-radius: 100%;
        }
      }
    }
    & .highlight {
      background: #111;
      color: #f1ede7;
      padding: 1rem;
      margin-block: 1rem;
      border-radius: 6px;
      overflow: auto;
      & .highlight__panel {
        display: none;
      }
    }
  }
  @media (max-width: 540px) {
    padding-block: 2rem;
    & article {
      padding: 1rem;
      & p {
        font-size: 1.05rem;
      }
      & blockquote p {
        font-size: 1.25rem;
      }
    }
  }
`