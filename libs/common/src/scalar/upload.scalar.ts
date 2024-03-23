import { Scalar } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-ts';

@Scalar('Upload')
export class Upload {
  description = 'File upload scalar type';

  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(value) {
    return GraphQLUpload.parseLiteral(value);
  }
}
