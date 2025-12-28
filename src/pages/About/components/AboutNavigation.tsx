import { Component, For } from "solid-js";

interface Section {
	id: string;
	label: string;
	icon: string;
}

interface AboutNavigationProps {
	sections: Section[];
	activeSection: () => string;
	onSectionChange: (sectionId: string) => void;
}

const AboutNavigation: Component<AboutNavigationProps> = (props) => {
	return (
		<nav class="w-full md:w-64 flex-shrink-0">
			<div class="bg-surface rounded-2xl shadow-sm border border-outline/10 overflow-hidden sticky top-6">
				<div class="p-4 border-b border-outline/5 bg-primary/5">
					<h2 class="font-bold text-primary">Navigation</h2>
				</div>
				<div class="p-2 space-y-1">
					<For each={props.sections}>
						{(section) => (
							<button
								onClick={() => props.onSectionChange(section.id)}
								class={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
									props.activeSection() === section.id
										? "bg-primary text-onPrimary shadow-md"
										: "hover:bg-surfaceVariant/50 text-onSurface/80"
								}`}
							>
								<span class="text-xl">{section.icon}</span>
								<span class="font-medium">{section.label}</span>
							</button>
						)}
					</For>
				</div>
			</div>
		</nav>
	);
};

export default AboutNavigation;
