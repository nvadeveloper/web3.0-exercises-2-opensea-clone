import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '4fk0am7i',
  dataset: 'production',
  apiVersion: '2022-03-20',    
  token: 'skDLqLRssdPZqY3DjwpiSAamQ268MeQ9kdlvKbopG03UvdxTXJqHSSKVhpWCWfqavvTaw7t0m88LzlLqs5Fek46TXxgOvzarzE9Nj5fLYHI3IJ0bHOX7s4Zyl0kjge9hwgJyaRUHkE7NMEo8n1gCmddg1MnxqYOL3YO7rGVUwlhguA1L8gE0',
  useCdn: false
})