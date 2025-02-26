import { defineConfig } from 'sanity'
import { StructureBuilder, structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { ProjectView } from './components/ProjectView';

const PROJECT_ID = '8zo7q6pl';

function projectStructure(S: StructureBuilder) {
  return S.documentTypeList('project').title('Projects').child(
    (projectId) => {
      return S.documentList()
        .title('Notes')
        .filter('_type == "note" && project._ref == $projectId')
        .params({ projectId })
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('note')
            .views([S.view.form(), S.view.component(ProjectView).title('Viewer')])
        )
    }
  )
}

export default defineConfig([
  {
    name: 'admin',
    title: 'Admin',

    basePath: '/admin',

    projectId: PROJECT_ID,
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
      types: schemaTypes,
    },

  },
  {
    name: 'projects',
    title: 'Projects',

    basePath: '/projects',

    projectId: PROJECT_ID,
    dataset: 'production',

    plugins: [structureTool({
      structure: projectStructure,
    })],

    schema: {
      types: schemaTypes,
    },
  },
])
