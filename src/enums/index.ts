import {
  Track,
  MentorStatus,
  StudentStatus,
  ProjectStatus,
  RejectionReason,
  TagType,
  PersonType,
  PrStatus,
} from '@prisma/client';
import { registerEnumType } from 'type-graphql';

registerEnumType(Track, { name: 'Track' });
registerEnumType(MentorStatus, { name: 'MentorStatus' });
registerEnumType(StudentStatus, { name: 'StudentStatus' });
registerEnumType(ProjectStatus, { name: 'ProjectStatus' });
registerEnumType(RejectionReason, { name: 'RejectionReason' });
registerEnumType(TagType, { name: 'TagType' });
registerEnumType(PersonType, { name: 'PersonType' });
registerEnumType(PrStatus, { name: 'PrStatus' });

export {
  Track,
  MentorStatus,
  StudentStatus,
  ProjectStatus,
  RejectionReason,
  TagType,
  PersonType,
  PrStatus,
};
