const fileNaming = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce file naming conventions according to Citron guidelines',
      category: 'Stylistic Issues',
    },
    messages: {
      invalidFileName: 'File name "{{fileName}}" should follow kebab-case and include file type (e.g., user.service.ts)',
      invalidFolderName: 'Folder name "{{folderName}}" should be in plural kebab-case',
    },
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();
        const parts = filename.split('/');
        const fileName = parts[parts.length - 1];
        
        // Check file naming convention
        const validFilePattern = /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.(api|contract|dto|entity|enum|error|helper|interface|middleware|model|processor|repository|service|validator|worker|test|spec)\.ts$/;
        
        if (!validFilePattern.test(fileName) && !fileName.includes('index.ts')) {
          context.report({
            node,
            messageId: 'invalidFileName',
            data: { fileName },
          });
        }
      },
    };
  },
};

const helperClassStructure = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce helper classes to be abstract with only static methods',
    },
    messages: {
      helperNotAbstract: 'Helper classes must be abstract',
      helperWithInstanceMethod: 'Helper classes should only contain static methods',
      helperWithConstructor: 'Helper classes should not have constructors',
    },
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        const fileName = context.getFilename();
        if (fileName.includes('.helper.ts')) {
          // Check if class is abstract
          if (!node.abstract) {
            context.report({
              node,
              messageId: 'helperNotAbstract',
            });
          }

          // Check for instance methods or constructor
          node.body.body.forEach((member) => {
            if (member.type === 'MethodDefinition') {
              if (member.kind === 'constructor') {
                context.report({
                  node: member,
                  messageId: 'helperWithConstructor',
                });
              } else if (!member.static) {
                context.report({
                  node: member,
                  messageId: 'helperWithInstanceMethod',
                });
              }
            }
          });
        }
      },
    };
  },
};

const noObjectIdInDto = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prohibit ObjectId usage in DTOs - use string instead',
    },
    messages: {
      noObjectIdInDto: 'DTOs should use primitive types like string instead of ObjectId',
    },
  },
  create(context) {
    return {
      TSTypeReference(node) {
        const fileName = context.getFilename();
        if (fileName.includes('.dto.ts')) {
          if (node.typeName && node.typeName.name === 'ObjectId') {
            context.report({
              node,
              messageId: 'noObjectIdInDto',
            });
          }
        }
      },
    };
  },
};

const repositoryReturnTypes = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce repositories to return domain entities, not database documents',
    },
    messages: {
      returnDomainEntity: 'Repository methods should return domain entities, not database-specific types',
    },
  },
  create(context) {
    return {
      MethodDefinition(node) {
        const fileName = context.getFilename();
        if (fileName.includes('.repository.ts')) {
          // Check return type annotations for Document, Model, etc.
          if (node.value && node.value.returnType) {
            const returnType = context.getSourceCode().getText(node.value.returnType);
            if (returnType.includes('Document') || returnType.includes('Model')) {
              context.report({
                node: node.value.returnType,
                messageId: 'returnDomainEntity',
              });
            }
          }
        }
      },
    };
  },
};

const serviceStateless = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce services to be stateless (no instance properties except injected dependencies)',
    },
    messages: {
      serviceWithState: 'Services should be stateless. Avoid instance properties except for injected dependencies in constructor.',
    },
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        const fileName = context.getFilename();
        if (fileName.includes('.service.ts')) {
          const properties = node.body.body.filter(
            (member) =>
              member.type === 'PropertyDefinition' &&
              !member.readonly &&
              member.accessibility !== 'private',
          );

          properties.forEach((prop) => {
            context.report({
              node: prop,
              messageId: 'serviceWithState',
            });
          });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'file-naming': fileNaming,
    'helper-class-structure': helperClassStructure,
    'service-stateless': serviceStateless,
    'repository-return-types': repositoryReturnTypes,
    'no-objectid-in-dto': noObjectIdInDto,
  },
};
