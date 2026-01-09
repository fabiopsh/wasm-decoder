import { Component, JSX, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";

interface LayoutProps {
	children?: JSX.Element;
}

const Layout: Component<LayoutProps> = (props) => {
	const location = useLocation();
	// Check for "about" in the pathname, robust to slashes
	const isAbout = () => {
		const path = location.pathname;
		return path === "/about" || path === "/about/" || path.endsWith("/about") || path.includes("/about/");
	};
	const isHome = () => !isAbout();

	return (
		<div class="min-h-screen bg-background text-onBackground font-sans flex flex-col">
			<header class="bg-surface text-primary p-4 shadow-sm border-b border-outline/10 z-10">
				<div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-onPrimary font-bold text-lg">
							W
						</div>
						<h1 class="text-2xl font-bold tracking-tight">
							Wasm Decoder
							<span class="text-sm font-normal opacity-70 ml-2">
								{isAbout() ? "About the Project" : "by Fabio Piscitelli M.715339 v1.0"}
							</span>
						</h1>
					</div>

					<nav class="flex items-center gap-2 bg-surfaceVariant/50 p-1 rounded-full border border-outline/10">
						<A
							href="/"
							class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
								isHome()
									? "bg-primary text-onPrimary shadow-sm"
									: "text-outline hover:text-primary hover:bg-primary/10"
							}`}
						>
							Decoder
						</A>
						<A
							href="/about"
							class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
								isAbout()
									? "bg-primary text-onPrimary shadow-sm white-space-nowrap"
									: "text-outline hover:text-primary hover:bg-primary/10"
							}`}
						>
							About
						</A>
					</nav>
				</div>
			</header>

			<main class="container mx-auto p-4 md:p-6 flex flex-col flex-grow">{props.children}</main>

			<footer class="p-4 text-center text-outline text-sm">Project B07 - AI-Assisted Wasm Decoder</footer>
		</div>
	);
};

export default Layout;
