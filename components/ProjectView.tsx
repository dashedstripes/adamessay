import { PortableText } from "@portabletext/react";
import { Card, Heading } from "@sanity/ui"
import { PortableTextBlock, SanityDocument } from "sanity";
import { UserViewComponent } from "sanity/structure"

interface PublishedDocument extends SanityDocument {
    title: string;
    content: PortableTextBlock[];
}

export const ProjectView: UserViewComponent = (props) => {
    const { document } = props

    return (
        <Card padding={6}>
            <Heading>{(document.published as PublishedDocument).title}</Heading>
            <PortableText value={(document.published as PublishedDocument).content} />
        </Card>
    )
}