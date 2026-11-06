import { parse } from 'yaml';
import raw from './resume.yaml?raw';

export interface Resume {
  summary: string;
  experience: { employer: string; title: string; dates: string; bullets: string[] }[];
  skills: string[];
  education: { school: string; degree: string; dates: string }[];
  links?: { label: string; url: string }[];
}

export const resume = parse(raw) as Resume;
