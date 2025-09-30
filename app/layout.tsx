import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Nutrient Web SDK",
	description: "Nutrient Web SDK Template",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const webSDKVersion = process.env.NEXT_PUBLIC_WEB_SDK_VERSION || "1.7.0";
	const cdnUrl = `https://cdn.cloud.pspdfkit.com/pspdfkit-web@${webSDKVersion}/nutrient-viewer.js`;

	return (
		<html lang="en">
			<head>
				{/* DNS prefetch and preconnect for faster CDN connection */}
				<link rel="dns-prefetch" href="//cdn.cloud.pspdfkit.com" />
				<link
					rel="preconnect"
					href="https://cdn.cloud.pspdfkit.com"
					crossOrigin=""
				/>

				{/* Preload the script to start downloading immediately */}
				<link rel="preload" href={cdnUrl} as="script" crossOrigin="" />

				{/* Load the script before page becomes interactive */}
				<Script src={cdnUrl} strategy="beforeInteractive" />
			</head>
			<body className="antialiased">{children}</body>
		</html>
	);
}
