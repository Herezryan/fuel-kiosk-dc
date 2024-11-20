'use client'

import { useRouter } from 'next/navigation'

import { LeadGrid } from "./components/LeadGrid";
import { Login } from "./components/login/Login";

export default function Home() {
  const router = useRouter();

  return (
    <div >
      <main>
      <LeadGrid
        primaryContent={<Login/>}
        // secondaryTopContent={}
        // secondaryBottomLeftContent={}
        // secondaryBottomRightContent={}
      />
      
      </main>
      
    </div>
  );
}
