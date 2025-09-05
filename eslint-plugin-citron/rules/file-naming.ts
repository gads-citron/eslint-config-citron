export const fileNaming = {
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
    create(context: any) {
      return {
        Program(node: any) {
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