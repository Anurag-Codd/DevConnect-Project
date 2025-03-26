import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { LoaderCircle } from "lucide-react";
import { newProject } from "@/store/features/project.slice";

const CreateProject = () => {
  const { isLoading } = useSelector((state) => state.project);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      dispatch(newProject(formData));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:scale-102">
          <p>New</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max:h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <DialogTitle className="text-center text-white">
          Create New Project
        </DialogTitle>

        <form onSubmit={handleProjectSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <input
              name="title"
              className="border p-2 w-full rounded mt-2 text-gray-200"
              placeholder="Enter a title..."
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-white">
              description
            </Label>
            <Textarea
              name="description"
              placeholder="Write your post"
              className="h-40 resize-none mt-2 text-gray-100"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="techStack" className="text-white">
              Tech Skills
            </Label>
            <input
              name="techStack"
              className="border p-2 w-full rounded mt-2 text-sm font-medium text-gray-200"
              placeholder="e.g., Node.js, UI/UX, Python"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="techStack" className="text-white">
              Github Repository
            </Label>
            <input
              name="github_repo"
              className="border p-2 w-full rounded mt-2 text-sm font-medium text-gray-200"
              placeholder="paste repo link here..."
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <DialogFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <LoaderCircle className="mr-2 animate-spin" size={20} />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full text-gray-200 border-2 shadow-md shadow-gray-600 border-gray-900 transition-transform duration-300 ease-in-out active:scale-98"
              >
                Create
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
