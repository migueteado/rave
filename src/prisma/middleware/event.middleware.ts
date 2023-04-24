import { Prisma, PrismaClient } from '@prisma/client';

const modelsToLog: Prisma.ModelName[] = [
  Prisma.ModelName.User,
  Prisma.ModelName.Customer,
];

export function EventMiddleware<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(prisma: PrismaClient): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    if (modelsToLog.includes(params.model)) {
      await prisma.event.create({
        data: {
          model: params.model,
          type: `${params.model}.${params.action}`,
          payload: params.args,
        },
      });
    }

    return next(params);
  };
}
