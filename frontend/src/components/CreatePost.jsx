import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {
  BadgePercent,
  BriefcaseBusiness,
  NotepadText,
  X,
  Plus,
  FileText,
  LoaderCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "@/store/features/post.slice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);
  const [type, setType] = useState("post");
  const [fileData, setFileData] = useState({ file: null, previewUrl: null });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (
      selectedFile.type.startsWith("image/") ||
      selectedFile.type === "application/pdf"
    ) {
      setFileData({
        file: selectedFile,
        previewUrl: selectedFile.type.startsWith("image/")
          ? URL.createObjectURL(selectedFile)
          : null,
      });
    }
  };

  const removeFile = () => {
    if (fileData.previewUrl) {
      URL.revokeObjectURL(fileData.previewUrl);
    }
    setFileData({ file: null, previewUrl: null });
  };

  const postAction = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      formData.append("type", type)
      if (fileData.file) {
        formData.append("asset", fileData.file);
      }
    
      await dispatch(createPost(formData));
    } catch (error) {
      console.log(error.message || "Failed to create post. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-12 rounded-lg border border-gray-300 bg-white flex items-center text-gray-600 text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-100 transition">
          Create Post, Ask Questions, and Post Collaboration Requests
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full h-[90vh] overflow-auto">
        <DialogTitle className="text-center">Create New Post</DialogTitle>
        <ToggleGroup
          type="single"
          value={type}
          onValueChange={(value) => value && setType(value)}
          className="flex gap-4 justify-center w-full"
        >
          <ToggleGroupItem
            value="post"
            className="p-0 rounded-md border text-sm font-medium"
          >
            <NotepadText /> Post
          </ToggleGroupItem>
          <ToggleGroupItem
            value="question"
            className=" p-0 rounded-md border text-sm font-medium"
          >
            <BadgePercent /> Question
          </ToggleGroupItem>
          <ToggleGroupItem
            value="collaboration"
            className="p-0 rounded-md border text-sm font-medium"
          >
            <BriefcaseBusiness /> Collaboration
          </ToggleGroupItem>
        </ToggleGroup>
        <form onSubmit={postAction} className="space-y-6">
          {type === "collaboration" && (
            <div>
              <Label htmlFor="title">Title</Label>
              <input
                id="title"
                name="title"
                className="border p-2 w-full rounded mt-2"
                placeholder="Enter a title..."
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your post (supports Markdown)..."
              className="h-40 resize-none mt-2"
              required
            />
          </div>
          {type === "question" && (
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <input
                id="tags"
                name="tags"
                className="border p-2 w-full rounded mt-2 text-sm font-medium"
                placeholder="e.g., React, JavaScript, Web Dev"
              />
            </div>
          )}
          {type === "collaboration" && (
            <div>
              <Label htmlFor="techStack">Skills Required</Label>
              <input
                id="techStack"
                name="techStack"
                className="border p-2 w-full rounded mt-2 text-sm font-medium"
                placeholder="e.g., Node.js, UI/UX, Python"
              />
            </div>
          )}
          <div>
            <Label>Upload Images or PDFs</Label>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="relative p-2 flex items-center justify-center">
                {fileData.file ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {fileData.previewUrl ? (
                      <>
                        <img
                          src={fileData.previewUrl}
                          alt="preview"
                          className="max-w-full max-h-full object-contain rounded-md"
                        />
                        <button
                          type="button"
                          onClick={removeFile}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-600">
                        <FileText className="w-8 h-8" />
                        <p className="text-xs truncate w-full text-center overflow-hidden mt-2">
                          {fileData.file.name}
                        </p>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center text-gray-400">
                      <Plus className="w-8 h-8" />
                      <p className="text-sm mt-2">Click to upload</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <LoaderCircle className="mr-2 animate-spin" size={20} />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Create {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
