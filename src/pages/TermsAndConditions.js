import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-0 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="text-left mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">📜 الشروط والأحكام</h1>
        </div>
        <div className="text-right text-black font-bold leading-relaxed">
          <p className="mb-4">
            تطبيق مزاد الفريج يعمل كوسيط بين الطرفين ( البائع - المشتري ( بحيث يتيح للراغبين ببيع مركباتهم وعرضها في التطبيق ، ويكون للراغب
بالشراء خيار المزايدة على المركبات، حيث يتم استلام المركبات وعرضها وفتح باب المزايدة عليه خلال أوقات تحددها الشركة وفقا
لهذه الشروط والاحكام ويعتبر البيع من خلال مزاد الفريج الالكتروني بيعا شرعيا يلزم توافر الايجاب والقبول فيه، تعتبر المزايد إيجاب
للرغبة بالشراء، ويجب أن يقبل البائع مبلغ المزايدة الاخير ليعتبر قبول لعقد البيع و إتمامه.
          </p>

          <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-lg font-semibold text-gray-800">
            <span className="text-blue-600 text-lg">ℹ️</span> يقر المستخدم ان تطبيق مزاد الفريج ليس مالكا للمركبات المعروضة على المنصة، وماهي إلا وسيط إلكتروني بين البائع والمشتري لتسهيل عملية البيع واقتصار دورها على السعي وتنظيم المزاد فقط.
          </div>

          <div className="mb-4">
            <h1 className="text-xl font-bold text-black mb-2">شروط واحكام استخدام الخدمة</h1>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>التزامات البائع فيما يخص البيع</h3>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>صورة من استمارة المركبة سارية المفعول مدة أقصاها شهر</li>
              <li>صورة من هوية البائع</li>
              <li>مفتاح المركبة</li>
              <li>الفحص ساري المفعول مدة أقصاها شهر بالإضافة الى خلوها من مخالفات هيئة النقل والمرور.</li>
              <li>إذا رفض البائع البيع اثناء الحراج والمزاد يتم سحب المركبة من ساحة المزاد خلال يوم عمل من قرار الرفض، وإذا لم يتم السحب المركبة خلال المدة المحددة للبائع 24 ساعة يتم سحب 50 ريال لكل يوم او جزء من اليوم كرسوم إيواء</li>
              <li>بعد نقل الملكية للمركبة من قبل المشتري يتم تحويل المبلغ الى البائع.</li>
              <li>يترتب على البائع دفع مبلغ 250 ريال رسوم مزاد أو اعلان المركبة في التطبيق.</li>
            </ul>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>التزامات المشتري فيما يخص الشراء</h3>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>يتم منح المشتري مهلة ثلاثة أيام عمل لسداد قيمة المركبة بالإضافة الى دفع كامل الرسوم والعمولات المستحقة للشركة وإذا لم يتم السداد في الوقت المحدد يلغى البيع و يصادر مبلغ السعي وعدم المطالبة به بتاتا.</li>
              <li>يتم السداد من حساب بنكي مسجل باسمه في أحد البنوك السعودية مع كتابة سبب التحويل على سبيل المثال قيمة (شراء سيارة).</li>
              <li>ويتم تحويل مبلغ المركبة الى البائع بعد نقل الملكية.</li>
              <li>سداد عربون دخول المزاد 5000 خمسمائة الاف ريال للمزايدة على مركبة واحدة فقط و 10000 عشرة ألف ريال للمزايدة على أكثر من مرة</li>
              <li>يمنع القيام بإصلاحات أو تعديلات على المركبات المتواجدة في ساحة المزاد</li>
              <li>على المشتري متابعة كافة إجراءات المزاد بنفسه أو وكيل مفوض ينوب عنه بعد دخوله للمزاد لن يتاح الانسحاب. ويقر المشتري بأن الشركة غير مسؤولة عن المركبة في حال ظهور أي عيب أو مشكلة حيث أن ادراج بيانات المركبة يكون وفقا لما هو مذكور في رخصة السير والشركة غير مسؤولة عن أي نواقص بالمركبة وغير ذلك.</li>
            </ul>
            <p className="text-black leading-relaxed mb-4">يتم تمديد الوقت الخاص بالمزاد اليا ثلاث دقائق إضافية في حال تمت المزايدة في الثلاث دقائق الأخيرة.</p>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>إنتهاء المزاد</h3>
            <p className="text-black leading-relaxed mb-4">إذا فاز المزايد (المشتري) بالمزاد : سيتم اشعاره بالفوز ورسو المزاد عليه بالتطبيق، وعند رسو المزاد عليه؛ يعني ذلك ان البيع قد انعقد ، وتلقائيا يتم اشعار كلا الطرفين ( البائع والمشتري ( بعملية البيع واستكمال الإجراءات اللازمة .</p>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>نقل ملكية المركبات  </h3>
            <p className="text-black leading-relaxed mb-4">نقل ملكية المركبة مسؤولية المشتري وتتم حسب شـ روط ولوائح هيئة النقل والمرور.</p>
            <h3 className="text-lg font-extrabold text-red-800 mb-2">تنبيهات على استلام المركبة</h3>
            <p className="text-black leading-relaxed mb-4">يجب أن تتم عملية استلام المركبة خلال يوم عمل من تاريخ نقل الملكية وفي حال عدم الالتزام بهدة المدة سيتحمل المشتري رسوم الايواء بواقع 50 ريال عن كل يوم تأخير او جزء من اليوم.</p>
            <p className="text-black leading-relaxed mb-4">يتحمل المشتري جميع التكاليف الخاصة بتحميل وسحب المركبة من موقع المزاد أو أماكن تواجدها.</p>
            <p className="text-black leading-relaxed mb-4">يجب الحصول على تصريح خروج من إدارة شركة الفريج لاستلام المركبة المباعة من ساحة المزاد.</p>
            <p className="text-black leading-relaxed mb-4">لا يتم تسليم المركبة الا بعد التأكد من نقل ملكيتها وسداد جميع المطالبات المالية المطلوبة.</p>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>إرشادات ما بعد عملية البيع والشراء</h3>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>إذا تجاوزت المركبة أكثر من 5 أيام من تاريخ استلام مبلغ الشراء على المشتري دفع مبلغ 50ريال/ يوم غير مستردة.</li>
              <li>إذا لم يتم نقل الملكية من قبل المشتري لأسباب تعود للبائع يتم مناقشتها مع الطرفين ( البائع- المشتري) بخصوص المهلة وإذا تعذر الاتفاق يتم الغاء عقد البيع.</li>
              <li>إذا لم يتم نقل الملكية لأسباب تعود للمشتري على سبيل المثال لا الحصر عدم استيفاء شروط هيئة النقل الخ فانه يتم مناقشتها بين الطرفين البائع والمشتري) في حال عدم الاتفاق يتم الغاء عقد البيع.</li>
            </ul>
            <h3 className="text-lg font-extrabold text-red-800 mb-2">تنويه هام</h3>
            <p className="text-black leading-relaxed mb-4">يخلي المشتري مسؤولية الشركة عن أي عيوب تظهر بالمركبة بعد إتمام البيع، وذلك كونها وسيط ومنظمة للمزاد فقط.</p>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>قبول الشروط</h3>
            <p className="text-black leading-relaxed mb-4">باستخدامك للتطبيق، فإنك توافق على هذه الشروط والأحكام، وقد يتم تعديلها من وقت لآخر.</p>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>استمرار استخدامك للتطبيق بعد تحديث الشروط يعني قبولك للتعديلات الجديدة.</li>
            </ul>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>إنشاء الحساب</h3>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>يجب على المستخدم تقديم معلومات دقيقة وكاملة عند التسجيل.</li>
              <li>المستخدم مسؤول عن الحفاظ على سرية معلومات حسابه.</li>
              <li>يحق لنا تعليق أو إغلاق الحساب في حال انتهاك الشروط.</li>
            </ul>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>استخدام التطبيق</h3>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>لا يجوز استخدام التطبيق لأي غرض غير قانوني أو غير أخلاقي.</li>
              <li>منع نسخ، تعديل، توزيع، أو استغلال أي جزء من التطبيق دون إذن كتابي مسبق.</li>
            </ul>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>حقوق الملكية الفكرية</h3>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>جميع الحقوق والعلامات التجارية والمحتوى الموجود في التطبيق مملوك لـ [حراج الفريج أو المرخصين له.</li>
              <li>لا يجوز استخدام أي محتوى بدون إذن صريح من مالك الحقوق.</li>
            </ul>
            <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>سياسة الدفع والاسترداد</h3>
            <ul className="list-disc list-inside text-black leading-relaxed">
              <li>يتم دفع الرسوم المطلوبة مقابل الخدمات وفقًا للأسعار المحددة داخل التطبيق.</li>
              <li>قد لا يتم استرداد المدفوعات إلا وفقًا للسياسة الموضحة داخل التطبيق.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
