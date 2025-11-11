import React from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
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
          <h1 className="text-3xl font-bold text-black mb-4">❓ الأسئلة الشائعة</h1>
        </div>
        <div className="text-right text-black font-bold leading-relaxed">
          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيف يمكنني التسجيل في تطبيق دراج الفريج؟</h3>
          <p className="text-black leading-relaxed mb-4">يمكنك التسجيل بسهولة من خلال تحميل التطبيق، ثم إنشاء حساب جديد باستخدام رقم هاتفك</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>هل يمكنني تعديل أو حذف إعلاني بعد نشره؟</h3>
          <p className="text-black leading-relaxed mb-4">نعم، يمكنك تعديل أو حذف إعلانك في أي وقت من خلال الانتقال إلى قسم "إعلاناتي" واختيار الإعلان الذي ترغب في تعديله أو حذفه.</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>هل يمكنني بيع السلع المستعملة في التطبيق؟</h3>
          <p className="text-black leading-relaxed mb-4">نعم، بشرط أن تكون بحالة صالحة للاستخدام ويتم توضيح حالتها بصدق، مثل كونها جديدة، شبه جديدة، أو بها بعض العيوب، مع إرفاق صور واضحة.</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>ما هي طرق الدفع المتاحة لشحن الرصيد؟</h3>
          <p className="text-black leading-relaxed mb-4">يمكنك الدفع من خلال التحويل البنكي أو التحدث معنا عبر الواتساب (0503088215)</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيف يمكنني وضع إعلاني في الصفحة الرئيسية؟</h3>
          <p className="text-black leading-relaxed mb-4">يمكنك التحدث معنا عبر الواتساب (0503088215) "طلب اعلان في الصفحة الرئيسية وسيطلب منك الدفع وفق الرسوم المحددة.</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كم تكلفة الإعلان في الصفحة الرئيسية؟</h3>
          <p className="text-black leading-relaxed mb-4">تعتمد التكلفة على مدة العرض وحجم الإعلان، ويمكنك الاطلاع على الأسعار عند التحدث معنا</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيف أضمن وصول إعلاني لأكبر عدد من العملاء؟</h3>
          <p className="text-black leading-relaxed mb-4">1 - استخدام صور واضحة وجذابة. 2 - كتابة وصف دقيق ومفصل</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>سياسة الخصوصية لمنصة حراج الفريج ؟</h3>
          <p className="text-black leading-relaxed mb-4">نحن - شركة منصة حراج الفريج - نقدر ثقتك فينا ونحن نلتزم بحماية معلوماتك الشخصية. هذه الوثيقة توضح نوع المعلومات التي نجمعها منك، كيف تستخدمها وكيف نحافظ على سريتها.</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيفية استخدام المعلومات نستخدم المعلومات التي نجمعها لتقديم الخدمات لك ؟</h3>
          <p className="text-black leading-relaxed mb-4">قد نشارك بعض المعلومات مع أطراف ثالثة مثل محللي البيانات ومعالجات الدفع لتقديم الخدمة بشكل أفضل وأكثر أمانًا ...</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيف يمكنني إضافة إعلان جديد ؟</h3>
          <p className="text-black leading-relaxed mb-4">بعد تسجيل الدخول، انتقل إلى قسم "الإعلانات، واضغط على زر "+" لإضافة إعلان جديد، ثم أدخل التفاصيل مثل العنوان، الوصف، الصور، والسعر.</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>هل هناك رسوم على نشر الإعلان ؟</h3>
          <p className="text-black leading-relaxed mb-4">لا يوجد رسوم على الإعلان ولكن يوجد رسوم على البيع داخل التطبيق 1.5 % يتم حسب قيمة السلعة واحتساب 1.5% من قيمة السلعة</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيف يمكنني شحن رصيدي داخل التطبيق؟</h3>
          <p className="text-black leading-relaxed mb-4">يمكنك شحن رصيدك من خلال الدخول إلى "محفظتي" داخل التطبيق، ثم اختيار "شحن الرصيد"، وبعدها تحدد المبلغ المطلوب وطريقة الدفع المتاحة. اختيار المبلغ المطلوب (1) نقطة يساوي 1000 ريال) والتواصل مع الإدارة لشحن محفظتك</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيف أقدم شكوى أو اقتراح ؟</h3>
          <p className="text-black leading-relaxed mb-4">يمكنك إرسال شكوى أو اقتراح من خلال : الذهاب الى الفوتر تجد (الشكاوى والاقتراحات) سيتم الرد عليك في أقرب وقت ممكن عبر الواتساب</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>كيف يمكنني التسجيل في تطبيق حراج الفريج؟</h3>
          <p className="text-black leading-relaxed mb-4">يمكنك التسجيل بسهولة من خلال تحميل التطبيق، ثم إنشاء حساب جديد باستخدام رقم هاتفك</p>

          <h3 className="text-lg font-bold mb-2" style={{color: '#FF8C00'}}>هل هناك رسوم أخرى غير عمولة البيع؟</h3>
          <p className="text-black leading-relaxed mb-4">عمولة البيع هي الرسوم الرئيسية، ولكن قد تكون هناك رسوم إضافية حسب الخدمات الإضافية التي تستخدمها في التطبيق.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
