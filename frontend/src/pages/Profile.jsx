import { useSelector } from "react-redux";
import { Github, Linkedin, Twitter, Globe, Youtube } from "lucide-react";
import UpdateProfile from "@/components/UpdateProfile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex justify-center items-center text-white p-6 bg-gray-950">
      <div className="relative w-full max-w-4xl text-center p-6 rounded-lg bg-gray-900 shadow-2xl">
        <UpdateProfile />
        <div className="flex flex-col items-center pt-10">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 md:w-32 md:h-32 rounded-md border border-yellow-500"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
          </h1>
          <p className="text-gray-400 text-md md:text-lg">{user.email}</p>
          <p className="text-gray-400 text-md md:text-lg">{user.tagline}</p>
          <span className="flex gap-2">
            <p className="text-gray-200 text-sm md:text-md bg-gray-800 p-1 rounded-md">
              Joined: {user.createdAt ? user.createdAt.substring(0, 10) : "N/A"}
            </p>
            <p className="text-gray-200 text-sm md:text-md bg-gray-800 p-1 rounded-md">
              Last updated:{" "}
              {user.updatedAt ? user.updatedAt.substring(0, 10) : "N/A"}
            </p>
          </span>
        </div>
        {user.bio && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-300">Bio</h2>
            <p className="text-gray-400 text-md">{user.bio}</p>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-4">
          {user.social?.linkedin && (
            <a
              href={user.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="text-blue-500 w-6 h-6 hover:scale-110 transition" />
            </a>
          )}
          {user.social?.github && (
            <a
              href={user.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="text-gray-300 w-6 h-6 hover:scale-110 transition" />
            </a>
          )}
          {user.social?.twitter && (
            <a
              href={user.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="text-blue-400 w-6 h-6 hover:scale-110 transition" />
            </a>
          )}
          {user.social?.portfolio && (
            <a
              href={user.social.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="text-green-400 w-6 h-6 hover:scale-110 transition" />
            </a>
          )}
          {user.social?.youtube && (
            <a
              href={user.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="text-red-500 w-6 h-6 hover:scale-110 transition" />
            </a>
          )}
        </div>
        <div className="mt-6 text-left">
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-300">Skills</h2>
              <Button>Add Skills</Button>
            </div>
            <Separator />
            {user.skills?.length > 0 ? (
              <ul className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-yellow-500 px-3 py-1 rounded-md text-sm text-gray-900"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-md mt-2">No skills added yet.</p>
            )}
          </div>

          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-300">Projects</h2>
              <Button>Add Projects</Button>
            </div>
            <Separator />
            {user.projects?.length > 0 ? (
              <ul className="list-disc list-inside text-gray-300 text-md mt-2">
                {user.projects.map((project, index) => (
                  <li key={index}>
                    <a
                      href={project.link}
                      className="text-blue-400 hover:underline"
                    >
                      {project.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-md mt-2">
                No projects added yet.
              </p>
            )}
          </div>
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-300">Education</h2>
              <Button>Add Eduction</Button>
            </div>

            <Separator />
            {user.education?.length > 0 ? (
              <ul className="list-disc list-inside text-gray-300 text-md mt-2">
                {user.education.map((edu, index) => (
                  <li key={index}>
                    {edu.degree} in {edu.fieldOfStudy} at {edu.school} (
                    {edu.from.substring(0, 10)} -{" "}
                    {edu.current
                      ? "Present"
                      : edu.to
                      ? edu.to.substring(0, 10)
                      : "N/A"}
                    )
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-md mt-2">
                No education added yet.
              </p>
            )}
          </div>
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-300">
                Experience
              </h2>
              <Button>Add Experience</Button>
            </div>
            <Separator />
            {user.experience?.length > 0 ? (
              <ul className="list-disc list-inside text-gray-300 text-md mt-2">
                {user.experience.map((exp, index) => (
                  <li key={index}>
                    {exp.title} at {exp.company} ({exp.from.substring(0, 10)} -{" "}
                    {exp.current
                      ? "Present"
                      : exp.to
                      ? exp.to.substring(0, 10)
                      : "N/A"}
                    )
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-md mt-2">
                No experience added yet.
              </p>
            )}
          </div>
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-300">Connections</h2>
            {user.connections?.length > 0 ? (
              <ul className="list-inside text-gray-300 text-md mt-2">
                {user.connections.map((conn, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{conn.user}</span>
                    <span
                      className={`text-${
                        conn.status === "accepted" ? "green" : "yellow"
                      }-400`}
                    >
                      {conn.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-md mt-2">No connections yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
