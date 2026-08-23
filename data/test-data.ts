import { resolveByEnv } from '../utils/env';

const productUrls: Record<string, string> = {
  'test-eshop': '/privatiems/mobilieji-telefonai/nokia-235-4g-1310100182?color=juoda',
  'test2-eshop': '/privatiems/mobilieji-telefonai/nokia-235-4g-1310100182?color=juoda',
  'uat-eshop': '/privatiems/mobilieji-telefonai/nokia-235-4g-1310100182?color=juoda',
}

export const testData = {
  urls: {
    home: '/privatiems',
    private_store: '/privatiems',
    business_store: '/verslui',
    category: '/privatiems/mobilieji-telefonai',
    plans: '/planai',
    checkout: '/checkout',
    bank: {
      swedbankLoginPage: '.*psd2\.api\.swedbank\.com\/sandbox\/ui\/login.*/',
      swedbankProfilePage: '/.*sandbox\/ui\/login\/profile.*/',
      swedbankConsentPage: '/.*sandbox\/ui\/login\/consent.*/',
      swedbankPaymentConfirmationPage: '/.*sandbox\/ui\/login\/confirm.*/',
    },
  },

  categorySlugs: {
    mobilePhones: 'mobilieji-telefonai',
    heaphones: 'ausines',
    televisions: 'televizoriai',
  } as const,

  categoryNames: {
    ['mobilieji-telefonai']: 'Mobilieji telefonai',
    ['ausines']: 'Ausinės',
    ['televizoriai']: 'Televizoriai',
  } as const,

  product: {
    url: resolveByEnv(productUrls),
  },

  customer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'laurynas@balticode.com',
    customerTelephone: '+37060000000',
    customerAddress: 'Klinikų g. 1',
    customerFlat: '99',
  }
};