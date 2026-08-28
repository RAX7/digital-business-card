import { registerEnumType } from '@nestjs/graphql';

export enum NullsOrder {
  First = 'first',
  Last = 'last',
}

registerEnumType(NullsOrder, {
  name: 'NullsOrder',
  description: 'Sorting order by nullable field',
});
