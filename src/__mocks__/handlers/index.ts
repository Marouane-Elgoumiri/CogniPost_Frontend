import { authHandlers } from './auth.handler';
import { articleHandlers } from './articles.handler';
import { commentHandlers } from './comments.handler';
import { userHandlers } from './users.handler';
import { tagHandlers } from './tags.handler';
import { feedHandlers } from './feed.handler';

export const handlers = [
  ...authHandlers,
  ...articleHandlers,
  ...commentHandlers,
  ...userHandlers,
  ...tagHandlers,
  ...feedHandlers,
];
