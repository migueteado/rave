import { Prisma } from '@prisma/client';

export function SoftDeleteMiddleware<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { dateDeleted: new Date() };
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data['dateDeleted'] = new Date();
      } else {
        params.args['data'] = { dateDeleted: new Date() };
      }
    }

    return next(params);
  };
}
