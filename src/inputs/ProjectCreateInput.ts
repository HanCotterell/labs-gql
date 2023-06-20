import { InputType, Field, Int } from 'type-graphql';
import { Prisma } from '@prisma/client';
import { Track } from '../enums';

@InputType()
export class ProjectCreateInput {
  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  deliverables?: string

  @Field(() => Track)
  track: Track

  @Field(() => Int, { nullable: true })
  maxStudents?: number

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => [String], { nullable: true })
  affinePartner?: string | null

  toQuery(): Prisma.ProjectCreateInput {
    return {
      description: this.description,
      deliverables: this.deliverables,
      track: this.track,
      maxStudents: this.maxStudents,
      affinePartner: this.affinePartner
        ? { connect: { id: this.affinePartner } }
        : undefined,
      tags: this.tags ? { connect: this.tags.map((id): Prisma.TagWhereUniqueInput => ({ id })) } : undefined,
    };
  }
}
