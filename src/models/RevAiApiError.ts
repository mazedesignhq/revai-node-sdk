/* eslint-disable @typescript-eslint/ban-types */
import { AxiosError } from 'axios';

export class RevAiApiError {
    statusCode: number;
    details: string;

    constructor(e: AxiosError) {
        if (e.response) {
            this.statusCode = e.response.status;
            this.details = (e.response.data as string) || '';
        }
    }
}

export class InvalidParameterError extends RevAiApiError {
    parameters: {};

    constructor(e: AxiosError) {
        super(e);
        this.parameters = (e.response.data as { parameters: {} }).parameters;
    }
}

export class ForbiddenAccessError extends RevAiApiError {
    parameters: {};

    constructor(e: AxiosError) {
        super(e);
        this.parameters = (e.response.data as { parameters: {} }).parameters;
    }
}

export class ResourceNotFoundOrUnsupportedApiError extends RevAiApiError {
    parameters: {};

    constructor(e: AxiosError) {
        super(e);
        this.parameters = (e.response.data as { parameters: {} }).parameters;
    }
}

export class InvalidStateError extends RevAiApiError {
    currentValue: string;
    allowedValues: string[];

    constructor(e: AxiosError) {
        super(e);
        this.currentValue = (e.response.data as { current_value: string }).current_value;
        this.allowedValues = (e.response.data as { allowed_values: string[] }).allowed_values;
    }
}
