export const CLINIC_PHONE = '8263902142';
export const CLINIC_PHONE_INTL = '918263902142';

export const WHATSAPP_TEMPLATES = {
  general: 'नमस्कार, मला विजयमंगल आयुर्वेद येथे आयुर्वेदिक सल्ल्याबाबत अधिक माहिती हवी आहे.',
  appointment: 'नमस्कार, मला विजयमंगल आयुर्वेद येथे अपॉइंटमेंट घ्यायची आहे. कृपया उपलब्ध वेळेबाबत माहिती द्यावी.',
  appointmentWithDetails: (name: string, date: string, category: string) =>
    `नमस्कार, मी ${name}. मी विजयमंगल आयुर्वेद येथे ${date} साठी (${category}) अपॉइंटमेंटची विनंती केली आहे. कृपया निश्चित करावी.`,
  todayAppointmentReminder: (name: string, time: string) =>
    `नमस्कार ${name}, विजयमंगल आयुर्वेद (डॉ. सुप्रिया कदम). आपली आजची अपॉइंटमेंट वेळ ${time} वाजता आहे. कृपया वेळेवर उपस्थित राहावे. संपर्क: 8263902142.`,
  courseRefillReminder: (name: string, courseName: string) =>
    `नमस्कार ${name}, विजयमंगल आयुर्वेद. आपल्या ${courseName} चा पुढील महिन्याचा औषध डोस तयार आहे. कृपया पुढील तपासणीसाठी दवाखान्यात भेटावे.`,
  tokenAlert: (name: string, token: number) =>
    `नमस्कार ${name}, विजयमंगल आयुर्वेद. आपला ओपीडी टोकन क्रमांक #${token} आहे. कृपया प्रतीक्षालयात बसावे, लवकरच डॉ. सुप्रिया कदम आपल्याशी संवाद साधतील.`,
  followUp: 'नमस्कार, विजयमंगल आयुर्वेद येथे आपल्या पुढील भेटीबाबत संपर्क साधत आहोत. कृपया आपल्या सोयीची तारीख कळवावी.',
  coursePlanning: 'नमस्कार, आपल्या पुढील उपचार नियोजनाबाबत चर्चा करण्यासाठी कृपया विजयमंगल आयुर्वेदशी संपर्क साधावा.',
};

/**
 * Builds standard https://wa.me/ URL with URI-encoded Marathi message.
 */
export function getWhatsAppUrl(
  message: string = WHATSAPP_TEMPLATES.general,
  phone: string = CLINIC_PHONE_INTL
): string {
  // Normalize phone number (strip spaces, dashes, +)
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.startsWith('91') && cleanPhone.length === 12 
    ? cleanPhone 
    : cleanPhone.length === 10 
      ? `91${cleanPhone}` 
      : CLINIC_PHONE_INTL;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}
