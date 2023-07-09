import { createGraphQLHandler } from '@miragejs/graphql';
import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import { GraphQLError } from 'graphql';
import { createServer } from 'miragejs';
import { sign, verify } from './jwt';
import { schema } from './schema';

const getCurrentUser = async (context: any) => {
  const token = context.request.requestHeaders.authorization;
  if (!token) throw new GraphQLError('unauthorized');
  const payload = await verify(token.slice(7));
  const user = context.mirageSchema.users.findBy({ id: payload.id });
  if (!user) throw new GraphQLError('user does not exist');
  return user;
};

export const server = createServer({
  routes() {
    const graphQLHandler = createGraphQLHandler(schema, this.schema, {
      context: undefined,
      root: undefined,
      resolvers: {
        Query: {
          // must use graphql pagination if available
          async userTodos(obj: any, args: any, context: any, info: any) {
            const user = await getCurrentUser(context);
            const pageLimit = 5; // setting it here for this exercise, must be a frontend parameter
            const { search, sortByCreatedDate, page } = args;
            const todoStatusTodos = user.todos.models
              .filter((item: any) => item.status === 'TODO')
              .sort((a: any, b: any) => b.updatedAt - a.updatedAt);
            const doneStatusTodos = user.todos.models
              .filter((item: any) => item.status === 'DONE')
              .sort((a: any, b: any) => b.updatedAt - a.updatedAt);
            const todos = [...todoStatusTodos, ...doneStatusTodos].filter((item: any) =>
              item.content.includes(search)
            );
            const sortedTodos = sortByCreatedDate
              ? todos.sort((a: any, b: any) => {
                  const sortBy =
                    sortByCreatedDate === 'desc'
                      ? b.updatedAt - a.updatedAt
                      : a.updatedAt - b.updatedAt;
                  return sortBy;
                })
              : todos;
            const initialIndex = pageLimit * (page - 1);
            const lastIndex = initialIndex + pageLimit;
            const paginatedTodos = sortedTodos.slice(initialIndex, lastIndex);
            return {
              edges: paginatedTodos,
              totalCount: sortedTodos.length
            };
          }
        },
        Mutation: {
          createUser(obj: any, args: any, context: any, info: any) {
            const { email, password } = args;
            const oldUser = context.mirageSchema.users.findBy({ email });
            if (oldUser) {
              throw new GraphQLError('email exists');
            }
            const passwordHashed = bcrypt.hashSync(password, 8);
            const now = dayjs().valueOf();
            const user = context.mirageSchema.create('User', {
              email,
              passwordHashed,
              createdAt: now
            });
            return user;
          },

          async createTodo(obj: any, args: any, context: any, info: any) {
            const { content } = args;
            const user = await getCurrentUser(context);
            const now = dayjs().valueOf();
            const todo = context.mirageSchema.create('Todo', {
              content,
              user,
              status: 'TODO',
              createdAt: now,
              updatedAt: now
            });
            return todo;
          },

          async updateTodo(obj: any, args: any, context: any, info: any) {
            const {
              todo: { id, content, status }
            } = args;
            const user = await getCurrentUser(context);
            const todo = user.todos.models.find((t: any) => t.id === id);
            if (!todo) throw new GraphQLError('todo does not exist');
            const now = dayjs().valueOf();
            if (content) todo.update({ content, updatedAt: now });
            if (status) todo.update({ status, updatedAt: now });
            return todo;
          },

          async deleteTodo(obj: any, args: any, context: any, info: any) {
            const { id } = args;
            const user = await getCurrentUser(context);
            const todo = user.todos.models.find((t: any) => t.id === id);
            if (!todo) throw new GraphQLError('todo does not exist');
            todo.destroy();
            return true;
          },

          async token(obj: any, args: any, context: any, info: any) {
            const { email, password } = args;
            const user = context.mirageSchema.users.findBy({ email });
            if (!user) throw new GraphQLError('user does not exist or wrong password');
            const match = bcrypt.compareSync(password, user.passwordHashed);
            if (!match) throw new GraphQLError('user does not exist or wrong password');
            return sign({ id: user.id, email: user.email });
          }
        }
      }
    });

    this.post('/graphql', graphQLHandler);
  },

  seeds(server) {
    const now = dayjs().valueOf();
    server.create('User', {
      email: 'test@skand.io',
      passwordHashed: bcrypt.hashSync('testtest', 8),
      createdAt: now
    } as any);
  }
});
