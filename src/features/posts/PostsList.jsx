import { useSelector } from "react-redux";
import PostExcerpt from "./PostExcerpt";
import {
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from "./postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  let content;

  if (postsStatus === "loading") {
    content = <p>Loading posts....</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostsList;
