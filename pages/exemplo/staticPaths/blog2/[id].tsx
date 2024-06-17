import React from "react";
import { Post } from "../../../../types/Post";
import { GetStaticProps } from "next";

// import { Container } from './styles';

type Props = {
    post:Post;
}

const BlogItem = ({post}:Props) => {
  return (
    <div>
      <h1>Post</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default BlogItem;

export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await res.json();

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }))

    return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            post: await fetch(`https://jsonplaceholder.typicode.com/posts/${context?.params?.id}`)
                .then((res) => res.json()),
        },
    };
}