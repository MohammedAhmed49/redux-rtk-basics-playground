import { useSelector } from "react-redux";
import PostExcerpt from "./PostExcerpt";
import {
  selectPostIds,
  selectPostsError,
  selectPostsStatus,
} from "./postsSlice";

const PostsList = () => {
  const postsIds = useSelector(selectPostIds);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  let content;

  if (postsStatus === "loading") {
    content = <p>Loading posts....</p>;
  } else if (postsStatus === "succeeded") {
    content = postsIds.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
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
