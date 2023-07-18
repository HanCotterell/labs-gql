import { Prisma, Survey, SurveyResponse } from '@prisma/client';
import { PersonType } from '../enums';
import { AuthContext } from '../context';
import { getSurveyResponseType } from './getSurveyResponseType';
import { deepIntersection, deepKvFilter } from './deep';

enum SurveyShareWith {
  MENTOR = 'mentor',
  STUDENT = 'student',
  ALL = 'all',
}

interface SurveyShareConfig {
  [key: string]: SurveyShareWith | SurveyShareConfig
}

export type SanitizableSurveyResponse = SurveyResponse
  & { surveyOccurence: { survey: Survey} };

function filterResponse(response: Prisma.JsonValue, shareConfig: SurveyShareConfig | null, personType: PersonType):
  Prisma.JsonValue {
  if (!shareConfig) return {};
  const personShareConfig = deepKvFilter(shareConfig, (_, el) => (
    el === SurveyShareWith.ALL
    || el === (personType === PersonType.STUDENT ? SurveyShareWith.STUDENT : SurveyShareWith.MENTOR)
  ));
  return deepIntersection(response, personShareConfig) as unknown as Prisma.JsonValue;
}

export function sanitizeSurveyResponse(
  surveyResponse: SanitizableSurveyResponse,
  auth: AuthContext,
): SurveyResponse {
  const survey = surveyResponse.surveyOccurence.survey;
  const surveyShareName = `${getSurveyResponseType(surveyResponse)}Share`;
  const shareConfig = surveyShareName in survey ? survey[surveyShareName as keyof Survey] as SurveyShareConfig : null;

  const { response, ...rest } = surveyResponse;
  return {
    ...rest,
    response: filterResponse(response, shareConfig, auth.isStudent ? PersonType.STUDENT : PersonType.MENTOR),
  };
}

export function sanitizeSurveyResponses(
  responses: SanitizableSurveyResponse[],
  auth: AuthContext,
): SurveyResponse[] {
  return responses
    .map((r) => sanitizeSurveyResponse(r, auth))
    .filter((r) => r.response && typeof r.response === 'object' && Object.keys(r.response).length > 0);
}
