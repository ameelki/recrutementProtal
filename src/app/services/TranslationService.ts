import { Injectable } from '@angular/core';

export interface TranslationsAlert {
  TITLE: string;
  CHARACTER_LIMIT_EXCEEDED: string;
  MAX_LENGTH: string;
  CREATING_JOB_DESCRIPTION: string;
  JOB_DESCRIPTION_CREATED_SUCCESSFULLY: string;
  ERROR: string;
  FIELD_INVALID: string;
  OK: string;
}

export interface Translations {
  TITLE: string;
  SUMMARY: string;
  RESPONSIBILITIES: string;
  IS_ACTIVE: string;
  REQUIRED_SKILLS: string;
  REQUIRED_EXPERIENCE: string;
  WORKING_CONDITIONS: string;
  BENEFITS: string;
  RECRUITMENT_PROCESS: string;
  COMPANY_DESCRIPTION: string;
  CONTACT_EMAIL: string;
  SUBMIT: string;
  CHARACTER_LIMIT_EXCEEDED: string;
  INVALID_EMAIL: string;
  REQUIRED: string;
  INVALID: string;
  MAX_LENGTH: string;
  OPTIONAL: string;
  CHARACTERS: string;
}

interface TranslationData {
  en: Translations;
  fr: Translations;
  ar: Translations;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations = {
    en: {
      CHARACTER_LIMIT_EXCEEDED: "Character limit exceeded",
      MAX_LENGTH: "Cannot be more than",
      CREATING_JOB_DESCRIPTION: "Creating Job Description...",
      JOB_DESCRIPTION_CREATED_SUCCESSFULLY: "Job Description created successfully!",
      ERROR: "Error!",
      FIELD_INVALID: "is invalid",
      OK: "OK"
    },
    fr: {
      CHARACTER_LIMIT_EXCEEDED: "Limite de caractères dépassée",
      MAX_LENGTH: "Ne peut pas dépasser",
      CREATING_JOB_DESCRIPTION: "Création de la description de l'emploi...",
      JOB_DESCRIPTION_CREATED_SUCCESSFULLY: "Description de l'emploi créée avec succès!",
      ERROR: "Erreur!",
      FIELD_INVALID: "est invalide",
      OK: "OK"
    },
    ar: {
      CHARACTER_LIMIT_EXCEEDED: "تم تجاوز الحد الأقصى للعدد",
      MAX_LENGTH: "لا يمكن أن يتجاوز",
      CREATING_JOB_DESCRIPTION: "إنشاء وصف الوظيفة...",
      JOB_DESCRIPTION_CREATED_SUCCESSFULLY: "تم إنشاء وصف الوظيفة بنجاح!",
      ERROR: "خطأ!",
      FIELD_INVALID: "غير صالح",
      OK: "حسناً"
    }
  };

  private currentLang: 'en' | 'fr' | 'ar' = 'en';
  private translationData: TranslationData = {
    en: {
      TITLE: 'Title',
      SUMMARY: 'Summary',
      RESPONSIBILITIES: 'Responsibilities',
      IS_ACTIVE: 'Is Active For Candidates',
      REQUIRED_SKILLS: 'Required Skills',
      REQUIRED_EXPERIENCE: 'Required Experience',
      WORKING_CONDITIONS: 'Working Conditions',
      BENEFITS: 'Benefits',
      RECRUITMENT_PROCESS: 'Recruitment Process',
      COMPANY_DESCRIPTION: 'Company Description',
      CONTACT_EMAIL: 'Contact Email',
      SUBMIT: 'Submit',
      CHARACTER_LIMIT_EXCEEDED: 'Character limit exceeded',
      INVALID_EMAIL: 'Please enter a valid email',
      REQUIRED: 'This field is required',
      INVALID: 'Invalid value',
      MAX_LENGTH: 'Cannot be more than',
      OPTIONAL: 'Optional',
      CHARACTERS: 'Characters'
    },
    fr: {
      TITLE: 'Titre',
      SUMMARY: 'Résumé',
      RESPONSIBILITIES: 'Responsabilités',
      IS_ACTIVE: 'Est actif pour les candidats',
      REQUIRED_SKILLS: 'Compétences requises',
      REQUIRED_EXPERIENCE: 'Expérience requise',
      WORKING_CONDITIONS: 'Conditions de travail',
      BENEFITS: 'Avantages',
      RECRUITMENT_PROCESS: 'Processus de recrutement',
      COMPANY_DESCRIPTION: 'Description de l\'entreprise',
      CONTACT_EMAIL: 'Email de contact',
      SUBMIT: 'Soumettre',
      CHARACTER_LIMIT_EXCEEDED: 'Limite de caractères dépassée',
      INVALID_EMAIL: 'Veuillez entrer un email valide',
      REQUIRED: 'Ce champ est requis',
      INVALID: 'Valeur invalide',
      MAX_LENGTH: 'Ne peut pas dépasser',
      OPTIONAL: 'Facultatif',
      CHARACTERS: 'caractères'
    },
    ar: {
      TITLE: 'العنوان',
      SUMMARY: 'الملخص',
      RESPONSIBILITIES: 'المسؤوليات',
      IS_ACTIVE: 'نشط للمرشحين',
      REQUIRED_SKILLS: 'المهارات المطلوبة',
      REQUIRED_EXPERIENCE: 'الخبرة المطلوبة',
      WORKING_CONDITIONS: 'شروط العمل',
      BENEFITS: 'الفوائد',
      RECRUITMENT_PROCESS: 'عملية التوظيف',
      COMPANY_DESCRIPTION: 'وصف الشركة',
      CONTACT_EMAIL: 'البريد الإلكتروني للتواصل',
      SUBMIT: 'إرسال',
      CHARACTER_LIMIT_EXCEEDED: 'تم تجاوز الحد الأقصى للعدد',
      INVALID_EMAIL: 'يرجى إدخال بريد إلكتروني صالح',
      REQUIRED: 'هذا الحقل مطلوب',
      INVALID: 'قيمة غير صالحة',
      MAX_LENGTH: 'لا يمكن أن يتجاوز',
      OPTIONAL: 'اختياري',
      CHARACTERS: 'حروف'
    }
  };

  constructor() {}

  // Méthode pour définir la langue
  setLanguage(lang: 'en' | 'fr' | 'ar') {
    this.currentLang = lang;
  }

  // Méthode pour récupérer les traductions de texte général
  getTranslations(): Translations {
    return this.translationData[this.currentLang];
  }

  // Méthode pour récupérer les traductions d'alertes
  
}
