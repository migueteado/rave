import { Prisma, PrismaClient } from '@prisma/client';

export const currencyObject = {
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'AU$',
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound Sterling',
    symbol: '£',
  },
  NZD: {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
  },
  USD: {
    code: 'USD',
    name: 'United States Dollar',
    symbol: 'US$',
  },
};

export const currencies: Prisma.CurrencyCreateManyInput[] = [];

for (const currency in currencyObject) {
  currencies.push(currencyObject[currency]);
}

export const seedCurrencies = async (prisma: PrismaClient) => {
  const seedCurrencies = await prisma.currency.createMany({
    data: currencies,
    skipDuplicates: true,
  });

  console.log(`Currencies Added: ${seedCurrencies.count}`);

  return;
};
