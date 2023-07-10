import React from 'react';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type UncertainObjectType = {
  [key: string]: any;
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  verificationCode: string;
  dateOfBirth: string;
  churchCenter: string;
  member: boolean;
  createdAt: string;
  registrationSource: string;
};

export type FeedbackType = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  content: string;
  status: 'read' | 'unread';
  source: 'web' | 'mobile';
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResultType = {
  data: UserType[];
  meta: PageMetaType;
};

export type PageMetaType = {
  totalResults: number;
  resultsPerPage: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type DevotionalType = {
  _id: string;
  date: Date | string;
  title: string;
  text: string;
  mainText: string;
  content: string;
  confession: string;
  furtherReading: string[];
  oneYearBibleReading: string[];
  twoYearsBibleReading: string[];
  createdBy: string;
  views: number;
  createdAt: string;
  updatedAt: string;
};

export type EventType = {
  _id: string;
  name: string;
  theme: string;
  mainText: string;
  date: string;
  time: string;
  allowRegistration: boolean;
  registrationEntries: UncertainObjectType[];
  gallery: string[];
  limitedNumberRegistration: boolean;
  registrationNumberLimit: number;
  limitedDateRegistration: boolean;
  registrationDateLimit: string;
  requiredRegistrationDetails: {
    id: string;
    name: string;
    type: string;
    options?: string;
  }[];
  poster: string;
  location: string;
  eventType: 'offline' | 'online';
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
};

export type AdminType = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  active: boolean;
  avatar?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export interface RegistrationDetailType {
  [id: string]: {
    id: string;
    name: string;
    type: string;
    options?: string;
  };
}

export interface TestimonyType {
  test_id: number;
  names: string;
  email: string;
  phoneNumber: string;
  titles: string;
  main_gist: string;
  ditto: Date;
  status: 'pending' | 'approved' | 'declined' | 'archived';
  source: 'web' | 'mobile';
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionType {
  reference: string;
  status: string;
  source: string;
  createdAt: Date;
  _id: string;
}

export interface AnnouncementType {
  id: number;
  title: string;
  details: string;
  priority: number;
  image: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TFCCType {
  address: string;
  cellLeader: string;
  phoneNumber: string;
  zone: string;
  createdBy: string;
  _id: string;
  updatedBy: string;
}
export interface TFCCZoneType {
  name: string;
  createdBy: string;
  _id: string;
  updatedBy: string;
}
