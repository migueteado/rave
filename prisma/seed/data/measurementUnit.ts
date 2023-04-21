import { MeasurementType, Prisma, PrismaClient } from '@prisma/client';

export const measurementUnits: Prisma.MeasurementUnitCreateManyInput[] = [
  {
    code: 'ea',
    name: 'Each',
    type: MeasurementType.QUANTITY,
  },
  {
    code: 'g',
    name: 'Gram',
    type: MeasurementType.MASS,
  },
  {
    code: 'mg',
    name: 'Milligram',
    type: MeasurementType.MASS,
  },
  {
    code: 'kg',
    name: 'Kilogram',
    type: MeasurementType.MASS,
  },
  {
    code: 'lb',
    name: 'Pound',
    type: MeasurementType.MASS,
  },
  {
    code: 'oz',
    name: 'Ounce',
    type: MeasurementType.VOLUME,
  },
  {
    code: 'l',
    name: 'Liter',
    type: MeasurementType.VOLUME,
  },
  {
    code: 'ml',
    name: 'Milliliter',
    type: MeasurementType.VOLUME,
  },
  {
    code: 'm',
    name: 'Meter',
    type: MeasurementType.LENGTH,
  },
  {
    code: 'cm',
    name: 'Centimeter',
    type: MeasurementType.LENGTH,
  },
  {
    code: 'mm',
    name: 'Millimeter',
    type: MeasurementType.LENGTH,
  },
  {
    code: 'in',
    name: 'Inch',
    type: MeasurementType.LENGTH,
  },
];

export const seedMeasurementUnits = async (prisma: PrismaClient) => {
  const seededMeasurementUnits = await prisma.measurementUnit.createMany({
    data: measurementUnits,
    skipDuplicates: true,
  });

  console.log(`Measurement Units Added: ${seededMeasurementUnits.count}`);

  return;
};
