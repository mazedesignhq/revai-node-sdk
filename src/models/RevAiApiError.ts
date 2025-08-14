/* eslint-disable @typescript-eslint/ban-types */
import { AxiosError } from 'axios';

export class RevAiApiError {
    statusCode: number;
    details: string;

    constructor(e: AxiosError<string
    | { parameters: Record<string, unknown> }
    | { current_value: string; allowed_values: string[] }>) {
        if (e.response) {
            this.statusCode = e.response.status;
            this.details = typeof e.response.data === 'string' ? e.response.data : JSON.stringify(e.response.data);
        }
    }
}

export class InvalidParameterError extends RevAiApiError {
    parameters: Record<string, unknown>;

    constructor(e: AxiosError<{ parameters: Record<string, unknown> }>) {
        super(e);
        this.parameters = e.response.data.parameters;
    }
}

export class ForbiddenAccessError extends RevAiApiError {
    parameters: Record<string, unknown>;

    constructor(e: AxiosError<{ parameters: Record<string, unknown> }>) {
        super(e);
        this.parameters = e.response.data.parameters;
    }
}

export class ResourceNotFoundOrUnsupportedApiError extends RevAiApiError {
    parameters: Record<string, unknown>;

    constructor(e: AxiosError<{ parameters: Record<string, unknown> }>) {
        super(e);
        this.parameters = e.response.data.parameters;
    }
}

export class InvalidStateError extends RevAiApiError {
    currentValue: string;
    allowedValues: string[];

    constructor(e: AxiosError<{ current_value: string; allowed_values: string[] }>) {
        super(e);
        this.currentValue = e.response.data.current_value;
        this.allowedValues = e.response.data.allowed_values;
    }
}
