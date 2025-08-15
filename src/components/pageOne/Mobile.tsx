"use client";
import {useTranslation} from "react-i18next";

export default function Mobile(){
    const { t } = useTranslation();
    return (
        <section className="flex justify-center space-x-32 items-center py-24">
            <div>
                <div className="text-[48px] text-center">
                    {t("Browse and buy your")} <br/> <span
                    className="text-[#FF6428]">{t("favorite guitars")}</span> {t("with")} <br/> VibeStrings.
                </div>
                <div className="flex justify-start mt-10 space-x-8">
                    <img src="images/playstore.png" alt=""/>
                    <img src="images/appstore.png" alt=""/>
                </div>
            </div>
            <div>
                <img src="images/mobile.png" alt=""/>
            </div>
        </section>
    )
}