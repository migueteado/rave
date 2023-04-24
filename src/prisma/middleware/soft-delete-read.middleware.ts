import { Prisma } from '@prisma/client';

export function SoftDeleteReadMiddleware<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    if (params.action === 'findMany') {
      if (params.args.where) {
        if (!params.args.where.dateDeleted) {
          params.args.where['dateDeleted'] = null;
        }
      } else {
        params.args['where'] = { dateDeleted: null };
      }
    }

    if (params.action === 'findFirst') {
      params.args.where['dateDeleted'] = null;
    }

    if (params.action === 'findUnique') {
      params.action = 'findFirst';
      params.args.where['dateDeleted'] = null;
    }

    if (params.action === 'updateMany') {
      if (params.args.where) {
        if (!params.args.where.dateDeleted) {
          params.args.where['dateDeleted'] = null;
        }
      } else {
        params.args['where'] = { dateDeleted: null };
      }
    }

    if (params.action === 'count') {
      if (params.args.where) {
        if (!params.args.where.dateDeleted) {
          params.args.where['dateDeleted'] = null;
        }
      } else {
        params.args['where'] = { dateDeleted: null };
      }
    }

    return next(params);
  };
}
