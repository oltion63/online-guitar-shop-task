"use client";
import Footer from "@/components/Footer";
import Mobile from "@/components/pageOne/Mobile";
import WhyVibeString from "@/components/pageOne/WhyVibeString";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link"
import {useTranslation} from "react-i18next";

const { data } = await client.query({
    query: gql`
      query {
        findAllBrands {
          id
          name
          image
        }
      }
    `,
});
const brands = data.findAllBrands;
export default function BrandsPage() {
    const { t } = useTranslation();


    return (
        <main>
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
                    <span className="text-center text-[56px] leading-snug font-bold ">{t("Browse top quality")} <br/><span
                        className="text-[#FF6428]">{t("Guitars")}</span> {t("online")}</span>
                    <div className="flex justify-start pl-4">
                        <span className="text-center text-base text-[#666666]">
                            {t("Explore 50k+ latest collections of branded guitars")} <br/> {t("online with VibeStrings.")}
                        </span>
                    </div>
                </section>
                <div className="absolute top-0 right-0 ">
                    <img src="images/first.jpg" alt="foto"
                         className="w-[586] h-[672] rounded-bl-[360px] rounded-br-[151px] "/>
                    <div
                        className="absolute -bottom-7 right-1/4 -translate-x-1/3
                            w-16 h-16 bg-white rounded-full flex justify-center items-center ">
                        <svg width="24" height="24" className="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M12.1283 12.6225C11.7991 18.9144 6.50734 23.9268 0 24V0C6.50734 0.0732559 11.7991 5.08552 12.1283 11.3775C12.4532 5.16846 17.6107 0.205631 24 0.00548954V23.9946C17.6107 23.7945 12.4532 18.8316 12.1283 12.6225Z"
                                  fill="#FF6428"/>
                        </svg>
                    </div>
                </div>
            </div>

            <section className="mt-96">
                <div className="text-center grid">
                    <span className="text-[44px] font-bold" >{t("Featuring the")} <span className="text-[#FF6428]">{t("Best Brands")}</span> </span>
                    <span className="text-[#666666]">{t("Select your preferred brand and explore our exquisite collection.")}</span>
                </div>
            </section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 mb-20 mt-10">
                {brands.map((brand: any) => (
                    <Link key={brand.id} href={`/models?brandId=${brand.id}`} passHref>
                        <div className="flex justify-center items-center  hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="h-28 w-44 object-contain grayscale"
                            />
                        </div>
                    </Link>
                ))}
            </div>

            <WhyVibeString/>

            <Mobile/>

            <Footer/>

        </main>
    )
}
