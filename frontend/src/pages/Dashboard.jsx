import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import { Separator } from "@/components/ui/separator";
import PostContainer from "@/components/PostContainer";
import { BadgePercent, BriefcaseBusiness, NotepadText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allPost } from "@/store/features/post.slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => async () => dispatch(allPost()), [])

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 pt-20">
      <Sidebar />
      <div className="col-span-3 bg-white shadow-lg rounded-xl p-6 h-full overflow-y-auto">
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm space-y-4 bg-gray-50">
          <CreatePost />
          <div className="flex items-center justify-evenly text-gray-700 font-medium text-sm">
            <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <NotepadText className="w-5 h-5" /> Post
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <BadgePercent className="w-5 h-5" /> Questions
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <BriefcaseBusiness className="w-5 h-5" /> Collaborations
            </span>
          </div>
        </div>

        <Separator className="my-4 w-full border-gray-300" />

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostContainer key={post._id} {...post} />)
          ) : (
            <h1 className="text-center text-gray-500">No posts available</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
