import { InputType, Field, Arg, Ctx } from 'type-graphql';
import { Context } from '../context';

@InputType()
export class IdOrUsernameInput {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  username?: string

  toQuery(): { id: string } | { username: string } {
    if (this.id) return { id: this.id };
    if (this.username) return { username: this.username };
    throw new Error('Either ID or Username must be provided.');
  }
}
