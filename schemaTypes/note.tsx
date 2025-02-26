import { defineType } from "sanity";

const workspaceName = window.location.pathname.split('/')[1];

export default defineType({
    name: "note",
    title: "Notes",
    type: "document",
    liveEdit: true,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
        },
        {
            name: "customer",
            title: "Customer",
            type: "reference",
            to: [{ type: "customer" }],
            hidden: () => workspaceName !== "admin"
        },
        {
            name: "project",
            title: "Project",
            type: "reference",
            to: [{ type: "project" }],
            hidden: () => workspaceName !== "admin"
        },
        {
            name: "date",
            title: "Date",
            type: "date",
            options: {
                dateFormat: "YYYY-MM-DD",
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        },
    ],
    preview: {
        select: {
            title: "title",
            customer: "customer.name",
            project: "project.name",
            date: "date",
        },
        prepare({ title, customer, project, date, }) {
            const subtitle = () => {
                if (customer) {
                    return `${customer} - ${date}`;
                }

                if (project) {
                    return `${project} - ${date}`;
                }

                return "";
            }

            return {
                title: `${title}`,
                subtitle: subtitle(),
                media: () => {
                    const name = customer || project;
                    return <span>{name ? name.toUpperCase().substring(0, 2) : ""}</span>;
                }
            }
        }
    }
})