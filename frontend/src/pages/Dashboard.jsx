import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import { Separator } from "@/components/ui/separator";
import PostContainer from "@/components/PostContainer";
import { BadgePercent, BriefcaseBusiness, NotepadText } from "lucide-react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-20">
      <Sidebar />
      <div className="col-span-3 shadow-lg rounded-md h-full overflow-y-auto ">
        <div className="border border-gray-600 p-4 rounded-lg shadow-gray-600 shadow-md space-y-4 bg-gray-800">
          <div className="lg:hidden flex items-center gap-3 p-3 bg-white/10 rounded-lg shadow-md">
            <div className="size-12 rounded-full overflow-hidden border-2 border-gray-300/50">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center text-white text-sm tracking-wide">
              <h6 className="font-medium">
                <span className="text-gray-400">Username:</span>{" "}
                {user?.username.charAt(0).toUpperCase() +
                  user.username.slice(1)}
              </h6>

              <h6 className="font-medium">
                <span className="text-gray-400">Connections:</span>{" "}
                {user?.connections?.length ?? 0}
              </h6>
            </div>
          </div>
          <CreatePost />
          <div className="flex items-center justify-between text-yellow-400 font-medium text-sm px-2">
            <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <NotepadText className="md:size-5 size-4" /> <p>Post</p>
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <BadgePercent className="md:size-5 size-4" /> <p>Questions</p>
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <BriefcaseBusiness className="md:size-5 size-4" />{" "}
              <p>Collaborations</p>
            </span>
          </div>
        </div>

        <Separator className="my-4 w-full" />

        <div>
          <PostContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
