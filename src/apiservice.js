import api, { route } from "@forge/api";

export const fetchCommentsForIssue = async (issueIdOrKey) => {
    const res = await api
        .asUser()
        .requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);

    const data = await res.json();
    return data.comments;
};
export const fetchProjects = async () => {
    const res = await api
        .asUser().requestJira(route`/rest/api/3/project/search`, {
            headers: {
                'Accept': 'application/json'
            }
        });

    const data = await res.json();
    console.log(data);
    return data;
};