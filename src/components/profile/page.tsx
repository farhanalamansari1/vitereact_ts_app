"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { cp } from "fs";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const getUserDetails = async (e: any) => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  const onlogout = async (e: any) => {
    e.preventDefault();
    try {
      await axios.get("/api/users/logout");
      toast.success("Log Out Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={onlogout}
        type="button"
        className="p-2 ml-2 mt-4 rounded bg-blue-500 text-black"
      >
        Log Out
      </button>

      <button
        onClick={getUserDetails}
        type="button"
        className="bg-green-500 mt-4 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
      >
       Get User Details
      </button>
    </div>
  );
}

export default ProfilePage;
