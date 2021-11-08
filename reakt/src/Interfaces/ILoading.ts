export interface ILoadingTask {
    id: number,
    state?: boolean,
    description?: string
}

export interface ILoadingContext {
    isLoading: boolean,
    loadingTasks: ILoadingTask[],
    addLoader: ( task: ILoadingTask ) => number,
    finishLoader: ( id: number ) => void,
}