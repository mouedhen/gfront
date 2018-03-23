import * as actions from './actions'
import * as getters from './getters'

import {
    initialConfidentialityAndCookies,
    initialLegalNotice,
    initialSwornStatement,
    initialTermOfUse
} from './config'

import {
    REINIT_NOTICES,
    FETCH_NOTICES,
    FETCH_NOTICE,
    CREATE_NOTICE,
    UPDATE_NOTICE,
    DELETE_NOTICE,
    FETCH_CONFIDENTIALITY_AND_COOKIES,
    FETCH_TERM_OF_USE,
    FETCH_SWORN_STATEMENT,
    FETCH_LEGAL_NOTICE
} from './mutation-types'

const initialState = {
    all: [],
    confidentialityAndCookies: initialConfidentialityAndCookies(),
    legalNotice: initialLegalNotice(),
    swornStatement: initialSwornStatement(),
    termOfUse: initialTermOfUse(),
};

const mutations = {

    [FETCH_CONFIDENTIALITY_AND_COOKIES] (state, notice)
    {
        state.confidentialityAndCookies = notice
    },

    [FETCH_TERM_OF_USE] (state, notice)
    {
        state.termOfUse = notice
    },

    [FETCH_SWORN_STATEMENT] (state, notice)
    {
        state.swornStatement = notice
    },

    [FETCH_LEGAL_NOTICE] (state, notice)
    {
        state.legalNotice = notice
    },

    [REINIT_NOTICES] (state, notices) {
        state.all = initialState.all
    },

    [FETCH_NOTICES] (state, notices) {
        state.all = notices
    },

    [FETCH_NOTICE] (state, notice) {
        const index = state.all.findIndex(x => x.id === notice.id);
        if (index === -1) {
            state.all.push(notice)
        } else {
            state.all.splice(index, 1, notice)
        }
    },

    [CREATE_NOTICE] (state, notice) {
        state.all.push(notice)
    },

    [UPDATE_NOTICE] (state, notice) {
        const index = state.all.findIndex(x => x.id === notice.id);
        if (index !== -1) {
            state.all.splice(index, 1, notice)
        }
    },

    [DELETE_NOTICE] (state, noticeID) {
        state.all = state.all.filter(x => x.id !== noticeID)
    }
};

export default {
    state: { ...initialState },
    actions,
    getters,
    mutations
}
