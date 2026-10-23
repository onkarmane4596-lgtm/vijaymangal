import React from 'react';
import Link from 'next/link';
import { Calendar, Repeat, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function RecurringCareSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#e6dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6517a3]/10 text-[#6517a3] text-xs font-semibold uppercase tracking-wider">
            <Repeat className="w-3.5 h-3.5" />
            <span>दीर्घकालीन आरोग्य व्यवस्थापन</span>
          </div>
          <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b]">
            उपचारांच्या प्रवासात नियमित मार्गदर्शन
          </h2>
          <p className="text-base sm:text-lg text-[#262820]/80 font-marathi-heading leading-relaxed">
            आपल्या उपचारयोजनेनुसार पुढील भेटी, निरीक्षण आणि आवश्यकतेनुसार उपचारयोजनेतील बदल यांसाठी क्लिनिकशी संपर्कात राहा.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: 1-Month Focused Course */}
          <div className="p-8 rounded-3xl bg-[#faf8f5] border border-[#e6dfd3] shadow-xs flex flex-col justify-between hover:border-[#6517a3]/40 transition-colors">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#5b8e46]/15 text-[#183d2b] text-xs font-bold">
                १ महिन्याचा प्राथमिक अभ्यासक्रम (1-Month Course)
              </div>
              <h3 className="font-marathi-heading text-xl font-bold text-[#183d2b]">
                तात्कालिक विकार व पचन सुधारणा
              </h3>
              <p className="text-sm text-[#262820]/75 leading-relaxed font-marathi-heading">
                आम्लपित्त, पोटाचे विकार, हंगामी सर्दी-खोकला किंवा प्राथमिक जीवनशैलीतील बदलांसाठी ३० दिवसांचा समर्पित अभ्यासक्रम.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#262820]/80 pt-2 font-marathi-heading">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46]" />
                  <span>प्रारंभिक नाडी व प्रकृती तपासणी</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46]" />
                  <span>१ महिन्यासाठी आवश्यक शुद्ध औषधी घटक</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46]" />
                  <span>महिनाअखेर प्रगती पुनरावलोकन व सल्ला</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#e6dfd3]">
              <Link
                href="/book-appointment?course=1-month"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-[#6517a3] hover:text-white border border-[#e6dfd3] text-sm font-semibold text-[#183d2b] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>१ महिन्याच्या योजनेसाठी संपर्क</span>
              </Link>
            </div>
          </div>

          {/* Card 2: 4-Month Rejuvenation Course */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f5ebff]/50 to-white border-2 border-[#6517a3]/30 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#6517a3] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              दीर्घकालीन पुनर्वसन
            </div>

            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#6517a3]/15 text-[#6517a3] text-xs font-bold">
                ४ महिन्यांचा सर्वसमावेशक कोर्स (4-Month Course)
              </div>
              <h3 className="font-marathi-heading text-xl font-bold text-[#183d2b]">
                सांधेदुखी, मणक्यांचे विकार व जुनाट तक्रारी
              </h3>
              <p className="text-sm text-[#262820]/75 leading-relaxed font-marathi-heading">
                संधिवात, मणक्यांच्या समस्या, वजन व्यवस्थापन आणि जुनाट विकारांवर धातू पोषणावर आधारित टप्प्याटप्प्याने होणारा उपचार.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#262820]/80 pt-2 font-marathi-heading">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6517a3]" />
                  <span>प्रत्येक महिन्यात प्रत्यक्ष तपासणी व प्रगती नोंद</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6517a3]" />
                  <span>ऋतूनुसार औषधी प्रमाण व घटकांमध्ये बदल</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6517a3]" />
                  <span>वजन व जीवनशैलीचे डिजिटल आलेख ट्रॅकिंग</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#6517a3]/20">
              <Link
                href="/book-appointment?course=4-month"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-sm font-semibold transition-all shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>४ महिन्यांच्या नियोजनाबाबत विचारा</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-[#6b7280] font-marathi-heading">
          * टीप: उपचारांचा कालावधी आणि शुल्क प्रत्यक्ष नाडी तपासणी व रुग्णाच्या प्रकृतीनुसार वैद्य ठरवतात.
        </div>
      </div>
    </section>
  );
}
