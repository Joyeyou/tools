import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
	title: "实用工具集",
	description: "一个包含待办事项、计时器和番茄钟的实用工具集",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="zh" className={`${geist.variable}`}>
			<body className="min-h-screen flex flex-col bg-gray-50">
				<header className="sticky top-0 z-10 backdrop-blur-md bg-white/90 border-b border-gray-100">
					<div className="container mx-auto max-w-3xl flex items-center justify-between h-14 px-4">
						<Link href="/" className="text-lg font-medium text-gray-900">
							实用工具集
						</Link>
						<nav className="hidden md:flex gap-6">
							<Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">首页</Link>
							<Link href="/todo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">待办事项</Link>
							<Link href="/timer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">计时器</Link>
							<Link href="/pomodoro" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">番茄钟</Link>
						</nav>
					</div>
				</header>
				
				<div className="flex-1">
					{children}
				</div>
				
				<Navbar />
				<Toaster 
					position="top-center" 
					richColors 
					closeButton 
					toastOptions={{
						style: { 
							borderRadius: '12px', 
							overflow: 'hidden',
							padding: '16px',
							fontWeight: 500,
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
						}
					}}
				/>
			</body>
		</html>
	);
}
