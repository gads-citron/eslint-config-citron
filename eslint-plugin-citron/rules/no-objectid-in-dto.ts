export const noObjectIdInDto = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prohibit ObjectId usage in DTOs - use string instead',
    },
    messages: {
      noObjectIdInDto:
        'DTOs should use primitive types like string instead of ObjectId',
    },
  },
  create(context: any) {
    return {
      TSTypeReference(node: any) {
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
