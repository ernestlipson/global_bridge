/** Dummy recent AI-generated drafts (until backend exists). */

export type BuilderDocKind = "SOP" | "CV";

export type BuilderRecentDoc = {
    id: string;
    slug: string;
    title: string;
    updatedLabel: string;
    kind: BuilderDocKind;
    status: "Completed" | "Draft";
};

export const recentBuilderDocuments: BuilderRecentDoc[] = [
    {
        id: "1",
        slug: "sop-stanford-ms-cs",
        title: "SOP_Stanford_MS_ComputerScience",
        updatedLabel: "Oct 24, 2023",
        kind: "SOP",
        status: "Completed",
    },
    {
        id: "2",
        slug: "cv-technical-pm",
        title: "CV_Academic_PM_Hybrid",
        updatedLabel: "Oct 22, 2023",
        kind: "CV",
        status: "Draft",
    },
    {
        id: "3",
        slug: "sop-manchester-mba",
        title: "SOP_Manchester_MBA_Focus",
        updatedLabel: "Oct 18, 2023",
        kind: "SOP",
        status: "Completed",
    },
];
