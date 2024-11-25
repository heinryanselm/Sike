import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            Sike!
          </motion.div>
        </Link>
        <div className="flex gap-4">
          <Link href="/create">
            <Button variant="secondary">Create Game</Button>
          </Link>
          <Link href="/join">
            <Button>Join Game</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
