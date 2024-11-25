import { motion } from "framer-motion";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900 mb-8"
        >
          Welcome to Sike!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-12"
        >
          The ultimate party game where trivia meets fun!
        </motion.p>
        <div className="flex gap-6 justify-center">
          <Link href="/create">
            <Button>Create Game</Button>
          </Link>
          <Link href="/join">
            <Button variant="secondary">Join Game</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
