import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "@firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
interface CreatePostData {
  title: string;
  imgcard: string;
  content: string;
}

export const NewPost = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("Please enter a title"),
    content: yup.string().required("Please enter some content").min(10),
    imgcard: yup.string().required("Please enter an image URL"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: CreatePostData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newPost = await addDoc(postRef, {
        title: data.title,
        imgcard: data.imgcard,
        content: data.content,
        uid: user?.uid,
        username: user?.displayName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log({ data });
    }
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <div className="form-control">
        <input
          className="m-2 p-2 "
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        <p className="text-xs text-red-500 m-0 pl-2">{errors.title?.message}</p>
        <input
          className="m-2 p-2 "
          type="text"
          placeholder="Image URL"
          {...register("imgcard")}
        />
        <p className="text-xs text-red-500 m-0 pl-2">
          {errors.imgcard?.message}
        </p>
        <textarea
          className="m-2 p-2"
          placeholder="Post content"
          {...register("content")}
        />
        <p className="text-xs text-red-500 m-0 pl-2">
          {errors.content?.message}
        </p>
        <input
          className="btn btn-md btn-secondary min-w-max p-2 m-2"
          type="submit"
          value="Create Post"
        />
      </div>
    </form>
  );
};
