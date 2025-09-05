export const serviceStateless = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce services to be stateless (no instance properties except injected dependencies)',
    },
    messages: {
      serviceWithState:
        'Services should be stateless. Avoid instance properties except for injected dependencies in constructor.',
    },
  },
  create(context: any) {
    return {
      ClassDeclaration(node: any) {
        const fileName = context.getFilename();
        if (fileName.includes('.service.ts')) {
          const properties = node.body.body.filter(
            (member: any) =>
              member.type === 'PropertyDefinition' &&
              !member.readonly &&
              member.accessibility !== 'private',
          );

          properties.forEach((prop: any) => {
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
