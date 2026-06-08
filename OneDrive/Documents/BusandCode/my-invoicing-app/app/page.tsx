import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col justify-center text-center gap-6 items-center h-screen mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold">Invoicipedia</h1>
        <Button asChild>
          <Link href="/dashboard">Sign In</Link>
        </Button>
    </main>
  );
}
