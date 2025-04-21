import React from "react";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100">
      {/* Company Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t("about.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("about.overview")}
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("about.mission.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("about.mission.text")}
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/img/night.jpg"
              alt={t("about.mission.title")}
              className="w-full md:w-3/4 h-auto md:h-48 rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-10">
          <div className="flex justify-center md:justify-start">
            <img
              src="/img/nightwater.jpg"
              alt={t("about.vision.title")}
              className="w-full md:w-3/4 h-auto md:h-48 rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("about.vision.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("about.vision.text")}
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t("about.team.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-10">
            {t("about.team.members", { returnObjects: true }).map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={
                    index === 0 ? "/img/owner.png" :
                    index === 1 ? "/img/seo.jpeg" :
                    "/img/leade.jpg"
                  }
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  {member.name}
                </h3>
                <p className="text-gray-600 mt-2">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t("about.contact.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t("about.contact.text")}
          </p>
          <div className="space-x-4">
            <a
              href="mailto:info@example.com"
              className="text-lg text-blue-600 hover:underline"
            >
              {t("about.contact.email")}
            </a>
            <span className="text-lg text-gray-600">|</span>
            <a
              href="tel:+123456789"
              className="text-lg text-blue-600 hover:underline"
            >
              {t("about.contact.phone")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;