"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";

const Profile = () => {
  const [currUser, setCurrUser] = useState<null | string>(null);

  const getuser = async () => {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();
    if (userData?.data?.user) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userData.data.user.id)
        .single();
      setCurrUser(data.username);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  return (
    <>
      { currUser? (<div className="py-2 w-64 ms-3 ps-2 mt-3 mb-4 hover:dark:bg-[#2b2a2a] hover:bg-slate-300 hover:cursor-pointer me-5 rounded-lg flex items-center gap-2">
        <img
          className="h-8 w-8 rounded-full"
          src="https://i.pinimg.com/736x/71/f8/11/71f811a36fdbe4470af6ce0dba53fa25.jpg"
          alt="user image"
        ></img>
        <p className="text-sm font-semibold">{currUser}</p>
      </div>):
      (<div className="relative flex items-center w-full animate-pulse gap-2 p-4">
        <div className="h-8 w-8 rounded-full bg-[#2b2a2a]" />
        <div className="flex-1">
          <div className="mb-1 h-3 w-3/5 rounded-lg bg-[#2b2a2a] text-lg" />
          <div className="h-3 w-[90%] rounded-lg bg-[#2b2a2a] text-sm" />
        </div>
      </div>)}
    </>
  );
};

export default Profile;
