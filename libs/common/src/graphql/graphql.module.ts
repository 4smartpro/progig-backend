import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'libs/common/src/graphql/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
  ],
})
export class GraphQLModule {}
