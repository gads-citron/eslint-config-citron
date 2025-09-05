export const repositoryReturnTypes = {
    meta: {
        type: 'suggestion',
        docs: {
        description: 'Enforce repositories to return domain entities, not database documents',
        },
        messages: {
        returnDomainEntity: 'Repository methods should return domain entities, not database-specific types',
        },
    },
    create(context: any) {
        return {
        MethodDefinition(node: any) {
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