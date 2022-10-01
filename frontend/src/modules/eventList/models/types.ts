import { CorrectFormResponse } from '../../../modules/eventForm/models/types';

export type EventData = CorrectFormResponse;

export type ShortEventData = Omit<EventData, 'fullDescription'>;
