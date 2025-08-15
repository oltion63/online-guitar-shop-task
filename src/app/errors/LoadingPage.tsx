"use client";

import { Loader2 } from "lucide-react";

export default function LoadingPage() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[#FFF3EE]">
            {/* Gradient Circle */}
            <div className="relative w-[200px] h-[200px] rounded-full bg-gradient-to-t from-[#FF5B1C] to-[#FF8C60] flex items-center justify-center shadow-lg">
                <Loader2 className="text-white w-14 h-14 animate-spin" />
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.1283 12.6225C11.7991 18.9144 6.50734 23.9268 0 24V0C6.50734 0.0732559 11.7991 5.08552 12.1283 11.3775C12.4532 5.16846 17.6107 0.205631 24 0.00548954V23.9946C17.6107 23.7945 12.4532 18.8316 12.1283 12.6225Z"
                            fill="#FF6428"
                        />
                    </svg>
                </div>
            </div>

            {/* Text */}
            <h1 className="mt-8 text-3xl font-bold text-[#121212]">Loading...</h1>
            <p className="mt-4 text-lg text-[#666666] text-center max-w-md">
                Please hold on while we get your strings in tune.
            </p>
        </main>
    );
}
