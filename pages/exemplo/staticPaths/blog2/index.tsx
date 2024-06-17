import React from "react";
import { Post } from "../../../../types/Post";

type Props = {
  name: string;
  posts: Post[];
};

const Blog2 = ({ name, posts }: Props) => {
  return (
    <div>
      <h1>Blog</h1>
      <p>Blog do {name}</p>
      <ul>
        {posts.map((post) => (
          <div key={post.id}>
            <li>
              <a href={`/exemplo/staticPaths/blog2/${post.id}`}>{post.title}</a>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return {
    props: { name: "Gabriel Rodrigues", posts },
    revalidate: 7200,
  };
};

export default Blog2;
