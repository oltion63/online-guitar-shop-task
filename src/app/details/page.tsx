"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";
import Footer from "@/components/Footer";
import "swiper/css";
import "swiper/css/pagination";
import {useTranslation} from "react-i18next";
import ErrorPage from "@/app/errors/ErrorPage";
import LoadingPage from "@/app/errors/LoadingPage";

type Model = {
    id: string
    name: string
    type: string
    image: string
    description: string
    price: number
    specs: Specs
    musicians: Musician[]
}
type Specs = {
    bodyWood: string
    neckWood: string
    fingerboardWood: string
    pickups: string
    tuners: string
    scaleLength: string
    bridge: string
}
type Musician = {
    name: string
    musicianImage: string
    bands: string
}


const GET_MODEL_DETAILS = gql`
  query GetModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function Details(){
    const {t} = useTranslation();

    const searchParams = useSearchParams();
    const brandId = searchParams.get("brandId");
    const modelId = searchParams.get("modelId");

    const [model, setModel] = useState<Model | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<"specs" | "musicians">("specs");

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((model?.musicians?.length ?? 0) / 2);

    useEffect(() => {
        if (!brandId || !modelId) return;

        setLoading(true);

        client
            .query({
                query: GET_MODEL_DETAILS,
                variables: { brandId, modelId },
            })
            .then(({ data }) => {
                setModel(data.findUniqueModel);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [brandId, modelId]);

    if (!brandId || !modelId) return <ErrorPage/>;
    if (loading) return <LoadingPage/>;
    if (error) return <ErrorPage/>;
    if (!model) return <ErrorPage/>;



    return(
        <main>
            <Link href={`/models?brandId=${brandId}`} >
                <div className="absolute top-7 flex justify-start items-center space-x-3 left-8">
                    <span>
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.89797 1.6113V0.727235C6.89797 0.650608 6.7927 0.608292 6.7216 0.655183L0.55832 4.6821C0.505955 4.71617 0.463582 4.75979 0.434435 4.80964C0.405288 4.85949 0.390137 4.91425 0.390137 4.96974C0.390137 5.02523 0.405288 5.07999 0.434435 5.12984C0.463582 5.17969 0.505955 5.22331 0.55832 5.25738L6.7216 9.2843C6.79406 9.33119 6.89797 9.28887 6.89797 9.21224V8.32817C6.89797 8.27213 6.86652 8.21838 6.81457 8.18407L1.8927 4.97031L6.81457 1.75541C6.86652 1.7211 6.89797 1.66735 6.89797 1.6113Z"
                            fill="#9292A3"/>
                        </svg>
                    </span>
                    <span>{t("Back To List")}</span>
                </div>
            </Link>
            <div className="mt-[62px] ml-[120px] flex space-x-3 items-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.1497 14.7262C13.7657 22.0669 7.59189 27.9146 0 28V0C7.59189 0.0854653 13.7657 5.9331 14.1497 13.2738C14.5287 6.02987 20.5459 0.239902 28 0.00640446V27.9937C20.5459 27.7602 14.5287 21.9702 14.1497 14.7262Z"
                          fill="#FF6428"/>
                </svg>
                <span className="text-[24px] text-[#121212]">VibeStrings</span>
            </div>
            <div className="flex">
                <section className="text-center h-[194px] w-[580px] ml-[100px] mt-26 p-2">
                    <span className="text-center text-[56px] leading-snug font-bold ">{model.name}</span>
                </section>
                <div className="absolute top-0 right-0 w-[672px] h-[459px] rounded-bl-[360px] rounded-br-[151px] bg-gradient-to-t from-[#FF5B1C] to-[#FF8C60] flex justify-center items-center ">
                    <img src={model?.image} alt="" className="w-[477px] h-[249px] -rotate-45 object-contain"/>
                    <div
                        className="absolute -bottom-7 right-1/4 -translate-x-1/3
                            w-16 h-16 bg-white rounded-full flex justify-center items-center ">
                        <svg width="24" height="24" className="" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M12.1283 12.6225C11.7991 18.9144 6.50734 23.9268 0 24V0C6.50734 0.0732559 11.7991 5.08552 12.1283 11.3775C12.4532 5.16846 17.6107 0.205631 24 0.00548954V23.9946C17.6107 23.7945 12.4532 18.8316 12.1283 12.6225Z"
                                  fill="#FF6428"/>
                        </svg>
                    </div>
                </div>
            </div>

            <section className="mt-40">
                <div className="flex w-full">
                    <button
                        className={`w-full text-center text-[24px] py-2 ${
                            activeTab === "specs" ? "border-b-[5px] text-[#FF8A5D] border-[#FF8A5D] font-bold" : "text-[#9292A3]"
                        }`}
                        onClick={() => setActiveTab("specs")}
                    >
                        {t("Specifications")}
                    </button>
                    <button
                        className={`w-full text-center text-[24px] py-2 ${
                            activeTab === "musicians" ? "border-b-[5px] text-[#FF8A5D] border-[#FF8A5D] font-bold" : "text-[#9292A3]"
                        }`}
                        onClick={() => setActiveTab("musicians")}
                    >
                        {t("Who plays it?")}
                    </button>
                </div>
                <div className="my-6">
                    {activeTab === "specs" && (
                        <div className="p-32">
                            <span className="font-[300] text-[24px]">{model.description}</span>

                            <ul className="list-disc pl-16 space-y-1 py-16 text-[24px] font-[300]">
                                <li>{t("Body Wood")}: {model.specs.bodyWood}</li>
                                <li>{t("Neck Wood")}: {model.specs.neckWood}</li>
                                <li>{t("Fingerboard")}: {model.specs.fingerboardWood}</li>
                                <li>{t("Pickups")}: {model.specs.pickups}</li>
                                <li>{t("Tuners")}: {model.specs.tuners}</li>
                                <li>{t("Scale Length")}: {model.specs.scaleLength}</li>
                                <li>{t("Bridge")}: {model.specs.bridge}</li>
                            </ul>
                        </div>
                    )}

                    {activeTab === "musicians" && (
                        <div className="mt-32 mb-20">
                            <div className="flex justify-center space-x-11">
                                {model.musicians
                                    .slice((currentPage - 1) * 2, currentPage * 2)
                                    .map((musician: any, index: number) => (
                                        <div key={index} className="w-[492px] h-[549px] bg-[#FFEFE8] p-6 rounded-sm">
                                            <img
                                                src={musician.musicianImage}
                                                alt={musician.name}
                                                className="w-[444px] h-[444px] object-cover mx-auto rounded-sm"
                                            />
                                            <div className="font-medium text-[24px] text-[#666666] w-fit mx-auto py-6">
                                                {musician.name}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="flex justify-center items-center mt-20 space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <span
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
                                            currentPage === page ? "w-6 h-6 bg-[#D9D9D9]" : "bg-[#D9D9D9]"
                                        }`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    )}


                </div>
            </section>

            <Footer/>
        </main>
    )
}