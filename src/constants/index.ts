export const POUR_INTO_A = 'Pour B into A';
export const POUR_INTO_B = 'Pour A into B';
export const FILL_A = 'Fill A';
export const FILL_B = 'Fill B';
export const EMPTY_A = 'Empty A';
export const EEMPTY_B = 'Empty B';
export const C_BUCKET_TOO_BIG = 'C_BUCKET_TOO_BIG';
export const C_BUCKET_TOO_SMALL = 'C_BUCKET_TOO_SMALL';
export const EVEN_BUCKETS = 'EVEN_BUCKETS';
export const DEFAULT = 'DEFAULT';
export const ERROR_MAP = {
  C_BUCKET_TOO_SMALL: 'C Bucket must be larger than 0',
  C_BUCKET_TOO_BIG: 'C Bucket cannot be larger than the other buckets',
  EVEN_BUCKETS: 'Two event buckets cannot result in an odd number.',
  DEFAULT: 'C Bucket cannot be solved for.',
};
