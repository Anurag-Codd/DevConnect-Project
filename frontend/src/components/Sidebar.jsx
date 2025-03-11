import banner from "@/assets/hero.png";
import defaultAvatar from "@/assets/User.png";
import { Separator } from "./ui/separator";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="relative bg-white shadow-md rounded-lg h-96 hidden lg:flex flex-col items-center pb-6">
        <div className="relative w-full h-20 rounded-t-lg overflow-hidden">
        <img src={banner} alt="banner" className="w-full h-20 object-cover" />
        </div>

        <div className="relative -mt-10 flex flex-col items-center">
        <img
          src={user?.avatar || defaultAvatar}
          alt="User Avatar"
          width={80}
          height={80}
          className="rounded-full border-2 border-white shadow-lg"
        />

          <h2 className="text-lg font-semibold mt-2">{user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)|| "user"}</h2>
          <p className="text-gray-500 text-xs px-4 text-center">
            {user?.tagline || "MERN Stack Developer | Full Stack"}
          </p>
        </div>

        <Separator className="my-2 w-full" />

        <div className="px-6 w-full ">
          <div className="mb-4">
            <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold">
              Experience
            </p>
            <p className="text-lg font-bold text-gray-800">
            {user?.experience?.length
              ? calculateTotalExperience(user.experience)
              : ""}
            </p>
          </div>

          <Separator className="my-2 w-3/4 mx-auto" />

          <div className="mb-4">
            <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold">
              Connections
            </p>
            <p className="text-lg font-bold text-gray-800">
              {user?.connections?.length || 0}
            </p>
          </div>

          <Separator className="my-2 w-3/4 mx-auto" />

          <div className="mt-4">
            <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold">
              Current Projects
            </p>
            <ul className="mt-2 space-y-1">
              {user?.projects
                ?.filter((project) => project.status === "ongoing")
                .map((project, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg"
                  >
                    {project.name}
                  </li>
                ))}
            </ul>
            {user?.projects?.filter((project) => project.status === "ongoing")
              .length === 0 && (
              <p className="text-gray-400 text-xs mt-1">No ongoing projects</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

function calculateTotalExperience(experience) {
  let totalMonths = 0;

  experience.forEach((job) => {
    const fromDate = new Date(job.from);
    const toDate = job.current ? new Date() : new Date(job.to);

    if (!isNaN(fromDate) && !isNaN(toDate)) {
      const months =
        (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
        (toDate.getMonth() - fromDate.getMonth());
      totalMonths += months;
    }
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years} Y ${months} M`;
}
