import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.discover')}</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">{t('about.description')}</p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-blue-700 px-6 py-2 rounded shadow hover:bg-gray-200 transition">
            {t('about.watch_video')}
          </button>
          <button className="bg-transparent border border-white px-6 py-2 rounded hover:bg-white hover:text-blue-700 transition">
            {t('about.view_fact_sheet')}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('about.welcome')}</h2>
            <p
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: t('about.about_us_intro') }}
            />
            <p className="text-gray-700">{t('about.mission')}</p>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarT_H55fqgawVv_y8SRv4xxP7423TUEG8AA&s"
            alt="About us"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 text-center">{t('about.our_services')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-2">{t(`about.service_${index}`)}</h4>
                <p className="text-gray-600">{t(`about.service_${index}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 text-center">{t('about.our_values')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'innovation',
              'integrity',
              'customer_centricity',
              'collaboration',
              'excellence',
            ].map((valueKey, i) => (
              <div
                key={i}
                className="bg-blue-50 p-6 rounded shadow hover:bg-blue-100 transition"
              >
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  {t(`about.value_${valueKey}`)}
                </h4>
                <p className="text-gray-700">{t(`about.value_${valueKey}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
