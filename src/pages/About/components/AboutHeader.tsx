import { Component } from "solid-js";
import { A } from "@solidjs/router";

const AboutHeader: Component = () => {
	return (
		<header class="bg-surface text-primary p-4 shadow-sm border-b border-outline/10 z-10">
			<div class="container mx-auto flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-onPrimary font-bold text-lg">
						W
					</div>
					<h1 class="text-2xl font-bold tracking-tight">
						Wasm Decoder
						<span class="text-sm font-normal opacity-70 ml-2">About the Project</span>
					</h1>
				</div>
				<A
					href="/"
					class="px-4 py-2 bg-primary text-onPrimary rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
				>
					Back to Decoder
				</A>
			</div>
		</header>
	);
};

export default AboutHeader;
