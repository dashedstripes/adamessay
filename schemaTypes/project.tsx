import { defineType } from "sanity";

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    liveEdit: true,
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        }
    ],
    preview: {
        select: {
            name: "name",
        },
        prepare({ name }) {
            return {
                title: `${name}`,
                media: () => {
                    return <span>{name ? name.toUpperCase().substring(0, 2) : ""}</span>;
                }
            }
        }
    }
})