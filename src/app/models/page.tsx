"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo} from "react";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";
import Footer from "@/components/Footer";
import {useTranslation} from "react-i18next";
import ErrorPage from "@/app/errors/ErrorPage";
import LoadingPage from "@/app/errors/LoadingPage";



const GET_MODELS = gql`
  query GetModelsByBrand($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
    }
  }
`;
const GET_BRAND = gql`
  query GetBrand($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      image
    }
  }
`;
type Brand = {
    id: string;
    name: string;
    image: string;
};
export default function Models() {
    const {t} = useTranslation();

    const searchParams = useSearchParams();
    const brandId = searchParams.get("brandId");

    const [brand, setBrand] = useState<Brand | null>(null);
    const [models, setModels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const PAGE_SIZE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const handleSelect = (type: string) => {
        setSelected(type);
        setSelectedType(type);
        setIsOpen(false);
    };

    const types = useMemo(() => {
        const uniqueTypes = Array.from(new Set(models.map((m) => m.type))).filter(Boolean);
        return uniqueTypes;
    }, [models]);

    const filteredModels = useMemo(() => {
        return models.filter((model) => {
            const matchesType = selectedType ? model.type === selectedType : true;
            const matchesSearch =
                searchTerm.length < 3
                    ? true
                    : model.name.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesType && matchesSearch;
        });
    }, [models, selectedType, searchTerm]);

    const totalPages = Math.ceil(filteredModels.length / PAGE_SIZE);
    const paginatedModels = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredModels.slice(start, start + PAGE_SIZE);
    }, [filteredModels, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedType]);


    useEffect(() => {
        if (!brandId) return;

        setLoading(true);

        client
            .query({
                query: GET_BRAND,
                variables: { id: brandId },
            })
            .then(({ data }) => {
                setBrand(data.findUniqueBrand);
            })
            .catch((err) => setError(err.message));

        client.query({
            query: GET_MODELS,
            variables: {
                id: brandId,
                sortBy: {
                    field: "name",
                    order: "ASC",
                },
            },
        })
            .then((result) => {
                setModels(result.data.findBrandModels);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [brandId]);

    if (!brandId) {
        return <ErrorPage/>;
    }

    if (loading) return <LoadingPage/>;
    if (error) return <ErrorPage/>;


    return (
        <main>
            <Link href={'/brands'} >
                <div className="absolute top-7 flex justify-start items-center space-x-3 left-8">
                    <span>
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.89797 1.6113V0.727235C6.89797 0.650608 6.7927 0.608292 6.7216 0.655183L0.55832 4.6821C0.505955 4.71617 0.463582 4.75979 0.434435 4.80964C0.405288 4.85949 0.390137 4.91425 0.390137 4.96974C0.390137 5.02523 0.405288 5.07999 0.434435 5.12984C0.463582 5.17969 0.505955 5.22331 0.55832 5.25738L6.7216 9.2843C6.79406 9.33119 6.89797 9.28887 6.89797 9.21224V8.32817C6.89797 8.27213 6.86652 8.21838 6.81457 8.18407L1.8927 4.97031L6.81457 1.75541C6.86652 1.7211 6.89797 1.66735 6.89797 1.6113Z"
                            fill="#9292A3"/>
                        </svg>
                    </span>
                    <span> {t("Back To Home")}</span>
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
                    <span className="text-center text-[56px] leading-snug font-bold ">{t("Play like a")} <span
                        className="text-[#FF6428]"> {t("Rock star")}</span> </span>
                    <div className="flex justify-start pl-4">
                        <span className="text-center text-base text-[#666666]">
                            {t("With a legacy dating back to the 1950s,")}<span> {brand?.name} </span>{t("blends expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance. Trusted by top artists worldwide,")}<span> {brand?.name} </span>{t("guitars are built to play fast, sound bold, and stand out on any stage.")}
                        </span>
                    </div>
                </section>
                <div className="absolute top-0 right-0 w-[672px] h-[459px] rounded-bl-[360px] rounded-br-[151px] bg-gradient-to-t from-[#FF5B1C] to-[#FF8C60] flex justify-center items-center ">
                    <img src={brand?.image} alt="" className="w-[451px] h-[280px] grayscale "/>
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


            <div className="mt-52 px-28">
                <div className="text-[44px] font-bold w-fit mx-auto">{t("Check out the")} <span
                    className="text-[#FF6428]">{t("Selection")}</span></div>

                <div className="relative flex justify-end space-x-10 mt-16 mb-32">
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            className={`flex items-center justify-between w-[333px] text-[28px] h-[74] p-2 border rounded 
                        ${selected ? "bg-[#FFEFE9] text-[#FF6C33] border-[#FF6C33] " : "bg-white text-[#D0D0D0] border-[#D0D0D0] "}`}
                        >
                            {selected || t("Filter By Type")}
                            <svg width="32" height="32" className={`${selected ? "fill-[#FF6C33]" : "fill-[#D0D0D0]"}`}
                                 viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M27.6933 8.125H25.3861C25.2292 8.125 25.0816 8.2019 24.9893 8.32803L16.2499 20.3743L7.5105 8.32803C7.41821 8.2019 7.27056 8.125 7.11367 8.125H4.80654C4.60659 8.125 4.4897 8.35264 4.60659 8.51567L15.4532 23.4689C15.8469 24.0104 16.6529 24.0104 17.0436 23.4689L27.8901 8.51567C28.0101 8.35264 27.8932 8.125 27.6933 8.125Z"
                                />
                            </svg>

                        </button>
                        {isOpen && (
                            <ul className="absolute z-10 w-[333px] mt-1 bg-white border border-[#FF6C33] rounded shadow-lg max-h-60 overflow-auto">
                                {types.map((type) => (
                                    <li
                                        key={type}
                                        onClick={() => handleSelect(type)}
                                        className={`p-2 cursor-pointer hover:bg-[#FF6C33] hover:text-white 
                                    ${selected === type ? "bg-[#FFEFE9] text-[#FF6C33]" : ""}`}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <span className="absolute inset-y-0 right-96 flex items-center pl-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                          />
                        </svg>
                      </span>
                    <input
                        type="text"
                        placeholder={t("Search by name")}
                        className="border border-[#D0D0D0] rounded p-2 w-[485] text-[28px] text-center"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paginatedModels.length === 0 ? (
                        <p className="text-center col-span-full">{t("No models found.")}</p>
                    ) : (
                        paginatedModels.map((model) => (
                        <Link key={model.id} href={`/details?brandId=${brandId}&modelId=${model.id}`} passHref>
                            <div key={model.id} className=" rounded p-4 ">
                                <img
                                    src={model.image}
                                    alt={model.name}
                                    className="w-full h-48 object-contain"
                                />
                                <h2 className="my-2 font-medium text-[16px]">{model.name}</h2>
                                <p className="text-[#666666] text-sm">${model.price}</p>
                            </div>
                        </Link>
                        ))
                    )}
                </div>

                <div className="flex justify-between items-center py-14">

                <p className="text-center mt-4 text-gray-600">
                    {t("Showing")} {paginatedModels.length} {t("results from")} {filteredModels.length}
                </p>

                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="h-8 w-8 flex justify-center items-center border border-[#E8E8E8] rounded disabled:opacity-50"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.89815 2.9843V1.92747C9.89815 1.83587 9.79288 1.78528 9.72178 1.84133L3.5585 6.6552C3.50614 6.69592 3.46377 6.74807 3.43462 6.80766C3.40547 6.86725 3.39032 6.93271 3.39032 6.99905C3.39032 7.06539 3.40547 7.13085 3.43462 7.19044C3.46377 7.25003 3.50614 7.30217 3.5585 7.3429L9.72178 12.1568C9.79425 12.2128 9.89815 12.1622 9.89815 12.0706V11.0138C9.89815 10.9468 9.86671 10.8825 9.81475 10.8415L4.89288 6.99973L9.81475 3.15657C9.86671 3.11555 9.89815 3.0513 9.89815 2.9843Z"
                                    fill="#9292A3"/>
                            </svg>

                        </button>

                        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={` border  rounded w-8 h-8 ${
                                    currentPage === page ? " border border-[#FF6428] text-[#FF6428] shadow-lg" : "bg-white border-[#E8E8E8] text-[#9292A3]"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 flex justify-center items-center border border-[#E8E8E8] rounded disabled:opacity-50"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.4685 6.65545L4.30527 1.84159C4.28917 1.82891 4.26981 1.82103 4.24943 1.81885C4.22905 1.81668 4.20847 1.8203 4.19005 1.82929C4.17164 1.83828 4.15613 1.85229 4.14531 1.8697C4.1345 1.88711 4.12881 1.90722 4.12891 1.92772V2.98456C4.12891 3.05155 4.16035 3.11581 4.21231 3.15682L9.13417 6.99999L4.21231 10.8432C4.15899 10.8842 4.12891 10.9484 4.12891 11.0154V12.0723C4.12891 12.1639 4.23418 12.2144 4.30527 12.1584L10.4685 7.34452C10.5209 7.30366 10.5633 7.25139 10.5924 7.19168C10.6216 7.13198 10.6367 7.06642 10.6367 6.99999C10.6367 6.93355 10.6216 6.86799 10.5924 6.80829C10.5633 6.74858 10.5209 6.69632 10.4685 6.65545Z"
                                    fill="#9292A3"/>
                            </svg>

                        </button>
                    </div>

                </div>

            </div>
            <Footer/>

        </main>


    );
}
