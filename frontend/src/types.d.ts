    export interface News {
        id: string;
        title: string;
        content: string;
        image?: string | null;
        publicationDate: string;
    }

    export interface NewsMutation {
        title: string;
        content: string;
        image?: File | null;
    }

    export interface Comment {
        id: string;
        newsId: string;
        author?: string;
        text: string;
    }