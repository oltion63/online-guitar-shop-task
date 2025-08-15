import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
    const router = useRouter();
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[#FFF3EE]">
            <div
                className="relative w-[200px] h-[200px] rounded-full bg-gradient-to-t from-[#FF5B1C] to-[#FF8C60] flex items-center justify-center shadow-lg">
                <div className="absolute w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg
                        width="80"
                        height="80"
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

            <h1 className="mt-8 text-5xl font-bold text-[#121212]">Oops!</h1>
                <p className="mt-4 text-lg text-[#666666] text-center max-w-md">
                    Something went wrong while loading this page. Let’s take you back to where you left off.
                </p>

            <button
                onClick={() => router.back()}
                className="mt-6 inline-block bg-gradient-to-t from-[#FF5B1C] to-[#FF8C60] text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
            >
                ⬅ Go Back
            </button>

        </main>
    );
}
