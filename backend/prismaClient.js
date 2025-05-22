import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  // Execute the query first
  const result = await next(params);

  // Only run for User model & find queries (findUnique, findFirst, findMany)
  if (
    params.model === 'User' &&
    ['findUnique', 'findFirst', 'findMany'].includes(params.action)
  ) {
    if (Array.isArray(result)) {
      // For findMany — strip password from each user
      return result.map(({ password, ...user }) => user);
    }
    if (result) {
      // For findUnique/findFirst — strip password from single user
      const { password, ...user } = result;
      return user;
    }
  }

  // For other models or actions, return as-is
  return result;
});

export default prisma;