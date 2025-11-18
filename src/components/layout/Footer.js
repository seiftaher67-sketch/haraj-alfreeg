
import React from 'react';

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-black text-white py-14 border-b border-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* right: about + logo */}
          <div className="flex-1 text-right">
            <div className="flex flex-col items-start gap-4">
              <img src="/assets/images/images/55PNG.PNG" alt="logo" className="h-20 w-20 object-cover shadow-md mt-[-20px] self-start" />
              <div className="text-right">
                <h4 className="text-lg font-semibold mt-[-5px]">شركة علي عبدالله الفريج</h4>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  <strong>
                    <span>شركة ومزاد علي عبدالله الفريج وأولاده للشاحنات والمعدات الثقيلة المستعملة من أبرز الشركات المتخصصة في بيع وشراء الشاحنات والمعدات الثقيلة في مدينة الرياض بالمملكة العربية السعودية، تحديدًا في حي السلي.</span><br />
                    <span>تتمتع الشركة بخبرة واسعة في مجال المركبات الثقيلة وتنظيم مزادات دورية لعرض الشاحنات والمعدات أمام العملاء والتجار، مما جعلها وجهة موثوقة للراغبين في البيع أو الشراء داخل السوق المحلي.</span>
                  </strong>
                </p>
                <div className="mt-4 flex items-right justify-start gap-2 text-sm text-yellow-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 7 7 13 7 13s7-6 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <a href="https://maps.app.goo.gl/XL6Jp84W9SLgSeoQ7?g_st=awb" className="text-blue-500 font-bold text-base hover:text-blue-300">الموقع الخاص بالفريج</a>
                </div>
              </div>
            </div>
          </div>

          {/* center: useful links */}
          <div className="flex-1 text-right ml-[20px] mt-20">
            <h4 className="text-lg font-semibold mb-4 text-center">الدعم الفني</h4>
            <ul className="space-y-3 text-center">
              <li><a href="/terms-and-conditions" className="text-base font-medium text-white underline"> الشروط والاحكام</a></li>
              <li><a href="/complaints" className="text-base font-medium text-white underline"> الشكاوي والمقترحات</a></li>
              <li><a href="/faq" className="text-base font-medium text-white underline"> الاسئلة الشائعة</a></li>
              {/* <li><a href="#" className="text-base font-medium text-white underline">حساب و سداد رسوم الموقع</a></li> */}
            </ul>
            <div className="mt-[50px] text-center text-white text-sm">
              © ELFouriaj Group NO.0.1 , 2024-10-13
              <div className="mt-2">الرقم الضريبي 300710482300003</div>
            </div>
          </div>

          {/* left: contact */}
          <div className="flex-1 text-right mt-20">
            <h4 className="text-lg font-semibold mb-4 text-center">تواصل معنا</h4>
            <ul className="space-y-3 text-center">
              <li className="flex items-center gap-3 justify-center">
                <span className="text-yellow-400">📞</span>
                <a href="tel:0501030614" className="text-lg font-semibold text-white underline">0501030614</a>
              </li>
              <li className="flex items-center gap-3 justify-center">
                <span className="text-yellow-400">💬</span>
                <a href="https://wa.me/966501030614" target="_blank" rel="noreferrer" className="text-lg font-semibold text-white underline">wa.me/966501030614</a>
              </li>
              <li className="flex items-center gap-3 justify-center">
                <span className="text-yellow-400">👻</span>
                <a href="https://snapchat.com/add/alforij01" target="_blank" rel="noreferrer" className="text-lg font-semibold text-white underline">snapchat.com/add/alforij01</a>
              </li>
            </ul>
          </div>
        </div>

        {/* White transparent separator line */}
        <div className="w-full h-px bg-white/50 mt-8"></div>

        {/* Atlas image below the line, extreme left */}
        <div className="flex justify-start mt-4 items-center">
          <a href="https://atlas-data.sa/" target="_blank" rel="noopener noreferrer">
            <img src="/atlas.png" alt="atlas" className="h-10 w-10" />
          </a>
          <span className="text-white/50 text-xs mr-2">حقوق النشر 2024-2025 أطلس البيانات. جميع الحقوق محفوظة</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

