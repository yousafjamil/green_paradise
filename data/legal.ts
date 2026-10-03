import type { L } from "@/lib/i18n";

export type LegalSection = { h: string; p?: string[]; ul?: string[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

export const LEGAL_UPDATED = "2026-10-04";

// Plain-language website policies for a UAE company. Have them reviewed by a lawyer before launch.
export const privacy: L<LegalDoc> = {
  en: {
    title: "Privacy Policy",
    intro: "This policy explains what personal information Green Paradise collects through this website, why we collect it, and the choices you have.",
    sections: [
      { h: "Who we are", p: ["Green Paradise Landscape Maintenance L.L.C. (“Green Paradise”, “we”, “us”) is a landscaping and maintenance company based in Abu Dhabi, United Arab Emirates. You can reach us using the contact details at the end of this page."] },
      { h: "Information we collect", p: ["Information you give us:"], ul: ["Your name, phone number, email address (optional), the service you are interested in, and your message, when you use the contact form or the quick-help panel.", "Anything you send us by phone, WhatsApp or email."] },
      { h: "Technical information", p: ["If privacy-friendly analytics is enabled, we count visits and clicks (for example, taps on WhatsApp or call buttons). This does not use cookies and does not identify you personally.", "Our hosting provider may keep standard server logs, such as IP address and browser type, for security and reliability."] },
      { h: "How we use your information", ul: ["To reply to your inquiry and prepare a quote.", "To provide our services and keep records of our work.", "To protect the website from spam and misuse.", "To understand which pages and contact options are useful, so we can improve the website.", "To meet legal obligations."] },
      { h: "Cookies", p: ["We do not set advertising or tracking cookies. Your language choice is kept in the page address, not in a cookie.", "The map on the contact page is provided by Google. It loads only after you choose to load it, and Google may then set cookies in line with its own policy."] },
      { h: "Who we share it with", p: ["We do not sell your personal information. We share it only with the service providers that help us run the website and answer you, and only as needed:"], ul: ["Email delivery, to send your inquiry to our inbox.", "Website hosting.", "Analytics, if enabled.", "WhatsApp (Meta), when you choose to message us there.", "Google, if you load the map.", "Authorities, where the law requires it."] },
      { h: "How long we keep it", p: ["We keep inquiries and messages only as long as needed to respond, provide our services and keep our business records, or as the law requires."] },
      { h: "Security", p: ["We take reasonable steps to protect your information. No website or method of transmission is completely secure, so we cannot guarantee absolute security."] },
      { h: "International processing", p: ["Some of our service providers may process data outside the United Arab Emirates. We choose providers carefully and share only what is needed."] },
      { h: "Your rights", p: ["Under the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, you may ask us to give you access to your information, correct it, delete it, restrict or object to its use, or withdraw consent you have given. To do this, contact us using the details below."] },
      { h: "Children", p: ["This website is not directed at children, and we do not knowingly collect their personal information."] },
      { h: "Changes to this policy", p: ["We may update this policy from time to time. The date at the top of the page shows when it was last changed."] },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    intro: "توضّح هذه السياسة المعلومات الشخصية التي تجمعها جرين برادايس عبر هذا الموقع، ولماذا نجمعها، والخيارات المتاحة لك.",
    sections: [
      { h: "من نحن", p: ["جرين برادايس لتنسيق وصيانة الحدائق ذ.م.م (“جرين برادايس” أو “نحن”) شركة لتنسيق الحدائق والصيانة مقرها أبوظبي، الإمارات العربية المتحدة. يمكنك التواصل معنا عبر بيانات الاتصال في نهاية هذه الصفحة."] },
      { h: "المعلومات التي نجمعها", p: ["المعلومات التي تقدّمها لنا:"], ul: ["اسمك ورقم هاتفك وبريدك الإلكتروني (اختياري) والخدمة التي تهمّك ورسالتك، عند استخدام نموذج التواصل أو لوحة المساعدة السريعة.", "أي شيء ترسله إلينا عبر الهاتف أو واتساب أو البريد الإلكتروني."] },
      { h: "المعلومات التقنية", p: ["إذا فُعّلت أداة التحليلات الحافظة للخصوصية، فإننا نحصي الزيارات والنقرات (مثل الضغط على أزرار واتساب أو الاتصال). لا تستخدم هذه الأداة ملفات تعريف الارتباط ولا تحدّد هويتك الشخصية.", "قد تحتفظ شركة استضافة الموقع بسجلات الخادم المعتادة، مثل عنوان IP ونوع المتصفح، لأغراض الأمان والموثوقية."] },
      { h: "كيف نستخدم معلوماتك", ul: ["للرد على استفسارك وإعداد عرض السعر.", "لتقديم خدماتنا والاحتفاظ بسجلات أعمالنا.", "لحماية الموقع من الرسائل المزعجة وسوء الاستخدام.", "لمعرفة الصفحات وخيارات التواصل المفيدة بهدف تحسين الموقع.", "للوفاء بالالتزامات القانونية."] },
      { h: "ملفات تعريف الارتباط", p: ["لا نستخدم ملفات تعريف الارتباط الإعلانية أو الخاصة بالتتبع. يُحفظ اختيارك للّغة في عنوان الصفحة وليس في ملف تعريف ارتباط.", "الخريطة في صفحة التواصل مقدَّمة من جوجل. لا تُحمَّل إلا بعد اختيارك تحميلها، وقد تضع جوجل بعدها ملفات تعريف ارتباط وفق سياستها الخاصة."] },
      { h: "الجهات التي نشارك معها معلوماتك", p: ["لا نبيع معلوماتك الشخصية. نشاركها فقط مع مزوّدي الخدمات الذين يساعدوننا في تشغيل الموقع والرد عليك، وبالقدر اللازم فقط:"], ul: ["خدمة إرسال البريد الإلكتروني، لإيصال استفسارك إلى بريدنا.", "استضافة الموقع.", "التحليلات، إن كانت مفعّلة.", "واتساب (ميتا)، عندما تختار مراسلتنا عبره.", "جوجل، إذا حمّلت الخريطة.", "الجهات الرسمية، عندما يُلزم القانون بذلك."] },
      { h: "مدة الاحتفاظ بالمعلومات", p: ["نحتفظ بالاستفسارات والرسائل فقط للمدة اللازمة للرد وتقديم خدماتنا والاحتفاظ بسجلات أعمالنا، أو وفق ما يقتضيه القانون."] },
      { h: "الأمان", p: ["نتخذ خطوات معقولة لحماية معلوماتك. لا يوجد موقع أو وسيلة نقل آمنة بالكامل، لذلك لا يمكننا ضمان الأمان المطلق."] },
      { h: "المعالجة خارج الدولة", p: ["قد يعالج بعض مزوّدي الخدمات لدينا البيانات خارج دولة الإمارات العربية المتحدة. نختار المزوّدين بعناية ونشارك فقط ما يلزم."] },
      { h: "حقوقك", p: ["وفقاً للمرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية، يحق لك أن تطلب منا الاطلاع على معلوماتك أو تصحيحها أو حذفها أو تقييد استخدامها أو الاعتراض عليه، أو سحب موافقتك التي قدّمتها. لذلك تواصل معنا عبر البيانات أدناه."] },
      { h: "الأطفال", p: ["هذا الموقع غير موجَّه للأطفال، ولا نجمع عمداً معلومات شخصية عنهم."] },
      { h: "التغييرات على هذه السياسة", p: ["قد نحدّث هذه السياسة من وقت لآخر. يوضّح التاريخ في أعلى الصفحة آخر تعديل."] },
    ],
  },
};

export const terms: L<LegalDoc> = {
  en: {
    title: "Terms of Use",
    intro: "By using this website you agree to these terms. If you do not agree, please do not use the website.",
    sections: [
      { h: "About this website", p: ["This website is operated by Green Paradise Landscape Maintenance L.L.C., Abu Dhabi, United Arab Emirates. It describes our landscaping, plant and garden maintenance services."] },
      { h: "Using the website", p: ["You may use this website for lawful purposes only. Please do not misuse it, try to disrupt it, or send spam or harmful content through our forms."] },
      { h: "Information and images", p: ["We try to keep the information on this website accurate and up to date. Photos and videos show examples of our work and the plants we work with. Results, plant availability and colours vary from site to site and with the seasons.", "Nothing on this website is a binding offer. Prices, timelines and the scope of work are agreed with you in writing before work starts."] },
      { h: "Intellectual property", p: ["The photos, videos, text, logo and design on this website belong to Green Paradise or are used with permission. Please do not copy or reuse them without our written consent."] },
      { h: "Third-party services and links", p: ["This website may link to or use third-party services, such as WhatsApp and Google Maps. They have their own terms and privacy policies, and we are not responsible for them."] },
      { h: "Availability", p: ["We may change, suspend or remove parts of this website at any time. We do not promise that it will always be available or free of errors."] },
      { h: "Limitation of liability", p: ["To the extent allowed by law, Green Paradise is not liable for any loss arising from your use of, or inability to use, this website or from relying on its content. This does not limit any rights you have under the law or under a written agreement for our services."] },
      { h: "Governing law", p: ["These terms are governed by the laws of the Emirate of Abu Dhabi and the federal laws of the United Arab Emirates. The courts of Abu Dhabi have jurisdiction over any dispute."] },
      { h: "Changes to these terms", p: ["We may update these terms from time to time. The date at the top of the page shows when they were last changed."] },
    ],
  },
  ar: {
    title: "شروط الاستخدام",
    intro: "باستخدامك هذا الموقع فإنك توافق على هذه الشروط. إذا كنت لا توافق عليها، يرجى عدم استخدام الموقع.",
    sections: [
      { h: "عن هذا الموقع", p: ["يدير الموقع شركة جرين برادايس لتنسيق وصيانة الحدائق ذ.م.م، أبوظبي، الإمارات العربية المتحدة، ويعرض خدماتنا في تنسيق الحدائق والنباتات وصيانة الحدائق."] },
      { h: "استخدام الموقع", p: ["يجوز لك استخدام هذا الموقع للأغراض المشروعة فقط. يرجى عدم إساءة استخدامه أو محاولة تعطيله أو إرسال رسائل مزعجة أو محتوى ضار عبر نماذجنا."] },
      { h: "المعلومات والصور", p: ["نسعى إلى أن تكون المعلومات في هذا الموقع دقيقة ومحدّثة. تعرض الصور ومقاطع الفيديو أمثلة من أعمالنا والنباتات التي نتعامل معها. وتختلف النتائج وتوفّر النباتات والألوان من موقع إلى آخر ومن موسم إلى آخر.", "لا يُعدّ أي شيء في هذا الموقع عرضاً ملزماً. تُتفق الأسعار والمواعيد ونطاق العمل معك كتابةً قبل بدء العمل."] },
      { h: "الملكية الفكرية", p: ["الصور ومقاطع الفيديو والنصوص والشعار والتصميم في هذا الموقع مملوكة لجرين برادايس أو مستخدمة بإذن. يرجى عدم نسخها أو إعادة استخدامها دون موافقتنا الكتابية."] },
      { h: "الخدمات والروابط الخارجية", p: ["قد يرتبط هذا الموقع بخدمات أطراف ثالثة أو يستخدمها، مثل واتساب وخرائط جوجل. لهذه الخدمات شروطها وسياسات خصوصيتها الخاصة، ولسنا مسؤولين عنها."] },
      { h: "توفّر الموقع", p: ["قد نغيّر أجزاء من هذا الموقع أو نوقفها أو نزيلها في أي وقت. لا نعد بأن يكون الموقع متاحاً دائماً أو خالياً من الأخطاء."] },
      { h: "حدود المسؤولية", p: ["بالقدر الذي يسمح به القانون، لا تتحمل جرين برادايس المسؤولية عن أي خسارة ناتجة عن استخدامك هذا الموقع أو عدم قدرتك على استخدامه أو الاعتماد على محتواه. ولا يحدّ هذا من أي حقوق لك بموجب القانون أو بموجب اتفاق مكتوب لخدماتنا."] },
      { h: "القانون الواجب التطبيق", p: ["تخضع هذه الشروط لقوانين إمارة أبوظبي والقوانين الاتحادية لدولة الإمارات العربية المتحدة، وتختص محاكم أبوظبي بالنظر في أي نزاع."] },
      { h: "التغييرات على هذه الشروط", p: ["قد نحدّث هذه الشروط من وقت لآخر. يوضّح التاريخ في أعلى الصفحة آخر تعديل."] },
    ],
  },
};
