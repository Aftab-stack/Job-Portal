import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage, AvatarBadge } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { LogOut, User, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store.js";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { setUser } from "../redux/authSlice.js";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="sticky top-0 z-50 w-full bg-white/95 px-4 py-3 shadow-sm ring-1 ring-gray-100 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Job<span className=" text-red-500">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 text-sm font-medium text-gray-700">
            {user && user.role == "recruiter" ? (
              <>
                <li className="transition hover:text-red-500">
                  {" "}
                  <Link to="/admin/companies">Companies</Link>{" "}
                </li>
                <li className="transition hover:text-red-500">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="transition hover:text-red-500">
                  {" "}
                  <Link to="/">Home</Link>{" "}
                </li>
                <li className="transition hover:text-red-500">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="transition hover:text-red-500">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text=muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div>
                  {user && user.role == "student" && (
                    <div>
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>{" "}
                      </Button>
                    </div>
                  )}

                  <div>
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      {" "}
                      <Link>Logout</Link>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
