export const isOverdue = (dueDate: Date): boolean => {
    return new Date() > dueDate;
};

export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};
