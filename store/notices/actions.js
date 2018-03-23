import axios from 'axios'

import {apiDomain as apiUrl} from '../../models/config'

import {
    REINIT_NOTICES,
    FETCH_NOTICES,
    FETCH_NOTICE,
    CREATE_NOTICE,
    UPDATE_NOTICE,
    DELETE_NOTICE,
    FETCH_CONFIDENTIALITY_AND_COOKIES,
    FETCH_LEGAL_NOTICE,
    FETCH_SWORN_STATEMENT,
    FETCH_TERM_OF_USE
} from './mutation-types'
import {
    initialConfidentialityAndCookies, initialLegalNotice,
    initialSwornStatement, initialTermOfUse
} from "./config";

export async function reinitNotices({commit}) {
    commit(REINIT_NOTICES, [])
}

export async function fetchNotices({commit, state}) {
    return axios(
        {
            method: 'GET',
            url: apiUrl + '/notices',
        })
        .then(response => {
            commit(FETCH_NOTICES, response.data);
            fetchPages({commit, state});
            return response.data
        })
        .catch(error => {
            throw error
        })
}

export async function fetchPublicNotices({commit, state}) {
    return axios(
        {
            method: 'GET',
            url: apiUrl + '/public/notices',
        })
        .then(response => {
            commit(FETCH_NOTICES, response.data);
            fetchPages({commit, state});
            return response.data
        })
        .catch(error => {
            throw error
        })
}

export async function fetchNotice({commit}, {noticeID}) {
    return axios(
        {
            method: 'GET',
            url: apiUrl + '/notices/' + noticeID,
        })
        .then(response => {
            commit(FETCH_NOTICE, response.data);
            return response.data
        })
        .catch(error => {
            throw error
        })
}

export async function createNotice({commit}, {notice}) {
    return axios(
        {
            method: 'POST',
            url: apiUrl + '/notices',
            data: notice
        })
        .then(response => {
            commit(CREATE_NOTICE, response.data);
            return response.data
        })
        .catch(error => {
            throw error
        })
}

export async function updateNotice({commit}, {notice}) {
    return axios(
        {
            method: 'PUT',
            url: apiUrl + '/notices/' + notice.id,
            data: notice
        })
        .then(response => {
            commit(UPDATE_NOTICE, response.data);
            return response.data
        })
        .catch(error => {
            throw error
        })
}

export async function deleteNotice({commit}, {noticeID}) {
    return axios(
        {
            method: 'DELETE',
            url: apiUrl + '/notices/' + noticeID
        })
        .then(response => {
            commit(DELETE_NOTICE, noticeID);
            return response.data
        })
        .catch(error => {
            throw error
        })
}

export function saveNotice({commit, state}, {notice}) {
    const index = state.all.findIndex((x) => x.id === notice.id);
    if (index !== -1) {
        return updateNotice({commit}, {notice})
    }
    return createNotice({commit}, {notice})
}

export function fetchPages({commit, state}) {
    let notices = state.all;

    let index = notices.findIndex((x) => x.page === 'confidentiality_and_cookies');
    if (index !== -1) {
        commit(FETCH_CONFIDENTIALITY_AND_COOKIES, notices[index])
    } else {
        commit(FETCH_CONFIDENTIALITY_AND_COOKIES, initialConfidentialityAndCookies())
    }

    index = notices.findIndex((x) => x.page === 'legal_notice');
    if (index !== -1) {
        commit(FETCH_LEGAL_NOTICE, notices[index])
    } else {
        commit(FETCH_LEGAL_NOTICE, initialLegalNotice())
    }

    index = notices.findIndex((x) => x.page === 'sworn_statement');
    if (index !== -1) {
        commit(FETCH_SWORN_STATEMENT, notices[index])
    } else {
        commit(FETCH_SWORN_STATEMENT, initialSwornStatement())
    }

    index = notices.findIndex((x) => x.page === 'term_of_use');
    if (index !== -1) {
        commit(FETCH_TERM_OF_USE, notices[index])
    } else {
        commit(FETCH_TERM_OF_USE, initialTermOfUse())
    }

    return null
}
