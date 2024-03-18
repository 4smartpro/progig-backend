import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'libs/common/src/graphql/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true,
      },
      path: '/',
    }),
  ],
})
export class GraphQLModule {}
