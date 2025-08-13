"use client";

import { useEffect, useRef } from "react";

export interface ViewerProps {
	document: string | ArrayBuffer;
	toolbarConfig?: string;
}

export default function Viewer({ document, toolbarConfig }: ViewerProps) {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;

		const { NutrientViewer } = window;
		if (container && NutrientViewer) {
			let toolbarItems;
			
			if (toolbarConfig) {
				try {
					console.log('Parsing toolbar config:', toolbarConfig);
					toolbarItems = JSON.parse(toolbarConfig);
					console.log('Parsed toolbar items:', toolbarItems);
				} catch (error) {
					console.warn('Failed to parse toolbar config, using default:', error);
					toolbarItems = [
						{ type: "pager" },
						{ type: "zoom-out" },
						{ type: "zoom-in" },
						{ type: "zoom-mode" },
					];
				}
			} else {
				console.log('No toolbar config provided, using default');
				toolbarItems = [
					{ type: "pager" },
					{ type: "zoom-out" },
					{ type: "zoom-in" },
					{ type: "zoom-mode" },
				];
			}

			NutrientViewer.load({
				container,
				document: document,
				licenseKey: process.env.NEXT_PUBLIC_WEB_SDK_KEY || "",
				toolbarItems: toolbarItems,
			});
		}

		return () => {
			NutrientViewer?.unload(container);
		};
	}, [document, toolbarConfig]);

	// You must set the container height and width
	return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
}
