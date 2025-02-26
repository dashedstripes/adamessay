import { defineType } from "sanity";

export default defineType({
    name: "techCheck",
    title: "Tech Check-in",
    type: "document",
    liveEdit: true,
    fields: [
        {
            name: "date",
            title: "Date",
            type: "date",
            options: {
                dateFormat: "YYYY-MM-DD",
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        },
        {
            name: "customer",
            title: "Customer",
            type: "reference",
            to: [{ type: "customer" }],
        },
        {
            name: "notes",
            title: "Notes",
            type: "array",
            of: [{ type: "block" }],
        }
    ],
    preview: {
        select: {
            date: "date",
            customer: "customer.name",
        },
        prepare({ date, customer }) {
            return {
                title: `${date}`,
                subtitle: `${customer}`,
            }
        }
    }
})