import { fileNaming } from './rules/file-naming';
import { helperClassStructure } from './rules/helper-class-structure';
import { noObjectIdInDto } from './rules/no-objectid-in-dto';
import { repositoryReturnTypes } from './rules/repository-return-types';
import { serviceStateless } from './rules/service-stateless';

// @ts-expect-error That the way we need to export the rules
export = {
  rules: {
    'file-naming': fileNaming,
    'helper-class-structure': helperClassStructure,
    'service-stateless': serviceStateless,
    'repository-return-types': repositoryReturnTypes,
    'no-objectid-in-dto': noObjectIdInDto,
  },
};