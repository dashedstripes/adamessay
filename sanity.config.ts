import { defineConfig } from 'sanity'
import { StructureBuilder, structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { ProjectView } from './components/ProjectView';
import customer from './schemaTypes/customer';

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

function customerStructure(S: StructureBuilder) {
  return S.documentTypeList('customer').title('Customers').child(
    (customerId) => {
      return S.documentList()
        .title('Tech Check-ins')
        .filter('_type == "techCheck" && customer._ref == $customerId')
        .params({ customerId })
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('techCheck')
            .initialValueTemplate('tech-check-customer', { customerId })
            .views([S.view.form()])
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
    name: 'customers',
    title: 'Customers',

    basePath: '/customers',

    projectId: PROJECT_ID,
    dataset: 'production',

    plugins: [structureTool({
      structure: customerStructure,
    })],

    schema: {
      types: schemaTypes,
      templates: [
        {
          id: 'tech-check-customer',
          title: 'Tech Check by Customer',
          schemaType: 'techCheck',
          parameters: [{ name: 'customerId', type: 'string' }],
          value: (params: { customerId: string; }) => ({
            customer: { _type: 'reference', _ref: params.customerId }
          })
        },
      ]
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
