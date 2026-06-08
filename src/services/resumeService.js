import api from "../api/api";

export async function downloadResume(
    jobDescription,
    currentResumeText
) {

    const response =
        await api.post(
            "/api/resume/download",
            {
                jobDescription,
                currentResumeText
            },
            {
                responseType: "blob"
            }
        );

    return response.data;
}