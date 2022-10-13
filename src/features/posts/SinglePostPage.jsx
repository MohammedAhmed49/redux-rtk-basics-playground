import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import { selectSinglePost } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectSinglePost(state, Number(postId)));
  console.log(post);
  if (!post) {
    return (
      <section>
        <h2>Post is not found</h2>
      </section>
    );
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
