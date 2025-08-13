"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EnhancedViewerInstance } from "../../global";

export interface ViewerProps {
	document: string | ArrayBuffer;
	toolbarConfig?: string;
}

export default function Viewer({ document, toolbarConfig }: ViewerProps) {
	const containerRef = useRef(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const viewerInstanceRef = useRef<EnhancedViewerInstance | null>(null);

	const handleConfirmDelete = useCallback(async () => {
		try {
			console.log("Deleting page at index:", currentPageIndex);
			if (viewerInstanceRef.current) {
				// Use Document Editor API to delete the current page
				await viewerInstanceRef.current.applyOperations([
					{
						type: "removePages",
						pageIndexes: [currentPageIndex],
					},
				] as never);
			}
			setShowDeleteModal(false);
		} catch (error) {
			console.error("Error deleting page:", error);
			alert("Failed to delete page. Please try again.");
			setShowDeleteModal(false);
		}
	}, [currentPageIndex]);

	const handleCancelDelete = useCallback(() => {
		setShowDeleteModal(false);
	}, []);

	useEffect(() => {
		const container = containerRef.current;

		const addPageToolbarItem = {
			type: "custom",
			id: "add-page-button",
			title: "Add Page",
			icon: "<svg xmlns='http://www.w3.org/2000/svg' height='24' width='24' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4' /></svg>",
			onPress: () => {
				if (viewerInstanceRef.current?.handleAddPageFromToolbar) {
					viewerInstanceRef.current.handleAddPageFromToolbar();
				}
			},
		};

		const deletePageToolbarItem = {
			type: "custom",
			id: "delete-page-button",
			title: "Delete Page",
			icon: "<svg xmlns='http://www.w3.org/2000/svg' height='24' width='24' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' /></svg>",
			onPress: () => {
				if (viewerInstanceRef.current?.handleDeletePageFromToolbar) {
					viewerInstanceRef.current.handleDeletePageFromToolbar();
				}
			},
		};

		const { NutrientViewer } = window;
		if (container && NutrientViewer) {
			// Use unknown type for toolbar items to avoid conflicts with SDK types
			let toolbarItems: unknown[];

			if (toolbarConfig === "edit") {
				toolbarItems = [
					{ type: "pager" },
					{ type: "zoom-out" },
					{ type: "zoom-in" },
					{ type: "zoom-mode" },
					{ type: "content-editor" },
					// { type: "document-editor" },
					addPageToolbarItem,
					deletePageToolbarItem,
					{ type: "export-pdf" },
				];
			} else {
				// Default to view mode
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
				toolbarItems: toolbarItems as never,
			})
				.then((instance: EnhancedViewerInstance) => {
					viewerInstanceRef.current = instance;

					// Auto-launch Content Editor if in edit mode
					if (toolbarConfig === "edit" && window.NutrientViewer) {
						const { NutrientViewer } = window;
						instance.setViewState((v) =>
							v.set("interactionMode", NutrientViewer.InteractionMode.CONTENT_EDITOR)
						);
					}

					// Store function references on the instance for toolbar items to use
					instance.handleAddPageFromToolbar = async () => {
						try {
							const pageIndex = instance.viewState.currentPageIndex;
							const pageInfo = instance.pageInfoForIndex(pageIndex);

							if (!pageInfo) {
								console.error("Could not get page info for index:", pageIndex);
								return;
							}

							const { width, height, rotation } = pageInfo;

							const operations: Array<Record<string, unknown>> = [
								{
									type: "addPage",
									afterPageIndex: pageIndex,
									pageWidth: width,
									pageHeight: height,
									rotateBy: rotation,
								},
							];

							// Add backgroundColor only if NutrientViewer is available
							if (window.NutrientViewer) {
								operations[0].backgroundColor = new window.NutrientViewer.Color(
									{
										r: 255,
										g: 255,
										b: 255,
									},
								);
							}

							await instance.applyOperations(operations as never);
							console.log("Page added successfully");
						} catch (error) {
							console.error("Error adding page:", error);
							alert("Failed to add page. Please try again.");
						}
					};

					instance.handleDeletePageFromToolbar = () => {
						setShowDeleteModal(true);
					};

					instance.handleEditTextFromToolbar = async () => {
						try {
							// Toggle content editor mode
							const currentInteractionMode = instance.viewState.interactionMode;
							const PSPDFKit = window.PSPDFKit;

							if (PSPDFKit) {
								if (
									currentInteractionMode ===
									PSPDFKit.InteractionMode.CONTENT_EDITOR
								) {
									// Exit content editor mode
									instance.setViewState(
										instance.viewState.set(
											"interactionMode",
											PSPDFKit.InteractionMode.PAN,
										),
									);
								} else {
									// Enter content editor mode
									instance.setViewState(
										instance.viewState.set(
											"interactionMode",
											PSPDFKit.InteractionMode.CONTENT_EDITOR,
										),
									);
								}
							}
							console.log("Content editor mode toggled");
						} catch (error) {
							console.error("Error toggling content editor:", error);
						}
					};

					// Track current page changes
					instance.addEventListener(
						"viewState.currentPageIndex.change",
						(pageIndex: number) => {
							setCurrentPageIndex(pageIndex);
						},
					);

					console.log(
						"Nutrient Viewer loaded successfully with page management",
					);
				})
				.catch((error: Error) => {
					console.error("Error loading Nutrient Viewer:", error);
				});
		}

		return () => {
			NutrientViewer?.unload(container);
		};
	}, [document, toolbarConfig]); // Only re-render when document or toolbar config changes

	// You must set the container height and width
	return (
		<div style={{ position: "relative", height: "100vh", width: "100%" }}>
			<div ref={containerRef} style={{ height: "100%", width: "100%" }} />

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
					}}
				>
					<div
						style={{
							backgroundColor: "white",
							borderRadius: "8px",
							padding: "24px",
							boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
							maxWidth: "400px",
							width: "90%",
						}}
					>
						<h3
							style={{
								margin: "0 0 16px 0",
								fontSize: "18px",
								fontWeight: "600",
								color: "#111827",
							}}
						>
							Delete Page
						</h3>
						<p
							style={{
								margin: "0 0 24px 0",
								fontSize: "14px",
								color: "#6b7280",
								lineHeight: "1.5",
							}}
						>
							Are you sure you want to delete page {currentPageIndex + 1}?
						</p>
						<div
							style={{
								display: "flex",
								gap: "12px",
								justifyContent: "flex-end",
							}}
						>
							<button
								type="button"
								onClick={handleCancelDelete}
								style={{
									padding: "8px 16px",
									backgroundColor: "#f3f4f6",
									color: "#374151",
									border: "1px solid #d1d5db",
									borderRadius: "6px",
									cursor: "pointer",
									fontSize: "14px",
									fontWeight: "500",
								}}
							>
								No, Cancel
							</button>
							<button
								type="button"
								onClick={handleConfirmDelete}
								style={{
									padding: "8px 16px",
									backgroundColor: "#dc2626",
									color: "white",
									border: "1px solid #dc2626",
									borderRadius: "6px",
									cursor: "pointer",
									fontSize: "14px",
									fontWeight: "500",
								}}
							>
								Yes, Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
