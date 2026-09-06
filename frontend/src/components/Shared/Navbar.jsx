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
import { setLoading, setUser } from "../redux/authSlice.js";
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
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Job<span className="text-blue-600">Portal</span>
          </h1>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-8">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600 sm:gap-x-5">
            {user && user.role == "recruiter" ? (
              <>
                <li className="transition-colors hover:text-blue-600 active:text-blue-700">
                  {" "}
                  <Link to="/admin/companies">Companies</Link>{" "}
                </li>
                <li className="transition-colors hover:text-blue-600 active:text-blue-700">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="transition-colors hover:text-blue-600 active:text-blue-700">
                  {" "}
                  <Link to="/">Home</Link>{" "}
                </li>
                <li className="transition-colors hover:text-blue-600 active:text-blue-700">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="transition-colors hover:text-blue-600 active:text-blue-700">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="rounded-lg border-slate-200 px-4 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-lg bg-blue-600 px-4 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger className="rounded-full outline-none ring-offset-2 transition focus-visible:ring-2 focus-visible:ring-blue-500">
                <Avatar className="cursor-pointer ring-2 ring-white shadow-sm">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded-xl border-slate-200 p-4 shadow-lg">
                <div className="flex gap-3 border-b border-slate-100 pb-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 pt-3">
                  {user && user.role == "student" && (
                    <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700">
                      <User2 className="size-4" />
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm font-medium text-inherit no-underline hover:no-underline"
                      >
                        <Link to="/profile">View Profile</Link>{" "}
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 active:bg-red-100">
                    <LogOut className="size-4" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="h-auto p-0 text-sm font-medium text-inherit no-underline hover:no-underline"
                    >
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
