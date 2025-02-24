import user from "/User.png";
import calc from "/pcop71am.png";
import { Link } from "react-router";
import {
  Computer,
  Ellipsis,
  MessageSquareText,
  MessageSquareWarning,
  ScrollText,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <section className="flex flex-col md:flex-row bg-gradient-to-b from-[#100223] via-[#230549] to-[#563d78] pt-16 pb-8 gap-6 px-4 md:px-8 lg:px-20 min-h-screen">
      <aside className="hidden md:flex md:w-2/5 lg:w-1/4 justify-center">
        <div className="w-full max-h-96 bg-gray-200 rounded-2xl flex items-center justify-center p-4 shadow-lg">
          <span className="text-black font-semibold">Sidebar</span>
        </div>
      </aside>

      <div className="w-full md:w-3/5 lg:w-3/4 flex justify-center">
        <div className="w-full bg-white rounded-2xl p-4 flex flex-col items-center gap-4 shadow-lg">
          <div className="flex w-full p-4 rounded-md gap-2 flex-col border-2">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={user}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="flex items-center flex-1 h-12 rounded-full border-2 text-black font-bold px-4 bg-gray-100 cursor-text">
                Create a Post
              </span>
            </div>
            <div className="flex md:hidden justify-center px-4 md:px-10 mt-4 gap-2 md:gap-4 text-black text-sm">
                

            </div>
            <div className="hidden md:flex justify-center px-4 md:px-10 mt-4 gap-2 md:gap-4 text-black text-sm">
              <Link to="" className="flex gap-2 items-center">
                <ScrollText /> Post
              </Link>
              <Link to="" className="flex gap-2 items-center">
                <MessageSquareWarning /> Questions
              </Link>
              <Link to="" className="flex gap-2 items-center">
                <Computer /> Collaboration
              </Link>
            </div>
          </div>

          <div className="flex w-full border-2 rounded-md flex-col p-4">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <span className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={user} alt="user" />
                </span>
                <span className="flex flex-col text-sm">
                  <h1 className="font-semibold">Anurag Prateek</h1>
                  <p>MERN Stack Developer</p>
                  <p>2h</p>
                </span>
              </div>

              <span className="hidden md:block text-blue-500 font-bold cursor-pointer">
                Follow +
              </span>
              <span className="block md:hidden text-blue-500 font-bold cursor-pointer">
                +
              </span>
            </div>
            <div className="px-6 py-4 whitespace-pre-wrap text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </div>
            <div className="rounded-md py-2">
              <img src={calc} alt="post" className="w-full rounded-lg" />
            </div>
            <hr />
            <div className="flex justify-between pt-2 flex-wrap gap-2">
              <div className="flex gap-2">
                <div className="flex px-2 border-2 rounded-full">
                  <Button variant="ghost">
                    <ThumbsUp /> <p>12</p>
                  </Button>
                  <Button variant="ghost">
                    <ThumbsDown />
                  </Button>
                </div>
                <div className="flex px-2 border-2 rounded-full">
                  <Button variant="ghost">
                    <MessageSquareText /> comments
                  </Button>
                </div>
              </div>
              <div className="flex px-2 border-2 rounded-full">
                <Button variant="ghost">
                  <Ellipsis />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
