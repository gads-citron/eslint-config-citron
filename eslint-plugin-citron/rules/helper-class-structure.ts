export const helperClassStructure = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce helper classes to be abstract with only static methods',
    },
    messages: {
      helperNotAbstract: 'Helper classes must be abstract',
      helperWithInstanceMethod:
        'Helper classes should only contain static methods',
      helperWithConstructor: 'Helper classes should not have constructors',
    },
  },
  create(context: any) {
    return {
      ClassDeclaration(node: any) {
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
          node.body.body.forEach((member: any) => {
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
