"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { type ComponentType, useState } from "react";

type ViewerProps = { document: string | ArrayBuffer; toolbarConfig?: string };

const Viewer = dynamic(() => import("./Viewer"), { ssr: false }) as ComponentType<ViewerProps>;

export default function AddDocuments() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<"view" | "edit">("edit");

	const handleEditClick = () => {
		setModalMode("edit");
		setIsModalOpen(true);
	};

	const handleViewClick = () => {
		setModalMode("view");
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	return (
		<section
			className="mb-4"
			style={{ borderBottom: "1px solid rgb(169, 169, 169)" }}
		>
			<div className="flex justify-between items-center pb-2 pt-6">
				<h2
					className="text-ds-h3 font-medium text-ds-dark font-ds-indigo"
					style={{ fontSize: "20px", lineHeight: "25px" }}
				>
					Add documents
				</h2>
				<button type="button" className="text-gray-500 rotate-180">
					<Image
						src="/icon-element-chevronUp.svg"
						alt="Expand"
						width={16}
						height={16}
					/>
				</button>
			</div>
			<div className="py-6 flex gap-6 items-start">
				<div className="flex-none">
					<div className="w-50">
						<div className="relative bg-gray-100 border border-gray-200 rounded-lg overflow-hidden h-70 group">
							<div className="relative h-full flex flex-col">
								<div className="flex-1 overflow-hidden">
									<Image
										src="/document-preview.png"
										alt="Document preview"
										width={200}
										height={280}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="bg-white p-3 border-t border-gray-200 flex justify-between items-start">
									<div>
										<h3 className="text-sm font-medium text-gray-900 mb-1">
											Business Consultant A...
										</h3>
										<div className="text-xs text-gray-600">24 pages</div>
									</div>
									<button type="button" className="text-gray-500 text-base">
										⋮
									</button>
								</div>
								<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
									<div className="flex flex-col gap-2">
										<button
											type="button"
											className="bg-black bg-opacity-80 text-white px-4 py-2 rounded text-sm cursor-pointer"
											onClick={handleViewClick}
										>
											View
										</button>
										<button
											type="button"
											className="bg-black bg-opacity-80 text-white px-4 py-2 rounded text-sm cursor-pointer"
											onClick={handleEditClick}
										>
											Edit
										</button>
									</div>
								</div>
								<button
									type="button"
									className="absolute top-2 right-2 bg-black bg-opacity-60 text-white w-6 h-6 rounded-full flex items-center justify-center"
								>
									<Image
										src="/icon-element-close.svg"
										alt="Remove"
										width={12}
										height={12}
										className="invert"
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					className="flex-1 min-h-70 rounded-lg flex flex-col items-center justify-center hover:bg-purple-50 transition-colors"
					style={{ backgroundColor: "rgb(240, 239, 241)" }}
				>
					<div
						className="mb-4 flex p-2 rounded-xl border border-white border-opacity-10"
						style={{ backgroundColor: "rgba(26, 29, 32, 0.1)" }}
					>
						<Image
							src="/file-drop-zone-text-image.svg"
							alt="Upload"
							width={24}
							height={24}
							className="text-gray-300"
						/>
					</div>
					<p className="text-base text-gray-600 mb-4">
						Drop your files here or
					</p>
					<button
						type="button"
						className="inline-flex items-center justify-center text-white rounded font-ds-indigo transition-colors duration-100"
						style={{
							backgroundColor: "#4c00fb",
							borderColor: "transparent",
							borderStyle: "solid",
							borderWidth: "1px",
							fontSize: "16px",
							fontWeight: 500,
							lineHeight: 1.5,
							minHeight: "40px",
							height: "40px",
							minWidth: "80px",
							paddingBlock: "8px",
							paddingInline: "12px 11px",
							transitionProperty: "background-color, border-color, color",
							transitionTimingFunction: "cubic-bezier(0.33, 0, 0.67, 1)",
						}}
					>
						Upload{" "}
						<Image
							src="/triangle-down.svg"
							alt=""
							width={12}
							height={12}
							className="ml-1"
						/>
					</button>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
						{/* Modal Header */}
						<div className="flex justify-between items-center p-4 border-b border-gray-200">
							<h3 className="text-lg font-medium text-gray-900">
								{modalMode === "edit" ? "Edit" : "View"}{" "}
								{process.env.NEXT_PUBLIC_DOCUMENT || "Document"}
							</h3>
							<button
								type="button"
								onClick={handleCloseModal}
								className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
							>
								×
							</button>
						</div>

						{/* Modal Body */}
						<div className="flex-1 overflow-hidden">
							<Viewer
								document={`/documents/${process.env.NEXT_PUBLIC_DOCUMENT || ""}`}
								toolbarConfig={
									(modalMode === "edit"
										? process.env.NEXT_PUBLIC_DOCUMENT_EDIT_CONFIG
										: process.env.NEXT_PUBLIC_DOCUMENT_VIEW_CONFIG) as string | undefined
								}
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
