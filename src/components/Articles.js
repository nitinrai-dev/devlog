import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Articles = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("https://dev.to/api/articles");
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <StyledArticles>
      <h4>Top stories</h4>
      {posts.map((post) => (
        <article key={post.id}>
          <Link to={`/${post.slug}`} state={post.path}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
          </Link>
        </article>
      ))}
    </StyledArticles>
  );
};

export default Articles;

const StyledArticles = styled.div`
  padding-inline: 1.5rem;
  background-color: ${({ theme }) => theme.light};
  border-radius: 8px;
  & > h4 {
    padding-block: 1rem;
    color: ${({ theme }) => theme.accent3};
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
  & > article a {
    display: block;
    padding-block: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;
