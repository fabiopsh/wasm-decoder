import { Component, createSignal } from "solid-js";
import AboutNavigation from "../components/AboutNavigation";
import ProjectSpecsSection from "../components/ProjectSpecsSection";
import PromptHistorySection from "../components/PromptHistorySection";
import ValidationSection from "../components/ValidationSection";
import TheorySection from "../components/TheorySection";

const About: Component = () => {
	const [activeSection, setActiveSection] = createSignal("specs");

	const sections = [
		{ id: "specs", label: "Project Specifics", icon: "📋" },
		{ id: "prompts", label: "Prompt History", icon: "💬" },
		{ id: "validation", label: "Project Validation", icon: "✅" },
		{ id: "theory", label: "WASM & WAT Theory", icon: "📚" },
	];

	return (
		<div class="h-full flex flex-col md:row gap-6">
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
		</div>
	);
};

export default About;
