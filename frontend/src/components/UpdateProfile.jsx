import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  LoaderCircle,
  Camera,
  Linkedin,
  Github,
  Twitter,
  Globe,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    avatar: user.avatar || "/default-avatar.png",
    username: user.username || "",
    email: user.email || "",
    tagline: user.tagline || "",
    bio: user.bio || "",
    skills: user.skills ? user.skills.join(", ") : "",
    linkedin: user.social?.linkedin || "",
    github: user.social?.github || "",
    twitter: user.social?.twitter || "",
    portfolio: user.social?.portfolio || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Updating profile with data:", formData);
      setTimeout(() => setIsLoading(false), 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-4 text-gray-200 hover:bg-gray-800 transition px-4 py-2 rounded-md">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <DialogTitle className="text-center text-gray-200 text-xl font-bold mb-4">
          Edit Profile
        </DialogTitle>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-full h-full rounded-lg object-cover border-2 border-gray-600"
              />
              <label className="absolute bottom-1 right-1 bg-gray-800 p-2 rounded-full cursor-pointer">
                <Camera size={18} className="text-gray-400" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="text-gray-200" />
            <Input name="email" value={formData.email} disabled className="text-gray-200"/>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Input name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Tagline" className="input-field" />
            <Textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              placeholder="Bio" 
              className="input-field h-32 overflow-y-auto resize-none" 
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Skills (comma-separated)</label>
            <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="JavaScript, React, Node.js" className="input-field" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { name: "linkedin", icon: <Linkedin size={20} className="text-gray-400" /> },
              { name: "github", icon: <Github size={20} className="text-gray-400" /> },
              { name: "twitter", icon: <Twitter size={20} className="text-gray-400" /> },
              { name: "portfolio", icon: <Globe size={20} className="text-gray-400" /> },
            ].map((social) => (
              <div key={social.name} className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-md">
                {social.icon}
                <Input
                  name={social.name}
                  value={formData[social.name]}
                  onChange={handleChange}
                  placeholder={`${social.name.charAt(0).toUpperCase() + social.name.slice(1)} URL`}
                  className="bg-gray-800 text-gray-200 placeholder-gray-400 border-none focus:ring-0 flex-1"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            {isLoading ? (
              <Button disabled className="w-full flex items-center justify-center bg-gray-700">
                <LoaderCircle className="mr-2 animate-spin" size={20} /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md">
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;