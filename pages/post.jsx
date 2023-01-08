import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const handleChange = ({ target }) => {
    const { value } = target;
    setPost({ description: value })
  }

  //change description count color to red after 200 char
  const descriptionRed =
    `text-cyan-600 font-medium text-sm ${post.description.length > 200 ? "text-red-600" : ""}`;

  const submitPost = async (e) => {
    e.preventDefault();

    //Checks for description length
    if (!post.description || post.description.length > 200) {
      toast.error("Description is empty or too long 🤔", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        toastId: 'do-not-duplicate',
      });
    } else {
      //Creat new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      return route.push("/");
    }
  }

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">Create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={handleChange}
            className="bg-gray-800 h-36 w-full
             text-white text-sm rounded-lg p-2"
          ></textarea>
          <p className={descriptionRed}>{post.description.length}/200</p>
        </div>
        <button
          type="submit"
          className="w-full
             bg-cyan-600
             text-white
             font-medium
             p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
