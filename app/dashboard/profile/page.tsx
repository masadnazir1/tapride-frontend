"use client";
import { useUser } from "../../context/UserContext";
export default function dashboard() {
  const { user } = useUser();
  return (
    <>
      <h1>Hello {user?.fullName}</h1>
    </>
  );
}
