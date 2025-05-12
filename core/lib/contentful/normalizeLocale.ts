const localeRemappings: { [key: string]: string } = {
  'en': 'en-US',
};

const normalizeLocale = (locale: string) => {
  return localeRemappings[locale] ?? locale;
};

export default normalizeLocale;
