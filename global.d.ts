import type NutrientViewer from "@nutrient-sdk/viewer";
import type { Instance, PSPDFKit } from "@nutrient-sdk/viewer";

// Define the enhanced viewer instance type that extends the SDK's Instance
interface EnhancedViewerInstance extends Instance {
	handleAddPageFromToolbar?: () => Promise<void>;
	handleDeletePageFromToolbar?: () => void;
	handleEditTextFromToolbar?: () => Promise<void>;
}

// Define toolbar item types
interface ToolbarItem {
	type: string;
	id?: string;
	title?: string;
	icon?: string;
	onPress?: () => void;
}

declare global {
	interface Window {
		// Nutrient Web SDK will be available on window.NutrientViewer once loaded
		NutrientViewer?: typeof NutrientViewer;
		PSPDFKit?: typeof PSPDFKit;
	}
}

export type { EnhancedViewerInstance, ToolbarItem };
