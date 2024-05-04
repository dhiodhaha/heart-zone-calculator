import { Calculate } from "@/components/Calculate";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-indigo-600 h-screen ">
      <Calculate />
    </div>
  );
}
