import { Separator } from "./ui/separator";
import demo from "@/assets/postDemo.png";
import {
  Globe,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  EllipsisVertical,
} from "lucide-react";
import PdfViewer from "./PdfViewer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addLike,
  allPost,
  dislike,
  updateDislikeState,
  updateLikeState,
} from "@/store/features/post.slice";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_UR);

const PostContainer = () => {
  const userId = useSelector((state) => state.user.user._id);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPost());

    socket.on("updateLike", (data) => {
      dispatch(updateLikeState(data));
    });

    socket.on("updateDislike", (data) => {
      dispatch(updateDislikeState(data));
    });

    return () => {
      socket.off("updateLike");
      socket.off("updateDislike");
    };
  }, [dispatch]);

  const handleLike = async (id) => {
    try {
      await dispatch(addLike(id));
      socket.emit("likePost", id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDislike = async (id) => {
    try {
      await dispatch(dislike(id));
      socket.emit("dislikePost", id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {posts &&
        posts.map((post, i) => (
          <div
            key={i}
            className="border border-gray-600 p-4 rounded-lg shadow-md shadow-gray-700 bg-gray-800 hover-effect"
          >
            <div className="p-2 rounded-md">
              <div className="flex items-center gap-2 justify-between">
                <div>
                  <h1 className="font-semibold text-sm text-white">
                    {post.userId?.username?.charAt(0).toUpperCase() +
                      post.userId?.username?.slice(1) || "Anonymous"}
                  </h1>
                  <p className="text-xs text-gray-200">
                    {post.userId?.tagline || "No tagline"}
                  </p>
                  <p className="text-xs text-gray-300 flex items-center gap-1">
                    {new Date(post.createdAt).toLocaleString()}{" "}
                    <Globe size={12} />
                  </p>
                </div>
                <span className="cursor-pointer text-gray-200">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical size="18" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="bg-gray-800/60 text-gray-300 shadow-md shadow-gray-500 border-none"
                    >
                      <DropdownMenuItem className="px-4 py-2 cursor-pointer">
                        Follow
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-4 py-2 cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 px-4 py-2 cursor-pointer">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              </div>

              <Separator className="w-full my-2 bg-gray-500" />

              <div className="text-sm text-gray-400">
                {post.title && (
                  <h1 className="font-bold text-lg text-white">{post.title}</h1>
                )}
                {post.content && <p className="text-white">{post.content}</p>}
                <div className="flex gap-2 mt-2">
                  {post.tags &&
                    post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-black/50 rounded-full px-2 font-bold shadow-2xl"
                      >
                        {tag}
                      </span>
                    ))}
                  {post.techStack &&
                    post.techStack.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-black/50 font-bold rounded-full px-2 shadow-2xl"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
                {post.asset &&
                  (post.asset.includes("raw") ? (
                    <div className="w-full flex flex-col items-center p-4">
                      <PdfViewer asset={post.asset} />
                    </div>
                  ) : (
                    <div className="p-4 w-full flex justify-center">
                      <img
                        src={post.asset || demo}
                        className="rounded-md block mx-auto object-cover"
                        alt="Post Image"
                        width={500}
                        height={300}
                      />
                    </div>
                  ))}
              </div>

              <Separator className="w-full my-2 bg-gray-500" />

              <div className="flex items-center justify-evenly text-gray-500 text-sm">
                <div className="flex border border-gray-900 rounded-full transition bg-gray-800 hover:bg-gray-900">
                  <span
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-2 cursor-pointer px-3 py-1"
                    aria-label="Like Post"
                  >
                    <ThumbsUp
                      size={16}
                      className={
                        post.likes?.includes(userId)
                          ? "fill-blue-500 stroke-white"
                          : "hover:text-blue-500 text-gray-200"
                      }
                    />
                    <span className="text-gray-200">
                      {post.likes?.length - post.dislikes?.length}
                    </span>
                  </span>
                  <span
                    onClick={() => handleDislike(post._id)}
                    className="flex items-center cursor-pointer pe-3 py-1"
                    aria-label="Dislike Post"
                  >
                    <ThumbsDown
                      size={16}
                      className={
                        post.dislikes?.includes(userId)
                          ? "fill-red-500 stroke-white"
                          : "hover:text-red-500 text-gray-200"
                      }
                    />
                  </span>
                </div>
                <span className="flex items-center gap-1 cursor-pointer transition rounded-full border border-gray-900 px-3 py-1 bg-gray-800 hover:bg-gray-900">
                  <MessageSquare size={16} className="text-white" />
                  <span className="text-gray-200"> Comments</span>
                </span>
                <span className="flex items-center gap-1 cursor-pointer transition rounded-full border border-gray-900 px-3 py-1 bg-gray-800 hover:bg-gray-900">
                  <Share2 size={16} className="text-white" />
                  <span className="text-gray-200">Share</span>
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostContainer;
