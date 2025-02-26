import { defineType } from "sanity";

export default defineType({
    name: "customer",
    title: "Customer",
    type: "document",
    liveEdit: true,
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
    ],
})