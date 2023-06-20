import { Post } from './post';

export function Posts({ posts }) {
  return (
    <div className="publicaciones">
      {posts.map((element, index) => (
        <Post key={element.id} post={element} />
      ))}
    </div>
  );
}

