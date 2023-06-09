import { InputType, Field, Int } from 'type-graphql';
import { Prisma } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-type-json';
import { MentorStatus } from '../enums';
import { ProjectCreateInput } from './ProjectCreateInput';

@InputType()
export class MentorApplyInput {
  @Field(() => String)
  givenName: string

  @Field(() => String)
  surname: string

  @Field(() => String)
  email: string

  @Field(() => GraphQLJSONObject, { nullable: true })
  // eslint-disable-next-line @typescript-eslint/ban-types
  profile?: object

  @Field(() => Int, { nullable: true })
  maxWeeks?: number

  @Field(() => [ProjectCreateInput])
  projects: ProjectCreateInput[]

  @Field(() => String, { nullable: true })
  timezone: string | null

  toQuery(): Omit<Prisma.MentorCreateInput, 'username'> {
    return {
      givenName: this.givenName,
      surname: this.surname,
      email: this.email,
      profile: this.profile || {},
      status: MentorStatus.APPLIED,
      maxWeeks: this.maxWeeks,
      projects: { create: this.projects.map((p) => p.toQuery()) },
      timezone: this.timezone,
    };
  }
}
