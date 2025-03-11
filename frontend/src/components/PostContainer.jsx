import { Separator } from "./ui/separator";
import demo from "@/assets/postDemo.png";
import {
  Globe,
  ThumbsUp,
  MessageSquare,
  Share2,
  Plus,
  ThumbsDown,
} from "lucide-react";

const PostContainer = ({
  title,
  content,
  tags,
  techStack,
  type,
  asset,
  createdAt,
  userId,
  likes = [],
  comments = [],
}) => {
  const handleLike = () => {};
  const handleDislike = () => {};

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover-effect">
      <div className="p-2 rounded-md">
        <div className="flex items-center gap-2 justify-between">
          <div>
            <h1 className="font-semibold text-sm">
              {userId?.username?.charAt(0).toUpperCase() +
                userId?.username?.slice(1) || "Anonymous"}
            </h1>
            <p className="text-xs text-gray-500">
              {userId?.tagline || "No tagline"}
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              {new Date(createdAt).toLocaleString()} <Globe size={12} />
            </p>
          </div>
          <span
            className="cursor-pointer p-1 rounded-full hover:bg-gray-100 transition"
            aria-label="Add Friend"
          >
            <Plus className="text-blue-500" />
          </span>
        </div>

        <Separator className="w-full my-2" />

        <div className="text-sm text-gray-700">
          {type === "collaboration" && (
            <h1 className="font-bold text-xl">{title}</h1>
          )}
          {content ? (
            <p>{content}</p>
          ) : (
            <p className="text-sm text-gray-400">No content available.</p>
          )}
          {asset && (
            <div className="mt-3 w-full flex justify-center">
              <img
                src={asset || demo}
                className="rounded-md block mx-auto object-cover"
                alt="Post Image"
                width={500}
                height={300}
              />
            </div>
          )}
        </div>

        <Separator className="w-full my-2" />

        <div className="flex items-center justify-evenly text-gray-500 text-sm">
          <div className="flex border-2 border-blue-200 rounded-full transition hover:bg-blue-100/50">
            <span
              onClick={handleLike}
              className="flex items-center gap-2 cursor-pointer  px-3 py-1"
              aria-label="Like Post"
            >
              <ThumbsUp size={16} className="hover:text-blue-500" />
              <span>{likes.length}</span>
            </span>
            <span
              onClick={handleDislike}
              className="flex items-center cursor-pointer pe-3 py-1"
              aria-label="Dislike Post"
            >
              <ThumbsDown size={16} className="hover:text-red-500" />
            </span>
          </div>
          <span className="flex items-center gap-1 cursor-pointer transition rounded-full border border-cyan-200 px-3 py-1 hover:bg-cyan-100/50">
            <MessageSquare size={16} />
            <span> Comments</span>
          </span>
          <span className="flex items-center gap-1 cursor-pointer transition rounded-full border border-amber-200 px-3 py-1 hover:bg-amber-100/50">
            <Share2 size={16} />
            <span>Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
