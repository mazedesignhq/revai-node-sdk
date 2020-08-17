const configHelper = require('./config-helper');
const revaiAsync = require('../../../dist/src/api-client');
const revaiCustomVocabularies = require('../../../dist/src/custom-vocabularies-client');
const revaiStreaming = require('../../../dist/src/streaming-client');
const JobStatus = require('../../../dist/src/models/JobStatus').JobStatus;
const JobType = require('../../../dist/src/models/JobType').JobType;

module.exports = {
    getAsyncClient: (apiKey = configHelper.getApiKey()) => {
        const client = new revaiAsync.RevAiApiClient(apiKey);
        client.apiHandler.instance.defaults.baseURL = `https://${configHelper.getBaseUrl()}/speechtotext/v1/`;
        return client;
    },
    getStreamingClient: (audioConfig, apiKey = configHelper.getApiKey()) => {
        const client = new revaiStreaming.RevAiStreamingClient(apiKey, audioConfig);
        client.baseUrl = `wss://${configHelper.getBaseUrl()}/speechtotext/v1/stream`;
        return client;
    },
    getCustomVocabulariesClient: (apiKey = configHelper.getApiKey()) => {
        const client = new revaiCustomVocabularies.RevAiCustomVocabulariesClient(apiKey);
        client.apiHandler.instance.defaults.baseURL = `https://${configHelper.getBaseUrl()}/speechtotext/v1/vocabularies`;
        return client;
    },
    getTranscribedJobId: (jobList) => {
        var completedJobId;
        for (job of jobList) {
            if (job.status === JobStatus.Transcribed && job.type !== JobType.Stream) {
                completedJobId = job.id;
            }
        }
        return completedJobId;
    }
}
