"use client";
import { useUser } from "../../context/UserContext";
export default function saved() {
  const { user } = useUser();
  return (
    <>
      <h1>Hello {user?.fullName}</h1>
    </>
  );
}
