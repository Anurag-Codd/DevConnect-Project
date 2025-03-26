import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/features/project.slice";
import CreateProject from "@/components/CreateProject";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { admin, member, isLoading, error } = useSelector(
    (state) => state.project
  );
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (admin.length > 0) {
      setCurrentProject(admin[0]);
    } else if (member.length > 0) {
      setCurrentProject(member[0]);
    }
  }, [admin, member]);

  const handleProject = (project) => {
    setCurrentProject(project);
    setOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100 pt-20">
      <div className="container mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-6 border-b border-gray-700">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button className="w-60 flex items-center justify-between bg-gray-700 text-gray-300 hover:bg-gray-600 transition">
                {currentProject ? currentProject.title : "Select a project"}
                <ChevronsUpDown className="ml-2 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-gray-800 text-white shadow-md rounded-md">
              {isLoading ? (
                <p className="text-center text-gray-400">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <Command>
                  <CommandList>
                    {admin.length > 0 && (
                      <CommandGroup heading="Admin Projects">
                        {admin.map((project) => (
                          <CommandItem
                            key={project._id}
                            onSelect={() => handleProject(project)}
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition"
                          >
                            <span className="truncate">{project.title}</span>
                            {currentProject?._id === project._id && (
                              <Check className="ml-auto text-green-400" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                    {member.length > 0 && (
                      <CommandGroup heading="Member Projects">
                        {member.map((project) => (
                          <CommandItem
                            key={project._id}
                            onSelect={() => handleProject(project)}
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition"
                          >
                            <span className="truncate">{project.title}</span>
                            {currentProject?._id === project._id && (
                              <Check className="ml-auto text-green-400" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              )}
            </PopoverContent>
          </Popover>
          <CreateProject />
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mt-6 shadow-md">
          <h1 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
            {currentProject?.title || "No project selected"}
          </h1>

          <div className="p-4 rounded-lg flex flex-col lg:flex-row gap-4 mt-4">
            <div className="bg-gray-600 p-4 rounded-lg w-full lg:w-1/2 text-center h-60 flex items-center justify-center shadow-md">
              <p className="text-gray-300">Tasks</p>
            </div>
            <div className="bg-gray-600 p-4 rounded-lg w-full lg:w-1/2 text-center h-60 flex items-center justify-center shadow-md">
              <p className="text-gray-300">Chart</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-400 border-b border-gray-600 pb-2">
              Description
            </h2>
            <p className="p-4 bg-gray-800 rounded-md text-gray-300 mt-2 shadow">
              {currentProject?.description || "No description available."}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-400 border-b border-gray-600 pb-2 mb-2">
              Team Members
            </h2>
            <div className="flex gap-4 flex-wrap">
              {currentProject?.member?.map((team) => (
                <img
                  key={team.username}
                  src={team.avatar}
                  alt="Team Member"
                  className="w-12 h-12 rounded-full border-2 border-gray-600 shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;