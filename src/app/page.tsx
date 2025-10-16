"use client";
import { useEffect } from "react";
import MainPage from "./main/[pageNumber]/page";

export default function Home() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return (
    <main>
      <div>
        <MainPage />
      </div>
    </main>
  );
}
