export const testData = {
  urls: {
    home: '/privatiems',
    private_store: '/privatiems',
    business_store: '/verslui',
    category: '/privatiems/mobilieji-telefonai',
    plans: '/planai',
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
};