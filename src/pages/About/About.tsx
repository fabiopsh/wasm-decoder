import { Component, createSignal } from "solid-js";
import AboutHeader from "./components/AboutHeader";
import AboutNavigation from "./components/AboutNavigation";
import ProjectSpecsSection from "./components/ProjectSpecsSection";
import PromptHistorySection from "./components/PromptHistorySection";
import ValidationSection from "./components/ValidationSection";
import TheorySection from "./components/TheorySection";

const About: Component = () => {
	const [activeSection, setActiveSection] = createSignal("specs");

	const sections = [
		{ id: "specs", label: "Project Specifics", icon: "📋" },
		{ id: "prompts", label: "Prompt History", icon: "💬" },
		{ id: "validation", label: "Project Validation", icon: "✅" },
		{ id: "theory", label: "WASM & WAT Theory", icon: "📚" },
	];

	return (
		<div class="min-h-screen bg-background text-onBackground font-sans flex flex-col">
			{/* Header */}
			<AboutHeader />

			<main class="container mx-auto p-4 md:p-6 flex flex-col md:row gap-6 flex-grow ">
				<div class="flex flex-col md:flex-row gap-6 h-full">
					{/* Sidebar Navigation */}
					<AboutNavigation sections={sections} activeSection={activeSection} onSectionChange={setActiveSection} />

					{/* Content Area */}
					<div class="flex-grow bg-surface rounded-2xl shadow-sm border border-outline/10 p-6 md:p-10 animate-fade-in overflow-y-auto max-h-[calc(100vh-180px)]">
						{activeSection() === "specs" && <ProjectSpecsSection />}
						{activeSection() === "prompts" && <PromptHistorySection />}
						{activeSection() === "validation" && <ValidationSection />}
						{activeSection() === "theory" && <TheorySection />}
					</div>
				</div>
			</main>

			<footer class="p-4 text-center text-outline text-sm">Project B07 - AI-Assisted Wasm Decoder</footer>
		</div>
	);
};

export default About;
