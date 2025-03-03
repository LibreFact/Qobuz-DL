import { useEffect } from "react";
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

// Metadata is for the server-side rendering context
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

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // useEffect will only run in the client-side environment
    useEffect(() => {
        // Check if we're in the browser
        if (typeof window !== 'undefined') {
            // Dynamically append the script tags in the browser only
            const script1 = document.createElement("script");
            script1.src = "//pl26009661.effectiveratecpm.com/04/36/63/0436631f8d65208b0ad5eda6e309d4b5.js";
            script1.type = "text/javascript";
            script1.async = true;
            document.body.appendChild(script1);

            const script2 = document.createElement("script");
            script2.src = "//pl26009657.effectiveratecpm.com/77/c3/48/77c3486a254ed77447696eac531872e6.js";
            script2.type = "text/javascript";
            script2.async = true;
            document.body.appendChild(script2);

            const script3 = document.createElement("script");
            script3.src = "//pl26017529.effectiveratecpm.com/9892ffd32f9cb817e6496cb53572d152/invoke.js";
            script3.type = "text/javascript";
            script3.async = true;
            script3.setAttribute("data-cfasync", "false");
            document.body.appendChild(script3);

            // Cleanup the scripts when the component unmounts
            return () => {
                document.body.removeChild(script1);
                document.body.removeChild(script2);
                document.body.removeChild(script3);
            };
        }
    }, []); // Empty dependency array means this effect runs once when component mounts

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
                                </ThemeProvider>
                            </BackgroundProvider>
                        </SettingsProvider>
                    </StatusBarProvider>
                    <script src="https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.9.7/dist/ffmpeg.min.js"></script>
                </FFmpegProvider>
            </body>
        </html>
    );
}
