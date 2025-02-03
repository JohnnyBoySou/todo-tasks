export interface Task {
    id: string | number;
    title: string;
    description?: string;
    status: string;
    createdAt: {
        date: string;
        read: string;
    };
}

export interface CreateTask {
    title: string;
    description?: string;
    status: string;
}
