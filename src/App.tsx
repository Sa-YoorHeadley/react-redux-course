import PostsList from "./app/features/posts/PostsList";
import AddPostForm from "./app/features/posts/AddPostForm";

function App() {
  return (
    <main className="flex flex-col items-center">
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
