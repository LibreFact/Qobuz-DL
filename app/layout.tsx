import { useState, useEffect } from 'react';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ParticlesComponent from "@/components/particles";
import { StatusBarProvider } from "@/lib/status-bar/context";
import StatusBarContainer from "@/components/status-bar/container";
import { FFmpegProvider } from "@/lib/ffmpeg-provider";
import SettingsForm from "@/components/ui/settings-form";
import { SettingsProvider } from "@/lib/settings-provider";
import { BackgroundProvider } from "@/lib/background-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.qobuz-dl.com/'), // Site URL
    title: {
        default: process.env.NEXT_PUBLIC_APPLICATION_NAME + " - temporary instances if anyone needs",
        template: process.env.NEXT_PUBLIC_APPLICATION_NAME!
    },
    description: "temporary qobuz-dl instances if anyone need ",
    openGraph: {
        images: process.env.NEXT_PUBLIC_APPLICATION_NAME!.toLowerCase() === "qobuz-dl"
            ? [{ url: '/logo/qobuz-banner.png', width: 650, height: 195, alt: 'Qobuz Logo' }]
            : [],
    },
    keywords: [
        `${process.env.NEXT_PUBLIC_APPLICATION_NAME!}`,
        "music",
        "downloader",
        "hi-res",
        "qobuz",
        "flac",
        "alac",
        "mp3",
        "aac",
        "ogg",
        "wav"
    ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        // Set a timeout to hide the overlay after 60 seconds
        const timeout = setTimeout(() => {
            setShowOverlay(true);
        }, 60000); // 60 seconds

        return () => clearTimeout(timeout); // Clean up the timeout
    }, [showOverlay]);

    const handleClick = () => {
        // Open the link in a new tab
        window.open("https://www.effectiveratecpm.com/hth2qe2wzk?key=077a7c4eb85b433782d1c47ff1bfacb3", "_blank");

        // Hide the overlay after the first click
        setShowOverlay(false);

        // Reset the overlay after 60 seconds
        setTimeout(() => {
            setShowOverlay(true);
        }, 60000);
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <FFmpegProvider>
                    <StatusBarProvider>
                        <SettingsProvider>
                            <BackgroundProvider>
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="dark"
                                    enableSystem
                                >
                                    <ParticlesComponent className="z-[-1] h-full w-full fixed" />
                                    <div className="fixed justify-between items-center flex w-full max-w-screen p-4 z-[10]">
                                        <SettingsForm />
                                    </div>
                                    <div className="flex flex-col min-h-screen">
                                        <main className="px-6 pb-12 pt-32 md:pt-24 2xl:pt-60 min-h-full flex-1 flex flex-col items-center justify-center gap-2 z-[2] overflow-x-hidden max-w-screen overflow-y-hidden">
                                            {children}
                                        </main>
                                        <Toaster />
                                        <StatusBarContainer />
                                    </div>

                                    {/* Invisible overlay */}
                                    {showOverlay && (
                                        <div
                                            onClick={handleClick}
                                            className="fixed top-0 left-0 w-full h-full bg-black opacity-0 cursor-pointer z-[100]"
                                        ></div>
                                    )}
                                </ThemeProvider>
                            </BackgroundProvider>
                        </SettingsProvider>
                    </StatusBarProvider>
                    <script src="https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.9.7/dist/ffmpeg.min.js"></script>
                </FFmpegProvider>
                {/* Add your script tag here */}
                <script type="text/javascript" src="//pl26009661.effectiveratecpm.com/04/36/63/0436631f8d65208b0ad5eda6e309d4b5.js" crossOrigin="anonymous"></script>
                <script type="text/javascript" src="//pl26009657.effectiveratecpm.com/77/c3/48/77c3486a254ed77447696eac531872e6.js" crossOrigin="anonymous"></script>
            </body>
        </html>
    );
}
